import React, { useEffect, useState } from 'react';
import './App.css';
import LandingPage from './LandingPage/LandingPage';
import HomePage from './HomePage/HomePage';
import PostRoom from './Post/PostRoom/PostRoom';
import Profile from './Profile/Profile';
import Settings from './Settings/Settings';
import Updated from './Settings/Updated/Updated';
// import Particles from './LandingPage/particles';
import ChatRoom from './Chat/ChatRoom/ChatRoom';
import SignIn from './Auth/SignIn/SignInGoogle';

// Libraries
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './FirebaseConfig';  // Import Firebase configuration

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is signed in
  useEffect(() => {
    // Update authentication status based on Firebase auth
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user);  // true if user exists, false if not
    });
    
    return () => unsubscribe();  // Cleanup on component unmount
  }, []);

  return (
    <div className="App">
      <Router basename="/">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chatroom" element={isAuthenticated ? <ChatRoom /> : <Navigate to="/" />} />
          <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/" />} />
          <Route path="/postroom" element={isAuthenticated ? <PostRoom /> : <Navigate to="/" />} />
          <Route path="/signin" element={isAuthenticated ? <SignIn /> : <Navigate to="/" />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/" />} />
          <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/" />} />
          <Route path="/updated" element={isAuthenticated ? <Updated /> : <Navigate to="/" />} />
        </Routes>
      </Router>
      {/* <Particles id={undefined} /> */}
    </div>
  );
}

export default App;
