import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import api from '../utils/1';
import * as auth from '../utils/2';

import CurrentUserContext from '../contexts/CurrentUserContext';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

import Login from './Login';
import Register from './Register';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);

  const [isRegistrationOk, setRegistrationOk] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState(null);

  const location = useLocation();

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleUpdateUser = (newUserData) => {
    api.editProfile(newUserData.name, newUserData.about)
      .then((userData) => {
        setCurrentUser(userData);
        setEditProfilePopupOpen(false);
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  };

  const handleUpdateAvatar = (newAvatarData, avatarRef) => {
    api.updateAvatar(newAvatarData)
      .then((userData) => {
        setCurrentUser(userData);
        setEditAvatarPopupOpen(false);
        avatarRef.current.value = '';
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  };

  const handleAddCard = (cardName, cardLink, cardTitleRef, cardLinkRef) => {
    api.addNewCard(cardName, cardLink)
      .then((cardData) => {
        setCards([cardData, ...cards]);
        setAddPlacePopupOpen(false);
        cardTitleRef.current.value = '';
        cardLinkRef.current.value = '';
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    (!isLiked) ?
      api.likeCard(card._id)
        .then((newCard) => {
          setCards(cards.map(c => c._id === newCard._id ? newCard : c))
        })
        .catch(err => console.log(`Ошибка: ${err}`)) :

      api.cancelLikeCard(card._id)
        .then((newCard) => {
          setCards(cards.map(c => c._id === newCard._id ? newCard : c))
        })
        .catch(err => console.log(`Ошибка: ${err}`));
  };

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(c => c._id !== card._id))
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  };

  const handleAuthenticate = (data) => {
    localStorage.setItem('jwt', data.token)
    setLoggedIn(true);
  }

  const handleLogin = ({ password, email }) => {
    auth.authorize({ password, email })
      .then((data) => {
        if (data.token) {
          handleAuthenticate(data);
          setUserEmail(email);
        }
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  };

  const handleRegister = ({ password, email }) => {
    auth.register({ password, email })
      .then((data) => {
        if (data) {
          setRegistrationOk(true);
        }
      })
      .catch(() => {
        setRegistrationOk(false);
      })
      .finally(() => {
        setInfoTooltipPopupOpen(true);
      });
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  };

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then((data) => {
          if (data) {
            setLoggedIn(true);
            setUserEmail(data.data.email);
          }
        })
        .catch(err => console.log(`Ошибка: ${err}`));
    }
  };

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
        .then((cardsData) => {
          setCards(cardsData);
        })
        .catch(err => console.log(`Ошибка: ${err}`));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch(err => console.log(`Ошибка: ${err}`));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (location.path !== '/sign-up') {
      setRegistrationOk(false);
    }
  }, [location]);

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>

        <Header />

        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onEditProfile={() => setEditProfilePopupOpen(true)}
            onAddPlace={() => setAddPlacePopupOpen(true)}
            onEditAvatar={() => setEditAvatarPopupOpen(true)}
            onCardImage={(card) => handleCardClick(card)}
            onLogout={handleLogout}
            userEmail={userEmail}
          />

          <Route path="/sign-up">
            <Register
              isLoggedIn={loggedIn}
              onRegister={handleRegister}
              success={isRegistrationOk}
              isPopupOpen={isInfoTooltipPopupOpen}
              onClosePopup={() => setInfoTooltipPopupOpen(false)}
            />
          </Route>

          <Route path="/sign-in">
            <Login
              isLoggedIn={loggedIn}
              onLogin={handleLogin}
            />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>

        </Switch>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={() => setEditProfilePopupOpen(false)}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={() => setAddPlacePopupOpen(false)}
          onAddCard={handleAddCard}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={() => setEditAvatarPopupOpen(false)}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name='delete-card'
          title='Вы уверены?'
          formName='deleteCard'
          btnText='Да'
        />

        <ImagePopup
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        />

        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
