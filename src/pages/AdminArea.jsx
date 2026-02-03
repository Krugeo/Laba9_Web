import { useNavigate } from "react-router-dom";

export default function AdminArea() {
const navigate = useNavigate();
return (
    <div style={{ maxWidth: "600px" }}>
    <h1>Закрита зона керування</h1>
    <div style={{ padding: "20px", border: "1px solid #ffcccb", borderRadius: "8px", background: "#fff5f5", marginTop: "20px" }}>
        <h3 style={{ marginTop: 0, color: "#d32f2f" }}>Дії адміністратора</h3>
        <button 
            onClick={() => { if(window.confirm("Вийти?")) navigate("/"); }}
            style={{ padding: "10px 20px", background: "#d32f2f", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
            Вийти
        </button>
    </div>
    </div>
);
}