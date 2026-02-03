import { useLoaderData, Outlet, useOutletContext, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { toggleEditMode } from '../redux/uiSlice';
import { updateContact } from '../redux/contactsSlice';
import { fetchContactById } from "../data/api";
import { useState, useEffect } from "react";

export async function contactLoader({ params }) {
  const contact = await fetchContactById(params.contactId);
  return contact;
}

export function ContactHistory() {
  const contact = useOutletContext();
  return (
    <div className="log-box">
      <h3 style={{ marginTop: 0, fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "15px" }}>ЛОГ АКТИВНОСТІ</h3>
      {contact.history && contact.history.length > 0 ? (
        <div style={{border: "1px solid #eee", padding: "15px", background: "#fdfdfd"}}>
          <small style={{color: "#888", fontWeight: "bold"}}>ОСТАННІЙ ЗАПИС:</small>
          <div style={{marginTop: "5px"}}>› {contact.history[0].action}</div>
        </div>
      ) : <p>Пусто</p>}
    </div>
  );
}

export default function ContactPage() {
  const loaderContact = useLoaderData();
  const contactFromStore = useSelector(state => 
    state.contacts.items.find(c => c.login.uuid === loaderContact.login.uuid)
  );
  const contact = contactFromStore || loaderContact;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEditing = useSelector((state) => state.ui.isEditingMode);
  const [formData, setFormData] = useState({
    fullName: `${contact.name.first} ${contact.name.last}`,
    phone: contact.phone,
    email: contact.email
  });
  useEffect(() => {
    setFormData({
        fullName: `${contact.name.first} ${contact.name.last}`,
        phone: contact.phone,
        email: contact.email
    });
  }, [contact]);
  const handleSave = () => {
    const [first, ...rest] = formData.fullName.split(' ');
    const last = rest.join(' ') || '';
    dispatch(updateContact({
      id: contact.login.uuid,
      updatedData: {
        first,
        last,
        phone: formData.phone,
        email: formData.email
      }
    }));
    dispatch(toggleEditMode());
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", paddingTop: "20px" }}>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <button onClick={() => navigate(-1)} className="btn-back">Назад</button>
        <button 
          onClick={isEditing ? handleSave : () => dispatch(toggleEditMode())} 
          style={{
            background: isEditing ? "#10b981" : "#333",
            color: "white", 
            border: "none", 
            padding: "8px 20px", 
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "0.95rem"
          }}
        >
          {isEditing ? "Зберегти зміни" : "Редагувати"}
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "25px", paddingBottom: "25px", marginBottom: "25px", borderBottom: "1px solid #eee" }}>
        <img src={contact.picture.large} alt={contact.name.first} style={{ borderRadius: "50%", width: "100px", height: "100px" }} />
        <div style={{flex: 1}}>
            {isEditing ? (
              <input 
                type="text" 
                value={formData.fullName} 
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                style={{fontSize: "1.5rem", padding: "8px", width: "100%", border: "2px solid #000", borderRadius: "4px"}} 
              />
            ) : (
              <h2 style={{ margin: "0", textTransform: "uppercase", fontSize: "2rem" }}>{contact.name.first} {contact.name.last}</h2>
            )}
            <small style={{ color: "#999" }}>ID: {contact.login.uuid}</small>
        </div>
      </div>

      <div style={{ marginBottom: "30px", fontSize: "1.1rem", display: "grid", gap: "20px" }}>
        <div>
          <strong style={{textTransform: "uppercase", fontSize: "0.8rem", color: "#666", display: "block", marginBottom: "5px"}}>Телефон</strong> 
          {isEditing ? (
            <input 
                type="text" 
                value={formData.phone} 
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                style={{padding: "8px", width: "100%", border: "1px solid #ccc", borderRadius: "4px"}} 
            />
          ) : (
            <span>{contact.phone}</span>
          )}
        </div>
        <div>
          <strong style={{textTransform: "uppercase", fontSize: "0.8rem", color: "#666", display: "block", marginBottom: "5px"}}>Email</strong> 
          {isEditing ? (
            <input 
                type="text" 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                style={{padding: "8px", width: "100%", border: "1px solid #ccc", borderRadius: "4px"}} 
            />
          ) : (
            <span>{contact.email}</span>
          )}
        </div>
      </div>

      <Link to="history" className="btn-outline">Архів подій</Link>
      <div style={{marginTop: "20px"}}><Outlet context={contact} /></div>
    </div>
  );
}