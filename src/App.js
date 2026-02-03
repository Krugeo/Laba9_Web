import { Outlet, NavLink, Link, useNavigation } from "react-router-dom";
import './App.css';

function App() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="App">
      <header className="app-header">
        <div className="container">
          <Link to="/" className="logo">Менеджер контактів</Link>
          <nav className="app-nav">
            <NavLink to="/" className="nav-link">Головна</NavLink>
            <NavLink to="/contacts" className="nav-link">Контакти</NavLink>
            <NavLink to="/admin" className="nav-link">Адмін панель</NavLink>
          </nav>
        </div>
      </header>
      {isLoading && <div style={{height: "2px", background: "black", width: "100%", position: "fixed", top: 0}}></div>}

      <main className="app-main">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <footer className="app-footer">
        <div className="container">
          <span>Anna Shmatko</span>
        </div>
      </footer>
    </div>
  );
}

export default App;