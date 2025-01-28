import React from 'react';
import './App.css';
import ChatRoom from './Chat/ChatRoom/ChatRoom';
import SignIn from './Auth/SignIn/SignIn';
import LandingPage from './LandingPage/LandingPage';
import HomePage from './HomePage/HomePage';
import PostRoom from './Post/PostRoom/PostRoom';

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
        </Routes>
      </Router>

    </div>
  );
}

export default App;




