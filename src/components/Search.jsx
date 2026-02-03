import { useDispatch, useSelector } from 'react-redux';
import { setFilterText } from '../redux/contactsSlice';

export default function Search() {
  const dispatch = useDispatch();
  const filterText = useSelector((state) => state.contacts.filterText);

  return (
    <div className="search-wrapper">
      <input
        className="search-input"
        type="text"
        placeholder="Пошук за ім'ям..."
        value={filterText}
        onChange={(e) => dispatch(setFilterText(e.target.value))}
      />
    </div>
  );
}