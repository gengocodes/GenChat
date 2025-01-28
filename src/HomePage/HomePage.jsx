import React from 'react';
import './HomePage.css';

import { useNavigate } from 'react-router-dom';

function HomePage() {

    const navigate = useNavigate();

    const navChatRoom = () => {
        navigate('/ChatRoom');
    }
    const navPostRoom = () => {
        navigate('/PostRoom');
    }

    return (
        <div className="homepage-container">
            <div className="homepage-content">
                <h1 className="homepage-title">Welcome Back!</h1>
                <p className="homepage-subtitle">What do you want to do?</p>
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
