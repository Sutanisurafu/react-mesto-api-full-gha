import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContextObj } from "../contexts/CurrentUserContext";
import useForm from "../hooks/useForm";

const EditProfilePopup = ({ isOpen, isLoading, onClose, onUpdateUser }) => {
  const currentUser = React.useContext(CurrentUserContextObj);
  const { form, errors, handleChange } = useForm({
    name: "",
    about: "",
  });



  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: form.name,
      about: form.about,
    });
  }
  React.useEffect(() => {
    form.name = currentUser.name;
    form.about = currentUser.about;
  }, [isOpen, currentUser]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      name="edit-profile"
      title="Редактировать профиль"
      buttonText={!isLoading ? "Сохранить" : "Сохранение..."}
    >
      <label className="popup__label">
        <input
          value={form.name || ""}
          onChange={handleChange}
          name="name"
          id="profile"
          type="text"
          className="popup__input popup__input_type_name"
          placeholder="Введите имя"
          minLength={2}
          maxLength={20}
          required={true}
        />
        <span id="profile-error" className="error" style={{marginLeft: 36}}>{errors.name}</span>
      </label>
      <label className="popup__label">
        <input
          value={form.about || ""}
          onChange={handleChange}
          name="about"
          id="speciality"
          type="text"
          className="popup__input popup__input_type_speciality"
          placeholder="Введите специальность"
          minLength={2}
          maxLength={200}
          required={true}
        />
        <span id="speciality-error" className="error" style={{marginLeft: 36}}>{errors.about}</span>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
