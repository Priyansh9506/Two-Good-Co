import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    const handleAnchorClick = (e, hash) => {
        if (!isHomePage) {
            e.preventDefault();
            navigate('/');
            // After navigation, scroll to element
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    };

    return (
        <nav className="navbar">
            <div className="navdiv">
                <div id="logo">
                    <img src="/logo2.jpg" alt="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
                </div>
                <div id="outternav">
                    <div id="innernav">
                        <ul>
                            <li><a href="#home" onClick={(e) => handleAnchorClick(e, '#home')}>Home</a></li>
                            <li><a href="#about" onClick={(e) => handleAnchorClick(e, '#about')}>About</a></li>
                            <li><a href="#product" onClick={(e) => handleAnchorClick(e, '#product')}>Product</a></li>
                            <li><a href="/signup" onClick={(e) => { e.preventDefault(); navigate('/signup'); }}>Sign Up</a></li>
                            <li><a href="/cart" onClick={(e) => { e.preventDefault(); navigate('/cart'); }}>Cart</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
