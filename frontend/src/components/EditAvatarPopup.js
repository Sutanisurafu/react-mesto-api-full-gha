import PopupWithForm from "./PopupWithForm";
import React from "react";

const EditAvatarPopup = ({ isOpen, isLoading, onClose, onUpdateAvatar }) => {
  const avatarRef = React.useRef(); // записываем объект, возвращаемый хуком, в переменную

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={!isLoading ? "Сохранить" : "Сохранение..."}
    >
      <label className="popup__label">
        <input
          ref={avatarRef}
          name="avatar"
          id="avatar-img"
          type="url"
          className="popup__input popup__input_type_avatar"
          placeholder="Ссылка на изображение аватара"
          required={true}
        />
        <span id="avatar-img-error" className="error" />
      </label>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
