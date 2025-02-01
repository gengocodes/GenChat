import React, { useRef, useState, useEffect } from 'react';
import './ChatRoom.css';
import ChatMessage from '../ChatMessage/ChatMessage';
import SignOut from '../../Auth/SignOut/SignOut';
import BackButton from '../../Buttons/BackButton/BackButton';
import { auth, firestore, firebase } from '../../FirebaseConfig';

// Firestore imports
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

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

  // Fetch messages using `getDocs()`
  const fetchMessages = async () => {
    try {
      const messagesRef = collection(firestore, 'messages');
      const messagesQuery = query(messagesRef, orderBy('createdAt'));
      const querySnapshot = await getDocs(messagesQuery);

      const messagesList: Message[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as Message; // Get Firestore data
        return { ...data, id: doc.id }; // Ensure `id` is correctly set once
      });

      setMessages(messagesList);

      // Auto-scroll to the bottom when new messages are fetched
      if (dummy.current) {
        dummy.current.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Load messages on component mount
  useEffect(() => {
    fetchMessages();
  }, []);

  // Function to send a message
  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    const { uid, photoURL, displayName } = user;

    await firestore.collection('messages').add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL: photoURL || '',
      displayName: displayName || 'Unknown User',
    });

    setFormValue('');
    fetchMessages(); // Refresh messages after sending
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
