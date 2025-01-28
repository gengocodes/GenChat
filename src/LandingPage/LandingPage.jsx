import React, { useEffect } from 'react';
import './LandingPage.css'
import SignIn from '../Auth/SignIn/SignIn'

import { auth } from '../FirebaseConfig';
// Hooks
import { useAuthState} from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

function LandingPage() {

    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
          // If the user is logged in, navigate to HomePage
          navigate('/HomePage');
        }
      }, [user, navigate]);

  return (
    <div className="lading-container">
        <div className="landing-content">
            <h1 className="landing-title"> Welcome!</h1>
            <p className='landing-subtitle'>Sign in to get started</p>
            <SignIn />
        </div>
    </div>
  )
}

export default LandingPage
