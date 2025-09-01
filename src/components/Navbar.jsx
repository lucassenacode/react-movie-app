import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        🎬 MovieFinder
      </Link>
      <div className="navbar-links">
        <Link to="/">Início</Link>
        <Link to="/favorites">Favoritos</Link>
      </div>
    </nav>
  );
};

export default Navbar;