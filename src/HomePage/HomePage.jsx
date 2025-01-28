import React from 'react';
import './HomePage.css';

import { useNavigate } from 'react-router-dom';
function HomePage() {

    const navigate = useNavigate();

    const navChatRoom = () => {
        navigate('/ChatRoom');
    }

    return (
        <div className="homepage-container">
            <div className="homepage-content">
                <h1 className="homepage-title">Welcome Back!</h1>
                <p className="homepage-subtitle">Ready to start chatting?</p>
                <button onClick={navChatRoom} className="homepage-button">
                Go to Chat Room
                </button>
            </div>
      </div>
    )
}

export default HomePage
