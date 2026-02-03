import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, selectFilteredContacts, toggleFavorite, setGroupFilter } from '../redux/contactsSlice';
import { toggleSearch } from '../redux/uiSlice';
import Search from '../components/Search'; 

export default function ContactsList() {
  const dispatch = useDispatch();
  
  const contacts = useSelector(selectFilteredContacts);
  const status = useSelector((state) => state.contacts.status);
  const favorites = useSelector((state) => state.contacts.favorites);
  const isSearchVisible = useSelector((state) => state.ui.isSearchVisible);
  const currentGroup = useSelector((state) => state.contacts.filterGroup);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getContacts());
    }
  }, [status, dispatch]);

  const displayedContacts = currentGroup === 'favorites' 
    ? contacts.filter(c => favorites.includes(c.login.uuid))
    : contacts;

  if (status === 'loading') return <div style={{padding: "20px", textAlign: "center"}}>Завантаження контактів...</div>;
  if (status === 'failed') return <div style={{padding: "20px", color: "red", textAlign: "center"}}>Помилка завантаження</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px" }}>
        <h1 style={{margin: 0, fontSize: "2rem"}}>Контакти</h1>
        
        <button 
            onClick={() => dispatch(toggleSearch())} 
            style={{
                cursor: "pointer", background: "none", border: "none", 
                color: "#666", fontWeight: "500", fontSize: "0.9rem"
            }}
        >
            {isSearchVisible ? 'Сховати пошук' : 'Показати пошук'}
        </button>
      </div>
      {isSearchVisible && <Search />}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {['all', 'family', 'work'].map(group => (
          <button
            key={group}
            onClick={() => dispatch(setGroupFilter(group))}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: "1px solid #333",
              background: currentGroup === group ? "#000" : "transparent",
              color: currentGroup === group ? "#fff" : "#333",
              cursor: "pointer",
              textTransform: "capitalize"
            }}
          >
            {group === 'all' ? 'Всі' : group === 'family' ? 'Сім\'я' : 'Робота'}
          </button>
        ))}

        <button
            onClick={() => dispatch(setGroupFilter('favorites'))}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: "1px solid #e11d48",
              background: currentGroup === 'favorites' ? "#e11d48" : "transparent",
              color: currentGroup === 'favorites' ? "#fff" : "#e11d48",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Вибрані ({favorites.length})
        </button>
      </div>

      <div style={{marginBottom: "15px", color: "#888", fontSize: "0.9rem"}}>
        Всього: {displayedContacts.length}
      </div>
      
      <div className="contacts-grid">
        {displayedContacts.map((user) => {
          const isFav = favorites.includes(user.login.uuid);
          return (
            <div key={user.login.uuid} className="contact-card" style={{borderColor: isFav ? '#f59e0b' : '#eaeaea'}}>
              <button 
                className={`fav-btn ${isFav ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(toggleFavorite(user.login.uuid));
                }}
              >
                ★
              </button>

              <Link to={`/contact/${user.login.uuid}`}>
                <img src={user.picture.medium} alt={user.name.first} className="avatar" />
                <div>
                  <div style={{ fontWeight: "700", fontSize: "1.05rem", color: "#000" }}>
                    {user.name.first} {user.name.last}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#666", textTransform: "uppercase", marginTop: "4px" }}>
                    <span style={{background: "#f0f0f0", padding: "2px 6px", borderRadius: "4px"}}>
                      {user.group === 'work' ? 'Робота' : 'Сім\'я'}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {displayedContacts.length === 0 && (
        <p style={{textAlign: "center", color: "#888", marginTop: "40px"}}>
          Список порожній...
        </p>
      )}
    </div>
  );
}
