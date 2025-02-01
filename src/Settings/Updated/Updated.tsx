import React from 'react'
import { useNavigate } from 'react-router-dom'

function Updated() {
    
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/Settings');
    }

  return (
    <div>
        CONGRATS
      <button onClick={goBack}>Back</button>
    </div>
  )
}

export default Updated
