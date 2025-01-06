import { useState } from "react";
import ChatsList from "../ChatList/ChatList";
import CreateChatForm from "../CreateChatForm/CreateChatForm";
import s from "./Sidebar.module.css";
import SearchBox from "../SearchBox/SearchBox";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <aside className={s.sidebar}>
        <div className={s.topContainer}>
          <SearchBox />
          <button onClick={handleOpenModal} className={s.createChatBtn}>
            Create chat
          </button>
        </div>
        <ChatsList />
      </aside>
      {isModalOpen && (
        <div className={s.modalOverlay} onClick={handleCloseModal}>
          <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
            <CreateChatForm onCloseModal={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
