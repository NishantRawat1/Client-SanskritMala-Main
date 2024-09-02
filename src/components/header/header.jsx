import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCaretDown, FaBars, FaTimes } from 'react-icons/fa';
import './header.css'; // Ensure this imports the correct CSS file
import logo from '../../assets/logo.png'; // Adjust the path as necessary

const Header = ({ isAuth }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation(); // Hook to get current location

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setDropdownOpen(false); // Close dropdown when toggling the main menu
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) { // Adjust this value as needed
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path ? 'active-link' : '';

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <Link to={'/'} className='logo'>
        <img src={logo} alt="SanskritMala Logo" className="logo-img" />
      </Link>
      <div className='hamburger' onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <nav className={`link ${menuOpen ? 'active' : ''}`}>
        <div className='dropdown'>
          <button className='dropdown-btn' onClick={toggleDropdown}>
            Our Services <FaCaretDown />
          </button>
          {dropdownOpen && (
            <div className='dropdown-content'>
              <Link to={'/courses'} className={isActive('/courses')} onClick={() => { setMenuOpen(false); setDropdownOpen(false); }}>Courses</Link>
              <Link to={'/notes'} className={isActive('/notes')} onClick={() => { setMenuOpen(false); setDropdownOpen(false); }}>Notes</Link>
              <Link to={'/ebooks'} className={isActive('/ebooks')} onClick={() => { setMenuOpen(false); setDropdownOpen(false); }}>E-Books</Link>
              <Link to={'/test-series'} className={isActive('/test-series')} onClick={() => { setMenuOpen(false); setDropdownOpen(false); }}>Test Series</Link>
              <Link to={'/book-store'} className={isActive('/book-store')} onClick={() => { setMenuOpen(false); setDropdownOpen(false); }}>Book Store</Link>
            </div>
          )}
        </div>
        <Link to={'/about'} className={isActive('/about')} onClick={() => setMenuOpen(false)}>About Us</Link>
        {isAuth ? (
          <Link to={'/account'} className={isActive('/account')} onClick={() => setMenuOpen(false)}>Profile</Link>
        ) : (
          <>
            <Link to={'/login'} className={isActive('/login')} onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to={'/register'} className={isActive('/register')} onClick={() => setMenuOpen(false)}>Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
