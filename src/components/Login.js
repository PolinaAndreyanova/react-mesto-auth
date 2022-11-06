function Login() {
  return (
    <div className="login">
      <button className="login__button">Регистрация</button>
      <h2 className="login__title">Вход</h2>
      <form method="get" name="loginForm" className="login__form" onSubmit={''} noValidate>
        <input
          required
          id="email-input"
          type="email"
          className="login__input login__input_type_email"
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
          className="login__input login__input_type_password"
          name="password"
          minLength="2"
          maxLength="40"
          placeholder="Пароль"
          onChange={''}
        />
        <button type="submit" className="login__submit-button">Войти</button>
      </form>
    </div>
  );
}

export default Login;