import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import { addChatThunk } from "../../redux/operations";
import s from "./CreateChatForm.module.css";

const CreateChatForm = ({ onCloseModal }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        addChatThunk({
          firstName: formData.firstName,
          lastName: formData.lastName,
        })
      );
      toast.success("Chat added successfully!");
      setFormData({ firstName: "", lastName: "" });
      onCloseModal(); // Закриття модального вікна
    } catch {
      toast.error("Failed to add chat. Please try again.");
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit} className={s.form}>
        <h2 className={s.formTitle}>Create chat</h2>
        <label className={s.fieldTitle}>Enter chat name</label>
        <input
          className={s.input}
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <label className={s.fieldTitle}>Enter chat last name</label>
        <input
          className={s.input}
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <button type="submit" className={s.saveBtn}>
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateChatForm;
