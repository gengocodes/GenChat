import './App.css';

// SDK
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Hooks
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp ({
  apiKey: "AIzaSyACdu9cMRFJg0NEi9jtN_HruTBq2sN8tKs",
  authDomain: "genchat-e3156.firebaseapp.com",
  projectId: "genchat-e3156",
  storageBucket: "genchat-e3156.firebasestorage.app",
  messagingSenderId: "973307484751",
  appId: "1:973307484751:web:e46caff6904e6407a8283a"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">

      <header>
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

export default App;

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  
  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.SignOut()}>Sign Out</button>
  )
}

function ChatRoom() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, {idField: 'id'}); // Listen to data with a hook

  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </div>
    </>
  )
}
function ChatMessage(props) {
  const { text, uid } = props.message;

  return (<p>{text}</p>)
} 