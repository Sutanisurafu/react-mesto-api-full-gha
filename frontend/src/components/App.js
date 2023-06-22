import React from "react";
import {
  Route,
  Routes,
  Navigate,
  useNavigate
} from "react-router-dom";
import ProtectedRouteElement from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import api from "../utils/Api";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithConfirmCardDelete from "./PopupWithConfirmCardDelete";
import { CurrentUserContextObj } from "../contexts/CurrentUserContext";
import InfoTooltip from "./InfoTooltip";
import authApi from "../utils/AuthApi";

function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isInfoToolTipOpen, setisInfoToolTipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [currentUser, setCurrentUser] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [removedCard, setRemovedCard] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [isDataLoading, setIsDataLoading] = React.useState(true);
  const [isRegisterSucces, setIsRegisterSucces] = React.useState(false);

  React.useEffect(() => {
    loggedIn &&
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
          navigate("/");
        })
        .catch((err) => {
          console.error(err);
        });
  }, [loggedIn]);

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      authApi
        .checkToken(jwt)
        .then((res) => {
          setIsDataLoading(false);
          if (res) {
            setEmail(res.email);
            setLoggedIn(true)
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsDataLoading(false);
        });
    } else {
      setIsDataLoading(false);
    }
  };

  React.useEffect(() => {
    tokenCheck();
  }, []);

  const handleUpdateUser = (userDat) => {
    setIsLoading(true);
    api
      .editUserInfo(userDat)
      .then((responseData) => {
        closeAllPopups();
        setCurrentUser(responseData);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = (avatarLink) => {
    setIsLoading(true);
    api
      .editAvatar(avatarLink)
      .then((responseData) => {
        console.log(responseData)
        closeAllPopups();
        setCurrentUser(responseData);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddPlaceSubmit = (inputValues) => {
    setIsLoading(true);
    api
      .addCard(inputValues)
      .then((responseData) => {
        closeAllPopups();
        console.log(responseData)
        setCards([responseData, ...cards]);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    if (!isLiked) {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCardDelete() {
    setIsLoading(true);
    api
      .deleteCard(removedCard._id)
      .then(() => {
        setCards(cards.filter((cardItem) => cardItem._id !== removedCard._id));
      })
      .then(() => {
        closeConfirmPopup();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  const completeRegister = () => {
    closeInfoToolTip();
    navigate("/login");
  };

  const handleRegisterSubmit = (registerData) => {
    authApi
      .register(registerData)
      .then((responseData) => {
        setIsRegisterSucces(true);
        setisInfoToolTipOpen(true);
        setTimeout(completeRegister, 3000);
      })
      .catch((err) => {
        setIsRegisterSucces(false);
        setisInfoToolTipOpen(true);
        setTimeout(closeInfoToolTip, 3000);
        console.log(err);
      });
  };

  const handleLoginSubmit = (loginData) => {
    authApi
      .login(loginData)
      .then(({ token }) => {
        localStorage.setItem("jwt", token);
        tokenCheck();
        setEmail(loginData.email);
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleCardDeleteClick(card) {
    setIsConfirmPopupOpen(true);
    setRemovedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  };

  const closeConfirmPopup = () => {
    setIsConfirmPopupOpen(false);
  };

  const closeInfoToolTip = () => {
    setisInfoToolTipOpen(false);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleSignOutClick = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setEmail("");
  };

  if (isDataLoading) {
    return;
  }

  return (
    <CurrentUserContextObj.Provider value={currentUser}>
      <Header profileEmail={email} onExit={handleSignOutClick} />

      <Routes>
        <Route path="*"
        element={
          <Navigate to="/" />
        }/>
          

        <Route
          path="/"
          element={
            loggedIn ? (
              <Navigate to="/main" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/main"
          element={
            <ProtectedRouteElement
              element={Main}
              loggedIn={loggedIn}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDeleteClick={handleCardDeleteClick}
              cards={cards}
            />
          }
        />
        <Route
          path="/register"
          element={
            loggedIn ? (
              <Navigate to="/main" replace />
            ) : (
              <Register onRegister={handleRegisterSubmit} />
            )
          }
        />
        <Route
          path="/login"
          element={
            loggedIn ? (
              <Navigate to="/main" replace />
            ) : (
              <Login onLogin={handleLoginSubmit} />
            )
          }
        />
      </Routes>

      <Footer />

      <EditProfilePopup
        onUpdateUser={handleUpdateUser}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        isLoading={isLoading}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoading}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />

      <PopupWithConfirmCardDelete
        isOpen={isConfirmPopupOpen}
        onClose={closeConfirmPopup}
        onCardDelete={handleCardDelete}
        isLoading={isLoading}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <InfoTooltip
        onClose={closeInfoToolTip}
        isOpen={isInfoToolTipOpen}
        isSucces={isRegisterSucces}
      />
    </CurrentUserContextObj.Provider>
  );
}

export default App;
