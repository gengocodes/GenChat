import React from 'react'
import './SignInGoogle.css'
import { auth, firebase, firestore } from '../../FirebaseConfig';

interface SignInProps {
  className?: string;
}

interface GoogleProps {
  className?: string;
}

const SignInGoogle: React.FC<SignInProps> = ({ className }) => {
    
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
      <Google className="svg" />
      </button>
    );
}
  

export default SignInGoogle;

const Google: React.FC<GoogleProps> = ({ className }) => {
  return (
    <div className="slide">
      <a href="mailto:paulcorsino28@gmail.com" className="social-icon slide" target="_blank" rel="noopener noreferrer">
          <svg
          xmlns="http://www.w3.org/2000/svg"
          className="google"
          fill="white"
          viewBox="0 0 24 24"
          >
          <path
            d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </div>
  )
}
