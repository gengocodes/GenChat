import React from 'react';
import './Profile.css';
import BackButton from '../Buttons/BackButton/BackButton';
import SignOut from '../Auth/SignOut/SignOut';

import { useNavigate } from 'react-router-dom';
import { auth } from '../FirebaseConfig';

function Profile() {

  const user = auth.currentUser;
  const displayName = user?.displayName || '';
  const photoURL = user?.photoURL || '';
  const navigate = useNavigate();
  
  const navigateSettings = () => {
    navigate('/Settings');
  }

  return (
    <div className="profile-container">
        <header className='profile-header'>
          <BackButton />
          <SignOut className=''/>
        </header>
        <img src={photoURL} alt="" />
        {displayName}
        <div className="Settingscont" 
        onClick={navigateSettings}>Settings</div>
    </div>
  )
}

export default Profile;
