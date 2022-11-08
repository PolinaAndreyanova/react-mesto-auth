function Register() {
  return (
    <div className="unauthorized-form">
      <button className="unauthorized-form__header-button">Войти</button>
      <h2 className="unauthorized-form__title">Регистрация</h2>
      <form method="get" name="unauthorized-formForm" className="unauthorized-form__form" onSubmit={''} noValidate>
        <input
          required
          id="email-input"
          type="email"
          className="unauthorized-form__input unauthorized-form__input_type_email"
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
          className="unauthorized-form__input unauthorized-form__input_type_password"
          name="password"
          minLength="2"
          maxLength="40"
          placeholder="Пароль"
          onChange={''}
        />
        <button type="submit" className="unauthorized-form__submit-button">Зарегистрироваться</button>
        <button className="unauthorized-form__button">Уже зарегистрированы? Войти</button>
      </form>
    </div>
  );
}

export default Register;