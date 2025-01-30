import React, { useEffect, useState } from 'react';
import './HomePage.css';

import { auth } from '../FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import SignOut from '../Auth/SignOut/SignOut';

function HomePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    const navChatRoom = () => {
        navigate('/ChatRoom');
    };

    const navPostRoom = () => {
        navigate('/PostRoom');
    };

    if (!user) {
        return <div className="homepage-container">Loading...</div>; // Show loading instead of crashing
    }

    return (
        <div className="homepage-container">
            <div className="homepage-content">
                <h1 className="homepage-title">Welcome Back, {user.displayName}!</h1>
                <img src={user.photoURL} alt="" />
                <p className="homepage-subtitle">What do you want to do?</p>
                <button onClick={navChatRoom} className="chat-button">Chat</button>
                <button onClick={navPostRoom} className="post-button">Post</button>
                <SignOut className="signout-button" />
            </div>
        </div>
    );
}

export default HomePage;
