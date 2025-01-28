import React from 'react';
import './SignOut.css';
import { auth } from '../../FirebaseConfig';
import { useNavigate } from 'react-router-dom';

function SignOut(props) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    auth.signOut(); // Sign out the user
    navigate('/'); // Redirect to LandingPage
  };

  //use css in sigout.css if no props
  const buttonClass = `sign-out ${props.className || ''}`;

  return (
    auth.currentUser && (
      <button className={buttonClass} onClick={handleSignOut}>
        Sign Out
      </button>
    )
  );
}

export default SignOut;
