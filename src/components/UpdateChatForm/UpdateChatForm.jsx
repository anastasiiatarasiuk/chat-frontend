import { useState } from "react";
import s from "./UpdateChatForm.module.css";

const UpdateChatForm = ({ chat, onUpdate, onCancel }) => {
  const [firstName, setFirstName] = useState(chat.firstName);
  const [lastName, setLastName] = useState(chat.lastName);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(chat._id, { firstName, lastName });
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <div className={s.inputsContainer}>
        <input
          className={s.input}
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          className={s.input}
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div className={s.buttonsContainer}>
        <button type="submit" className={s.saveBtn}>
          Save
        </button>
        <button type="button" onClick={onCancel} className={s.cancelBtn}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateChatForm;
