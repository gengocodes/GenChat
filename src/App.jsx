import React from 'react';
import './App.css';
import ChatRoom from './Chat/ChatRoom/ChatRoom';
import SignIn from './Auth/SignIn/SignIn';
import LandingPage from './LandingPage/LandingPage';
import HomePage from './HomePage/HomePage';
import PostRoom from './Post/PostRoom/PostRoom';
import Profile from './Profile/Profile';
import Settings from './Settings/Settings';
import Updated from './Settings/Updated/Updated';

// Libraries
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/ChatRoom" element={<ChatRoom />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/PostRoom" element={<PostRoom />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/Updated" element={<Updated />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;




