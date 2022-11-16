import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);

  const [isNameInputValid, setNameInputValid] = useState(true);
  const [isDescriptionInputValid, setDescriptionInputValid] = useState(true);

  const currentUser = useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  const handleValidate = (inputName, inputValue) => {
    switch(inputName) {
      case 'name':
        setNameInputValid(inputValue.length >= 2 && inputValue.length <= 40);
        break;
      case 'description':
        setDescriptionInputValid(inputValue.length >= 2 && inputValue.length <= 200);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]); 

  useEffect(() => {
    (name) && handleValidate('name', name);
  }, [name]);

  useEffect(() => {
    (description) && handleValidate('description', description);
  }, [description]);

  return (
    <PopupWithForm
      name='edit-profile'
      title='Редактировать профиль'
      formName='info'
      btnText={props.loading ? 'Сохранение...' : 'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      btnDisabled={!(isNameInputValid && isDescriptionInputValid)}>
      <input
        required
        id="name-input"
        type="text"
        className="popup__input popup__input_type_name"
        name="name"
        value={name || ''}
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        onChange={handleChangeName}
      />
      <p className={`popup__error name-input-error ${!isNameInputValid && 'popup__error_visible'}`}>{!isNameInputValid && 'Поле заполнено неккоректно'}</p>
      <input
        required
        id="status-input"
        type="text"
        className="popup__input popup__input_type_status"
        name="status"
        value={description || ''}
        minLength="2"
        maxLength="200"
        placeholder="Статус"
        onChange={handleChangeDescription}
      />
      <p className={`popup__error status-input-error ${!isDescriptionInputValid && 'popup__error_visible'}`}>{!isDescriptionInputValid && 'Поле заполнено неккоректно'}</p>
    </PopupWithForm>
  );
}

export default EditProfilePopup;