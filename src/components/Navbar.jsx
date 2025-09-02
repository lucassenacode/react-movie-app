import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [favCount, setFavCount] = useState(0);
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    try {
      const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
      setFavCount(Array.isArray(favs) ? favs.length : 0);
    } catch {
      setFavCount(0);
    }
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/?q=${encodeURIComponent(query.trim())}`);
    setOpen(false);
  };

  const navLinks = useMemo(
    () => [
      { to: "/", label: "Início" },
      { to: "/favorites", label: "Favoritos", badge: favCount },
    ],
    [favCount]
  );

  return (
    <header className="mf-header">
      <nav className="mf-nav container">

        <Link to="/" className="mf-brand" aria-label="MovieFinder - Início">
          <span className="mf-logo">
            <span className="mf-logo-icon">📽️</span>
            <span className="mf-logo-text">
              Film<span className="mf-logo-accent"> Royale</span>
            </span>
          </span>
        </Link>

        <button
          className="mf-burger"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`mf-right ${open ? "open" : ""}`}>
          <ul className="mf-links" role="menu">
            {navLinks.map((l) => (
              <li key={l.to} role="none">
                <NavLink
                  to={l.to}
                  role="menuitem"
                  className={({ isActive }) =>
                    "mf-link" + (isActive ? " active" : "")
                  }
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                  {l.badge ? <span className="mf-badge">{l.badge}</span> : null}
                </NavLink>
              </li>
            ))}
          </ul>
          <form className="mf-search" onSubmit={onSubmit} role="search">
            <input
              type="search"
              placeholder="Buscar filmes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Buscar filmes"
            />
            <button type="submit">Buscar</button>
          </form>

          <button
            className="mf-theme"
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            aria-label="Alternar tema"
            title="Alternar tema"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
        </div>
      </nav>
    </header>
  );
}