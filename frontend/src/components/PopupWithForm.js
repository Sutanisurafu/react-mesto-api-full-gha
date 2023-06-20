import React from "react";
function PopupWithForm({
  isOpen,
  onClose,
  onSubmit,
  name,
  title,
  buttonText,
  children,
}) {
  return (
    <div
      className={`popup popup_type_${name}
  ${isOpen ? `popup_opened` : ""}`}
    >
      <fieldset className="popup__container">
        <button
          onClick={onClose}
          type="button"
          className={`popup__close popup__close_type_${name}`}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          onSubmit={onSubmit}
          name={`${name}-form`}
          className={`popup__form popup__form_type_${name}`}
          action="#"
        >
          {children}
          <button
            name="profile-submit-btn"
            type="submit"
            className="popup__submit-btn popup__submit-btn_type_profile"
          >
            {buttonText}
          </button>
        </form>
      </fieldset>
    </div>
  );
}

export default PopupWithForm;
