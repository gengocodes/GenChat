import React from 'react';
import './SignOut.css';
import { auth } from '../FirebaseConfig/FirebaseConfig';
import { useNavigate } from 'react-router-dom';

function SignOut() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    auth.signOut(); // Sign out the user
    navigate('/'); // Redirect to LandingPage
  };

  return (
    auth.currentUser && (
      <button className="sign-out" onClick={handleSignOut}>
        Sign Out
      </button>
    )
  );
}

export default SignOut;
