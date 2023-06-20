import React from "react";
import complete from "../image/complete.svg";
import error from "../image/error.svg";

const completeText = "Вы успешно зарегистрировались!";
const errorText = "Что-то пошло не так! Попробуйте ещё раз.";
const InfoTooltip = ({ onClose, isOpen, isSucces }) => {
  return (
    <div
      className={`popup popup_type_info 
      ${isOpen ? `popup_opened` : ""}`}
    >
      <fieldset
        className="popup__container
                 popup__container_type_info"
      >
        <button
          onClick={onClose}
          type="button"
          className={`popup__close popup__close_type_info`}
        />
        <img
          className="popup__infoTool-img"
          src={!isSucces ? error : complete}
        ></img>
        <h2 className="popup__title popup__title_type_info">
          {!isSucces ? errorText : completeText}
        </h2>
      </fieldset>
    </div>
  );
};

export default InfoTooltip;
