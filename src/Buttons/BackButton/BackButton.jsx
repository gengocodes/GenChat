import React from 'react'
import { useNavigate } from 'react-router-dom';

function BackButton() {

    const navigate = useNavigate();

    const navHomePage = () => {
        navigate('/HomePage');
    }
    
  return (
    <button onClick={navHomePage} className='back-button'>
        Home
    </button>
  )
}

export default BackButton
