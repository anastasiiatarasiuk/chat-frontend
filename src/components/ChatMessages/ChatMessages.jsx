import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatByIdThunk, sendMessageThunk } from "../../redux/operations";
import {
  selectCurrentChat,
  selectIsError,
  selectIsLoading,
} from "../../redux/selectors";
import s from "./ChatMessages.module.css";

const ChatMessages = () => {
  const { chatId } = useParams();
  const dispatch = useDispatch();

  const chat = useSelector(selectCurrentChat);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(fetchChatByIdThunk(chatId));
  }, [chatId, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      dispatch(sendMessageThunk({ chatId, messageText: message }));
      setMessage("");
    }
  };

  if (isLoading) {
    return <h2>Loading messages...</h2>;
  }

  if (isError) {
    return <h2>Failed to load chat. Please try again.</h2>;
  }

  if (!chat) {
    return <h2>Chat not found.</h2>;
  }

  return (
    <div className={s.chatMessages}>
      <h2>
        Messages for {chat.firstName} {chat.lastName}
      </h2>

      <ul className={s.messageList}>
        {chat.messages.map((message, index) => (
          <li
            key={index}
            className={`${s.messageItem} ${
              message.sender === "user" ? s.userMessage : s.botMessage
            }`}
          >
            <p>{message.sender === "user" ? "You" : "Bot"}:</p> {message.text}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className={s.messageForm}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
          className={s.messageInput}
        />
        <button type="submit" className={s.sendButton}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatMessages;
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchChatByIdThunk, sendMessageThunk } from "../../redux/operations";
// import {
//   selectCurrentChat,
//   selectIsError,
//   selectIsLoading,
// } from "../../redux/selectors";
// import s from "./ChatMessages.module.css";

// const ChatMessages = () => {
//   const { chatId } = useParams();
//   const dispatch = useDispatch();

//   const chat = useSelector(selectCurrentChat);
//   const isLoading = useSelector(selectIsLoading);
//   const isError = useSelector(selectIsError);

//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     dispatch(fetchChatByIdThunk(chatId));
//   }, [chatId, dispatch]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (message.trim()) {
//       dispatch(sendMessageThunk({ chatId, messageText: message }));
//       setMessage(""); // Очищення поля після відправки
//     }
//   };

//   if (isLoading) {
//     return <h2>Loading messages...</h2>;
//   }

//   if (isError) {
//     return <h2>Failed to load chat. Please try again.</h2>;
//   }

//   if (!chat) {
//     return <h2>Chat not found.</h2>;
//   }

//   return (
//     <div className={s.chatMessages}>
//       <h2>
//         Messages for {chat.firstName} {chat.lastName}
//       </h2>

//       <ul className={s.messageList}>
//         {chat.messages.map((message, index) => (
//           <li
//             key={index}
//             className={`${s.messageItem} ${
//               message.sender === "user" ? s.userMessage : s.botMessage
//             }`}
//           >
//             <p>{message.sender === "user" ? "You" : "Bot"}:</p> {message.text}
//           </li>
//         ))}
//       </ul>
//       <form onSubmit={handleSubmit} className={s.messageForm}>
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type your message"
//           className={s.messageInput}
//         />
//         <button type="submit" className={s.sendButton}>
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ChatMessages;
