import { Link } from "react-router-dom";

export default function mainpage() {
return (
    <div style={{ maxWidth: "600px", padding: "40px 0" }}>
    <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "black" }}>
        Система керування базою абонентів
    </h1>
    <p style={{ fontSize: "1.1rem", color: "#666", lineHeight: "1.6", marginBottom: "30px" }}>
        Веб-застосунок для адміністрування контактних даних. Забезпечує структурування інформації та логування історії викликів.
    </p>
    <Link to="/contacts" className="btn-primary">
        Перейти до контактів
    </Link>
    </div>
);
}