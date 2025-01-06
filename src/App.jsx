import { useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import { fetchChatsThunk } from "./redux/operations";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";

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
      <main></main>
    </div>
  );
};

export default memo(App);
