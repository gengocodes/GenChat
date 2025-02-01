import React from 'react'
import './SignInGoogle.css'
import { auth, firebase, firestore } from '../../FirebaseConfig';

interface SignInProps {
  className?: string;
}

const SignInFacebook: React.FC<SignInProps> = ({ className }) => {
    
    const signInWithGoogle = async () => {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await auth.signInWithPopup(provider);

        // Get user info from result
        const user = result.user;
        if (user) {
          const {
            uid,
            displayName,
            photoURL,
            email,
            emailVerified,
            phoneNumber,
            providerId,
            isAnonymous,
            metadata,
            refreshToken,
          } = user;

        // Create a user object with all available data
        const userData = {
          uid,
          displayName: displayName || '',
          photoURL: photoURL || '',
          email: email || '',
          emailVerified: emailVerified || false,
          phoneNumber: phoneNumber || '',
          providerId: providerId || '',
          isAnonymous: isAnonymous || false,
          creationTime: metadata.creationTime || '',
          lastSignInTime: metadata.lastSignInTime || '',
          refreshToken: refreshToken || '',
        };

        // Check if the user already exists in Firestore
        const userRef = firestore.collection('users').doc(uid);
        const doc = await userRef.get();

        if (!doc.exists) {
          // If user doesn't exist in Firestore, create a new document for the user
          await userRef.set(userData);
          console.log("User document created in Firestore.");
        } else {
          console.log("User document already exists.");
        }

        console.log("User signed in successfully");
      } else {
        console.error("Error: No user returned from sign-in.");
      }
    }
    catch (error:any) {
        console.error("Error during sign-in:", error.message);
    }
};
  
  
    return (
      <button onClick={signInWithGoogle} className={className}>
      <Facebook />
      </button>
    );
}
  

export default SignInFacebook;

interface FacebookProps {
    className?: string;
  }
  
  
  const Facebook: React.FC<FacebookProps> = ({ className }) => {
    return (
      <div className="slide">
      <a href="https://www.facebook.com/polcowsino/" className="social-icon slide" target="_blank" rel="noopener noreferrer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="facebook"
          fill="white"
          viewBox="0 0 24 24"
        >
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      </a>
    </div>
    )
  }