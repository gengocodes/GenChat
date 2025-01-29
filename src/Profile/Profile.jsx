import React from 'react';
import './Profile.css';
import BackButton from '../Buttons/BackButton/BackButton';
import SignOut from '../Auth/SignOut/SignOut';

import { auth } from '../FirebaseConfig';

function Profile() {

  const { photoURL, displayName } = auth.currentUser;

  return (
    <div className="profile-container">
        <header className='profile-header'>
          <BackButton />
          <SignOut />
        </header>
        <img src={photoURL} alt="" />
        {displayName}
    </div>
  )
}

export default Profile
