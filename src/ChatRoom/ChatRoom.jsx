import React, { useRef, useState, useEffect } from 'react';
import './ChatRoom.css';
import ChatMessage from '../ChatMessage/ChatMessage';
import SignOut from '../SignOut/SignOut';
import { auth, firestore, firebase } from '../FirebaseConfig/FirebaseConfig';
// Hooks
import { useCollectionData } from 'react-firebase-hooks/firestore';

function ChatRoom() {

    const dummy = useRef();
    
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt');
    const [messages] = useCollectionData(query, {idField: 'id'}); // Listen to data with a hook
  
    const [formValue, setFormValue] = useState('');
  
    const sendMessage = async(e) => {
      e.preventDefault(); // Prevent page from refreshing when clicking submit button
      const { uid, photoURL } = auth.currentUser;
  
      await messagesRef.add({ // Create new document in firestore
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })
  
      setFormValue(''); // Reset to empty string
      dummy.current.scrollIntoView({behavior:'smooth'}); // Auto scroll down when user submits a message
    }
    
    // Scroll to the bottom when new messages are added or the component is loaded
    useEffect(() => {
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]); // Trigger scroll every time `messages` changes

    return (
      <>
        <header>
          <SignOut />
        </header>
        <main>
        
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
  
          <div ref={dummy}></div>
        </main>

        {auth.currentUser && ( // Only show the form if the user is signed in
          <form onSubmit={sendMessage}> {/* Submit Message to Firestore */}
    
            <input 
              value={formValue} 
              onChange={(e) => setFormValue(e.target.value)} 
              placeholder="Type a message" 
            />
            <button type="submit">X</button>
          </form>
        )}
      </>
    )
}

export default ChatRoom;
