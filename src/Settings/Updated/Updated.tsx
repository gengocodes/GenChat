import React from 'react'
import { useNavigate } from 'react-router-dom'

function Updated() {
    
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/settings');
    }

  return (
    <div>
        CONGRATS
      <button onClick={goBack}>Back</button>
    </div>
  )
}

export default Updated
