import React from 'react';
import './HomePage.css';

import { auth } from '../FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import SignOut from '../Auth/SignOut/SignOut';

function HomePage() {

    const navigate = useNavigate();

    const navChatRoom = () => {
        navigate('/ChatRoom');
    }
    const navPostRoom = () => {
        navigate('/PostRoom');
    }

    const { photoURL } = auth.currentUser;
    
    return (
        <div className="homepage-container">
            <div className="homepage-content">
                <h1 className="homepage-title">Welcome Back!</h1>
                <img src={photoURL} alt="" />
                <p className="homepage-subtitle">What do you want to do?</p>
                <button onClick={navChatRoom} className="chat-button">
                Chat
                </button>
                <button onClick={navPostRoom} className="post-button">
                Post
                </button>
                <SignOut className="signout-button" />
            </div>
      </div>
    )
}

export default HomePage
