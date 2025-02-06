import React, { useRef, useState, useEffect } from 'react';
import './ChatRoom.css';
import ChatMessage from '../ChatMessage/ChatMessage';
import SignOut from '../../Auth/SignOut/SignOut';
import BackButton from '../../Buttons/BackButton/BackButton';
import { auth, firestore, firebase } from '../../FirebaseConfig';

// Firestore and Storage imports
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

// Define message type
interface Message {
  id: string;
  text?: string;
  imageUrl?: string;
  uid: string;
  photoURL: string;
  displayName?: string;
  createdAt?: firebase.firestore.Timestamp | null;
}

const ChatRoom: React.FC = () => {
  const dummy = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [formValue, setFormValue] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);

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

  // Function to send a message with optional image
  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    const { uid, photoURL, displayName } = user;
    let imageBase64 = '';

    // If an image is selected, convert it to Base64
    if (image) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = async () => {
            imageBase64 = reader.result as string;

            // Store the message in Firestore
            await addDoc(collection(firestore, 'messages'), {
                text: formValue || '', // Include text if provided
                imageUrl: imageBase64, // Store image as Base64
                createdAt: serverTimestamp(),
                uid,
                photoURL: photoURL || '',
                displayName: displayName || 'Unknown User',
            });

            setFormValue('');
            setImage(null);
        };
    } else {
        // Store only text message
        await addDoc(collection(firestore, 'messages'), {
            text: formValue || '',
            imageUrl: '',
            createdAt: serverTimestamp(),
            uid,
            photoURL: photoURL || '',
            displayName: displayName || 'Unknown User',
        });

        setFormValue('');
        setImage(null);
    }
};

  return (
    <>
      <header className="chatroom-header">
        <BackButton />
        <SignOut className='' />
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
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          />
          <button type="submit">Send</button>
        </form>
      )}
    </>
  );
};

export default ChatRoom;
