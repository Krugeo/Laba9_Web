import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const status = error.status || "Error";
  const message = error.data?.message || error.statusText || error.message || "Невідома помилка";

  return (
    <div className="error-page-wrapper">
      <h1 className="error-code">{status}</h1>
      <div className="error-title">Упс! Щось пішло не так.</div>
      
      <div style={{ margin: "20px 0", color: "red", fontFamily: "monospace" }}>
        <strong>System Message:</strong> {message}
      </div>

      <Link to="/" className="btn-primary">
        Повернутися на головну
      </Link>
    </div>
  );
}