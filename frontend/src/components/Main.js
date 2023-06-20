import React from "react";
import Card from "./Card";
import { CurrentUserContextObj } from "../contexts/CurrentUserContext";

function Main({
  cards,
  onCardClick,
  onCardLike,
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardDeleteClick,
  onEditProfile2,
}) {
  const currentUser = React.useContext(CurrentUserContextObj);
  return (
    <main className="content">
      <section className="profile">
        <div className="avatar-container">
          <img
            src={currentUser.avatar}
            className="avatar-container__image"
            alt="Аватар"
          />
          <div className="avatar-container__overlay">
            <button
              type="button"
              className="avatar-container__edit-btn"
              onClick={onEditAvatar}
            />
          </div>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__edit-btn"
            onClick={onEditProfile}
          />
          <p className="profile__text">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-btn"
          onClick={onAddPlace}
        />
      </section>
      <section className="cards">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDeleteClick={onCardDeleteClick}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
