import React, { useState } from 'react';
import './HomePage.css';
import logo from '../assets/GenChat.png';
import messageicon from '../assets/message-icon.svg';
import posticon from '../assets/post-icon.png';
import settingsicon from '../assets/settings-icon.png';
import logouticon from '../assets/logout-icon.png';
import HomeBackground from './particles';
import { auth } from '../FirebaseConfig';
import { useNavigate } from 'react-router-dom';


function HomePage() {

    const navigate = useNavigate();

    const navChatRoom = () => {
        navigate('/chatroom');
    }
    const navPostRoom = () => {
        navigate('/postroom');
    }
    const navSettings = () => {
        navigate('/settings');
    }
    const handleSignOut = () => {
        auth.signOut(); // Sign out the user
        navigate('/'); // Redirect to LandingPage
    };

    const user = auth.currentUser;
    const photoURL = user?.photoURL || '';
    const displayName = user?.displayName || '';

    return (
        <div className="homepage-container">
            <HomeBackground id={undefined} className='home-background' />
            <header>
                <div className='user-info'>
                    <img src={photoURL} className='homeimg' alt="" />
                    <div className='user-name'>{displayName}</div>
                </div>
                <div className='branding-left'> 
                    <img src={logo} className='logo' alt="" />
                    <div className='genchat'>enChat</div>
                </div>
            </header>
            <nav className='navHome'>
                <div className='settings-icon-cont' onClick={navSettings}>
                    <img src={settingsicon} alt='' className='settings-icon' />
                    <p className='nav-text'>Settings</p>
                </div>
                <div className='post-icon-cont' onClick={navPostRoom}>
                    <img src={posticon} alt="" className='post-icon' />        
                    <p className='nav-text'>Post</p>     
                </div>
                <div className='chat-icon-cont' onClick={navChatRoom}>
                    <img src={messageicon} alt='' className='chat-icon' />
                    <p className='nav-text'>Chat</p>     
                </div>
                <div className='logout-icon-cont' onClick={handleSignOut}>
                    <img src={logouticon} alt='' className='logout-icon' />
                    <p className='nav-text'>Logout</p>     
                </div>
            </nav>

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