import PopupWithForm from "./PopupWithForm";
import React from "react";

const AddPlacePopup = ({ isOpen, isLoading, onClose, onAddPlace }) => {
  const placeRef = React.useRef();
  const linkRef = React.useRef();

  React.useEffect(() => {
    placeRef.current.value = "";
    linkRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: placeRef.current.value,
      link: linkRef.current.value,
    });
      
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={!isLoading ? "Сохранить"  :  "Сохранение..."}
    >
      <label className="popup__label">
        <input
          ref={placeRef}
          name="name"
          id="card-name"
          type="text"
          className="popup__input popup__input_type_place"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          required={true}
        />
        <span id="card-name-error" className="error" />
      </label>
      <label className="popup__label">
        <input
          ref={linkRef}
          name="link"
          id="card-image"
          type="url"
          className="popup__input popup__input_type_image-link"
          placeholder="Ссылка на картинку"
          required={true}
        />
        <span id="card-image-error" className="error" />
      </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
