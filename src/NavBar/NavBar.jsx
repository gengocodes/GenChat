import React from 'react'
import './NavBar.css';
import { useNavigate } from 'react-router-dom';

function NavBar() {

    const navigate = useNavigate();

    const handleProfile = () => {
        navigate('/Profile');
    };

  return (
    <div>
    <nav id="navbar">
        <p onClick={handleProfile} class="nav-link">Profile</p>
    </nav>
    </div>
  )
}

export default NavBar;
