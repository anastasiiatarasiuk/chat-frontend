import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsLoading,
  selectIsError,
  selectFilteredChats,
} from "../../redux/selectors";
import { deleteChatThunk, updateChatThunk } from "../../redux/operations";
import UpdateChatForm from "../UpdateChatForm/UpdateChatForm";
import s from "./ChatList.module.css";

const ChatsList = () => {
  const dispatch = useDispatch();
  const chats = useSelector(selectFilteredChats);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const [editingChatId, setEditingChatId] = useState(null);

  const handleDeleteChat = (chatId) => {
    dispatch(deleteChatThunk(chatId));
  };

  const handleUpdateChat = (chatId, updatedData) => {
    dispatch(updateChatThunk({ _id: chatId, updatedChat: updatedData }));
    setEditingChatId(null);
  };

  if (isLoading) {
    return <h2>Loading chats...</h2>;
  }

  if (isError) {
    return <h2>Failed to load chats. Please try again.</h2>;
  }

  return (
    <div>
      {chats.length === 0 ? (
        <h2>No chats available.</h2>
      ) : (
        <div>
          <h2 className={s.title}>Your chats</h2>
          <ul className={s.chatsList}>
            {chats.map((chat) => (
              <li key={chat._id} className={s.listItem}>
                <div className={s.container}>
                  {editingChatId === chat._id ? (
                    <UpdateChatForm
                      chat={chat}
                      onUpdate={handleUpdateChat}
                      onCancel={() => setEditingChatId(null)}
                    />
                  ) : (
                    <>
                      <div>
                        <h3>
                          {chat.firstName} {chat.lastName}
                        </h3>
                      </div>
                      <div className={s.buttonsContainer}>
                        <button
                          onClick={() => setEditingChatId(chat._id)}
                          className={s.updateBtn}
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDeleteChat(chat._id)}
                          className={s.deleteBtn}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChatsList;
