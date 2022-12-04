import { useEffect, useRef, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  const [isAvatartInputValid, setAvatartInputValid] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar(avatarRef.current.value, avatarRef);
  } 

  // const handleValidate = () => {
  //   setAvatartInputValid(avatarRef.current.value.match(/(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i) ? true : false);
  // }

  // useEffect(() => {
  //   // console.log(avatarRef.current.value)
  //   (avatarRef.current.value) && handleValidate();
  // }, [avatarRef.current]);

  return (
    <PopupWithForm
      name='edit-avatar'
      title='Обновить аватар'
      formName='avatar'
      btnText={props.loading ? 'Сохранение...' : 'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      btnDisabled={!isAvatartInputValid}>
      <input
        required
        id="avatar-input"
        type="url"
        className="popup__input popup__input_type_avatar"
        name="avatar"
        placeholder="Ссылка на аватар"
        ref={avatarRef}
      />
      <p className="popup__error avatar-input-error">{!isAvatartInputValid && 'Поле заполнено неккоректно'}</p>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;