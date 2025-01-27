import React from 'react'

function SignOut() {
    return auth.currentUser && (
        <button onClick={() => auth.SignOut()}>Sign Out</button>
    )
}

export default SignOut;

  