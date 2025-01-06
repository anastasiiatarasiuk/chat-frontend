import { useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import { fetchChatsThunk } from "./redux/operations";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import ChatMessages from "./components/ChatMessages/ChatMessages";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChatsThunk());
  }, [dispatch]);

  return (
    <div className="container">
      <aside>
        <Sidebar />
      </aside>
      <main>
        <Routes>
          <Route path="/chats/:chatId/messages" element={<ChatMessages />} />
        </Routes>
      </main>
    </div>
  );
};

export default memo(App);
