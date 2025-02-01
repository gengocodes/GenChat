import React from 'react'
import './NavBar.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../FirebaseConfig';

function NavBar() {

    const user = auth.currentUser;
    const photoURL = user?.photoURL || '';
    const displayName = user?.displayName || '';
    const navigate = useNavigate();

    const handleProfile = () => {
        navigate('/Profile');
    };

  return (
    
    <div>
    <nav id="navbar">
    <div className='navbar-container'>
    <img src={photoURL} alt="" />
        <p onClick={handleProfile}>
        {displayName}</p>
    </div>

    </nav>
    </div>
  )
}

export default NavBar;
