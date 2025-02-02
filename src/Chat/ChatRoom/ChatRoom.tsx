import React, { useRef, useState, useEffect } from 'react';
import './ChatRoom.css';
import ChatMessage from '../ChatMessage/ChatMessage';
import SignOut from '../../Auth/SignOut/SignOut';
import BackButton from '../../Buttons/BackButton/BackButton';
import { auth, firestore, firebase } from '../../FirebaseConfig';

// Firestore imports
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

// Define message type
interface Message {
  id: string;
  text: string;
  uid: string;
  photoURL: string;
  displayName?: string;
  createdAt?: firebase.firestore.Timestamp | null;
}

const ChatRoom: React.FC = () => {
  const dummy = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [formValue, setFormValue] = useState<string>('');

  // Fetch messages in real-time
  useEffect(() => {
    const messagesRef = collection(firestore, 'messages');
    const messagesQuery = query(messagesRef, orderBy('createdAt'));

    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const messagesList: Message[] = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Message[];

      setMessages(messagesList);

      // Scroll to bottom after messages update
      setTimeout(() => {
        dummy.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    });

    return () => unsubscribe();
  }, []);

  // Auto-scroll when messages update
  useEffect(() => {
    setTimeout(() => {
      dummy.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [messages]);

  // Function to send a message
  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    const { uid, photoURL, displayName } = user;

    await addDoc(collection(firestore, 'messages'), {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL: photoURL || '',
      displayName: displayName || 'Unknown User',
    });

    setFormValue('');
  };

  return (
    <>
      <header className="chatroom-header">
        <BackButton />
        <SignOut className=''/>
      </header>
      <main>
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <div ref={dummy}></div>
      </main>

      {auth.currentUser && (
        <form onSubmit={sendMessage}>
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Type a message"
          />
          <button type="submit">X</button>
        </form>
      )}
    </>
  );
};

export default ChatRoom;
