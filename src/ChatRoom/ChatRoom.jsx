import React, { useRef, useState } from 'react';
import ChatMessage from '../ChatMessage/ChatMessage';
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
    
    return (
      <>
        <main>
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
  
          <div ref={dummy}></div>
        </main>
  
        <form onSubmit={sendMessage}> {/* Submit Message to Firestore */}
  
          <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
  
          <button type="submit">Y</button>
  
        </form>
      </>
    )
}

export default ChatRoom;
