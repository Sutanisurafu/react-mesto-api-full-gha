import PopupWithForm from "./PopupWithForm";

const PopupWithConfirmCardDelete = ({
  isOpen,
  onClose,
  onCardDelete,
  isLoading,
}) => {
  
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete();
  }

  return (
    <PopupWithForm
      name="remove-card"
      title="Вы уверены?"
      buttonText={!isLoading ? "да" : "загрузка..."}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default PopupWithConfirmCardDelete;
