import { useDispatch, useSelector } from "react-redux";
import s from "./SearchBox.module.css";
import { selectFilter } from "../../redux/selectors";
import { changeFilter } from "../../redux/filtersSlice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const value = useSelector(selectFilter);

  return (
    <>
      <input
        className={s.searchInput}
        type="text"
        value={value}
        placeholder="Find chat..."
        onChange={(e) => dispatch(changeFilter(e.target.value))}
      />
    </>
  );
};

export default SearchBox;
