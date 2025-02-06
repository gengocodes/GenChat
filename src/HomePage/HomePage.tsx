import React, { useState } from 'react';
import './HomePage.css';
import logo from '../assets/GenChat.png';
import HomeBackground from './particles';
import { auth } from '../FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import SignOut from '../Auth/SignOut/SignOut';

function HomePage() {

    const navigate = useNavigate();

    const navChatRoom = () => {
        navigate('/chatroom');
    }
    const navPostRoom = () => {
        navigate('/postroom');
    }

    const user = auth.currentUser;
    const photoURL = user?.photoURL || '';
    const displayName = user?.displayName || '';
    
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown); // Toggle the dropdown visibility
    };

    return (
        <div className="homepage-container">
            <HomeBackground id={undefined} className='home-background' />
            <header>
                <div className='user-info' onClick={toggleDropdown}>
                    <img src={photoURL} className='homeimg' alt="" />
                    <div className='user-name'>{displayName}</div>
                </div>
                <div className='branding-left'> 
                    <img src={logo} className='logo' alt="" />
                    <div className='genchat'>enChat</div>
                </div>
                {showDropdown && (
                <div className="dropdown">
                    <div className="dropdown-item" onClick={navPostRoom}>Go to Profile</div>
                    <div className="dropdown-item" onClick={navChatRoom}>Log out</div>
                    <SignOut className="signout-button" />
                </div>
            )}
            </header>
            <div className="homepage-content">
                <button onClick={navChatRoom} className="chat-button">
                Chat
                </button>
                <button onClick={navPostRoom} className="post-button">
                Post
                </button>
            </div>
            
      </div>
    )
}

export default HomePage