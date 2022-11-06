function Register() {
  return (
    <div className="unauthorizedForm">
      <button className="unauthorizedForm__header-button">Войти</button>
      <h2 className="unauthorizedForm__title">Регистрация</h2>
      <form method="get" name="unauthorizedFormForm" className="unauthorizedForm__form" onSubmit={''} noValidate>
        <input
          required
          id="email-input"
          type="email"
          className="unauthorizedForm__input unauthorizedForm__input_type_email"
          name="email"
          minLength="2"
          maxLength="40"
          placeholder="Email"
          onChange={''}
        />
        <input
          required
          id="password-input"
          type="password"
          className="unauthorizedForm__input unauthorizedForm__input_type_password"
          name="password"
          minLength="2"
          maxLength="40"
          placeholder="Пароль"
          onChange={''}
        />
        <button type="submit" className="unauthorizedForm__submit-button">Зарегистрироваться</button>
        <button className="unauthorizedForm__button">Уже зарегистрированы? Войти</button>
      </form>
    </div>
  );
}

export default Register;