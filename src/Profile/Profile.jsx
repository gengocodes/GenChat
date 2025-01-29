import React from 'react';
import './Profile.css';
import BackButton from '../Buttons/BackButton/BackButton';
import SignOut from '../Auth/SignOut/SignOut';

function Profile() {
  return (
    <div className="profile-container">
        <header className='profile-header'>
          <BackButton />
          <SignOut />
        </header>
            profile
    </div>
  )
}

export default Profile
