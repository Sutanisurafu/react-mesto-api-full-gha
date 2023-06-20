import React from "react";
function ImagePopup(props) {
  return (
    <div
      className={
        props.card.link
          ? "popup popup_type_image-popup popup_opened"
          : "popup popup_type_image-popup"
      }
    >
      <div className="popup__image-container">
        <button
          className="popup__close popup__image-close-btn"
          onClick={props.onClose}
        />
        <img
          src={props.card.link}
          alt={props.card.name}
          className="popup__image-item"
        />
        <p className="popup__image-caption">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
