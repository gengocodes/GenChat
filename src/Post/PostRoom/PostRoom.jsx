import React from 'react'
import './PostRoom.css';
import BackButton from '../../Buttons/BackButton/BackButton'
import SignOut from '../../Auth/SignOut/SignOut';

function PostRoom() {
  return (
    <>
    <header className='post-header'>
        <BackButton />
        <SignOut />
    </header>
    <p>
      POST
    </p>
    </>
  )
}

export default PostRoom
