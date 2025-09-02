import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiThemoviedatabase } from "react-icons/si";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mf-footer">
      <div className="mf-footer__inner">
        {/* Esquerda */}
        <div className="mf-footer__brand">
          <p>
            © {year} <strong>Lucas Sena</strong>
          </p>
          <span className="mf-divider" aria-hidden="true" />
          <span className="mf-powered" title="The Movie Database">
            <SiThemoviedatabase />
            <span>TMDB</span>
          </span>
        </div>

        <nav className="mf-footer__nav" aria-label="Links do rodapé">
          <Link to="/">Início</Link>
          <Link to="/favorites">Favoritos</Link>
        </nav>

        <div className="mf-footer__social">
          <a
            href="https://www.linkedin.com/in/1-lucas-sena/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn de Lucas Sena"
            className="mf-socialbtn"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/lucassenacode?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="mf-socialbtn"
            title="GitHub"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
}
