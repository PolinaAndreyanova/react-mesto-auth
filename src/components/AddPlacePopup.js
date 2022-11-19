import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [place, setPlace] = useState(null);
  const [link, setLink] = useState(null);

  const [isPlaceInputValid, setPlaceInputValid] = useState(true);
  const [isLinkInputValid, setLinkInputValid] = useState(true);

  function handleChangePlace(e) {
    setPlace(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onAddCard(place, link);
  } 

  const handleValidate = (inputName, inputValue) => {
    switch(inputName) {
      case 'place':
        setPlaceInputValid(inputValue.length >= 2 && inputValue.length <= 30);
        break;
      case 'link':
        setLinkInputValid(inputValue.match(/(^https?:\/\/)?[a-z0-9~_\-.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    (place) && handleValidate('place', place);
  }, [place]);

  useEffect(() => {
    (link) && handleValidate('link', link);
  }, [link]);

  useEffect(() => {
    setPlace(null);
    setLink(null);
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name='add-profile'
      title='Новое место'
      formName='place'
      btnText={props.loading ? 'Сохранение...' : 'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      btnDisabled={!(isPlaceInputValid && isLinkInputValid)}>
      <input
        required
        id="title-input"
        type="text"
        className="popup__input popup__input_type_title"
        name="title"
        placeholder="Название"
        minLength="2"
        maxLength="30" 
        value={place || ''}
        onChange={handleChangePlace}
      />
      <p className={`popup__error title-input-error ${!isPlaceInputValid && 'popup__error_visible'}`}>{!isPlaceInputValid && 'Поле заполнено неккоректно'}</p>
      <input
        required
        id="link-input"
        type="url"
        className="popup__input popup__input_type_link"
        name="link"
        placeholder="Ссылка на картинку"
        value={link || ''}
        onChange={handleChangeLink}
      />
      <p className={`popup__error link-input-error ${!isLinkInputValid && 'popup__error_visible'}`}>{!isLinkInputValid && 'Поле заполнено неккоректно'}</p>
    </PopupWithForm>
  );
}

export default AddPlacePopup;