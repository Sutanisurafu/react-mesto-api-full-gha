import React from "react";
import useForm from "../hooks/useForm";

const Login = ({ onLogin }) => {
  const { form, errors, handleChange } = useForm ({
    email: "",
    password: ""
  })

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({
      email: form.email,
      password: form.password,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="login">
      <h1 className="login__title">Вход</h1>
      <label style={{ position: "relative" }}>
      <input
        type="email"
        name="email"
        className="register__input"
        value={form.email}
        onChange={handleChange}
        placeholder="email"
        required={true}
      ></input>
        <span className="error">{errors.email}</span>
      </label>
      <input
        type="password"
        name="password"
        className="register__input"
        value={form.password}
        autoComplete="off"
        onChange={handleChange}
        placeholder="Пароль"
        required={true}
      ></input>
      <button className="login__submitBtn">Войти</button>
    </form>
  );
};

export default Login;
