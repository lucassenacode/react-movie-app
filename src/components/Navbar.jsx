import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
 
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        🎬 MovieFinder
      </Link>

      
      <button className="hamburger-icon" onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      
      <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
        
        <Link to="/" onClick={() => setIsOpen(false)}>Início</Link>
        <Link to="/favorites" onClick={() => setIsOpen(false)}>Favoritos</Link>
      </div>
    </nav>
  );
};

export default Navbar;