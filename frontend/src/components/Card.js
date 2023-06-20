import React from "react";
import { CurrentUserContextObj } from "../contexts/CurrentUserContext";
function Card({ card, onCardClick, onCardLike, onCardDeleteClick }) {

  const currentUser = React.useContext(CurrentUserContextObj);
  const [isLiked, setIsLiked] = React.useState();
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;
  const isLike = card.likes.map((owner) => owner).includes(currentUser._id);



  React.useEffect(() => {
    setIsLiked(isLike);
  }, [isLike]);

  const cardLikeButtonClassName = `response-container__like-btn ${
    isLiked && "response-container__like-btn_active"
  }`;

  function handleDeleteClick() {
    onCardDeleteClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleClick() {
    onCardClick(card);
  }

  return (
    <article className="card">
      <img
        src={card.link}
        alt={card.name}
        className="card__image"
        onClick={handleClick}
      />
      <h2 className="card__title">{card.name}</h2>
      <div className="response-container">
        <button
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        ></button>
        <span className="response-container__like-counter">
          {card.likes.length}
        </span>
      </div>
      {isOwn && (
        <button
          className="trash-btn trash-btn_type_visible"
          onClick={handleDeleteClick}
        />
      )}
    </article>
  );
}

export default Card;
