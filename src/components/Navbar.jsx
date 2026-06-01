import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const { cartCount } = useCart();
    const [menuOpen, setMenuOpen] = useState(false);

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const handleAnchorClick = (e, hash) => {
        e.preventDefault();
        setMenuOpen(false);
        if (!isHomePage) {
            navigate('/');
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const handleNavClick = (e, path) => {
        e.preventDefault();
        setMenuOpen(false);
        navigate(path);
    };

    return (
        <nav className="navbar">
            <div className="navdiv">
                <div id="logo">
                    <img src="/logo2.jpg" alt="Two Good Co logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
                </div>

                {/* Desktop navigation */}
                <div id="outternav">
                    <div id="innernav">
                        <ul>
                            <li><a href="#home" onClick={(e) => handleAnchorClick(e, '#home')}>Home</a></li>
                            <li><a href="#about" onClick={(e) => handleAnchorClick(e, '#about')}>About</a></li>
                            <li><a href="#product" onClick={(e) => handleAnchorClick(e, '#product')}>Product</a></li>
                            <li><a href="/signup" onClick={(e) => handleNavClick(e, '/signup')}>Sign Up</a></li>
                            <li>
                                <a href="/cart" onClick={(e) => handleNavClick(e, '/cart')} className="cart-link-desktop">
                                    Cart{cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Mobile cart + hamburger */}
                <div className="mobile-nav-controls">
                    <button
                        className="mobile-cart-btn"
                        onClick={() => navigate('/cart')}
                        aria-label="Cart"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                            <line x1="3" y1="6" x2="21" y2="6"/>
                            <path d="M16 10a4 4 0 01-8 0"/>
                        </svg>
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </button>
                    <button
                        className={`hamburger ${menuOpen ? 'open' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        <span className="hamburger-line"></span>
                        <span className="hamburger-line"></span>
                        <span className="hamburger-line"></span>
                    </button>
                </div>
            </div>

            {/* Mobile slide-in overlay menu */}
            <div className={`mobile-menu-overlay ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
                <div className={`mobile-menu ${menuOpen ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
                    <ul className="mobile-menu-links">
                        <li><a href="#home" onClick={(e) => handleAnchorClick(e, '#home')}>Home</a></li>
                        <li><a href="#about" onClick={(e) => handleAnchorClick(e, '#about')}>About</a></li>
                        <li><a href="#product" onClick={(e) => handleAnchorClick(e, '#product')}>Product</a></li>
                        <li><a href="/signup" onClick={(e) => handleNavClick(e, '/signup')}>Sign Up</a></li>
                        <li><a href="/cart" onClick={(e) => handleNavClick(e, '/cart')}>Cart{cartCount > 0 && ` (${cartCount})`}</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
