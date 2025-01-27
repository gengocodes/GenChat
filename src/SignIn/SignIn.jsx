import React from 'react'
import { auth, firebase } from '../FirebaseConfig/FirebaseConfig';

function SignIn() {
const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
    }
    
    return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
    )
}

export default SignIn
