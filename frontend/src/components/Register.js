import React from "react";
import { NavLink } from "react-router-dom";
import useForm from "../hooks/useForm";

const Register = ({ onRegister }) => {
  const { form, errors, handleChange } = useForm({
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({
      email: form.email,
      password: form.password,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="register">
      <h1 className="register__title">Регистрация</h1>
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
      <label style={{ position: "relative" }}>
        <input
          type="password"
          name="password"
          className="register__input"
          value={form.password}
          onChange={handleChange}
          placeholder="Пароль"
          autoComplete="off"
          minLength={4}
          required={true}
        ></input>
        <span className="error">{errors.password}</span>
      </label>
      <button className="register__submitBtn">Зарегистрироваться</button>
      <NavLink className="register__label" to="/login">
        Уже зарегистрированны? Войти
      </NavLink>
    </form>
  );
};

export default Register;
