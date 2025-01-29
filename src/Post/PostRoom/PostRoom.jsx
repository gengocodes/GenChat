import React from 'react'
import './PostRoom.css';
import BackButton from '../../Buttons/BackButton/BackButton'
import SignOut from '../../Auth/SignOut/SignOut';
import NavBar from '../../NavBar/NavBar';

function PostRoom() {
  return (
    <>
    <header className='post-header'>
        <BackButton />
        <SignOut />
    </header>
    <NavBar />
    <p>
      POST
    </p>
    </>
  )
}

export default PostRoom
