import { Link } from "react-router-dom";
import { useState } from "react";

function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="unauthorized-form">
      <Link to="/sign-in" className="unauthorized-form__header-button">Войти</Link>
      <h2 className="unauthorized-form__title">Регистрация</h2>
      <form method="get" name="unauthorized-formForm" className="unauthorized-form__form" onSubmit={handleSubmit} noValidate>
        <input
          required
          id="email-input"
          type="email"
          className="unauthorized-form__input unauthorized-form__input_type_email"
          name="email"
          minLength="2"
          maxLength="40"
          placeholder="Email"
          onChange={handleChangeEmail}
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
          onChange={handleChangePassword}
        />
        <button type="submit" className="unauthorized-form__submit-button">Зарегистрироваться</button>
        <Link to="sign-in" className="unauthorized-form__button">Уже зарегистрированы? Войти</Link>
      </form>
    </div>
  );
}

export default Register;