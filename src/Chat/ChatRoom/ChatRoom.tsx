import React, { useRef, useState, useEffect } from 'react';
import './ChatRoom.css';
import ChatMessage from '../ChatMessage/ChatMessage';
import SignOut from '../../Auth/SignOut/SignOut';
import BackButton from '../../Buttons/BackButton/BackButton';
import { auth, firestore, storage } from '../../FirebaseConfig';

// Firestore imports
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Define message type
interface Message {
  id: string;
  text: string;
  uid: string;
  photoURL: string;
  displayName?: string;
  createdAt?: any;
  imageUrl?: string;
}

const ChatRoom: React.FC = () => {
  const dummy = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [formValue, setFormValue] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);

  // Create a ref for the file input field to reset it after sending a message
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
    });

    return () => unsubscribe();
  }, []);

  // Function to handle image upload and message sending
  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload
    const user = auth.currentUser;
    if (!user) return;

    const { uid, photoURL, displayName } = user;
    let imageUrl = '';

    // Upload image if selected
    if (image) {
      const imageRef = ref(storage, `chat_images/${image.name}-${Date.now()}`);
      const snapshot = await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    // Store message in Firestore
    await addDoc(collection(firestore, 'messages'), {
      text: formValue || null,
      imageUrl: imageUrl || null,
      createdAt: serverTimestamp(),
      uid,
      photoURL: photoURL || '',
      displayName: displayName || 'Unknown User',
    });

    // Reset text input and image selection
    setFormValue('');
    setImage(null);

    // Reset the file input field to clear the selected file name
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
    // Ensure scrolling happens only after everything loads (including images)
    useEffect(() => {
      if (messages.length === 0) return;

      const imagePromises = messages
        .filter((msg) => msg.imageUrl)
        .map((msg) => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.src = msg.imageUrl!;
            img.onload = () => resolve();
            img.onerror = () => resolve(); // Resolve even if the image fails
          });
        });

      Promise.all(imagePromises).then(() => {
        setTimeout(() => {
          dummy.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      });
    }, [messages]);
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
          {/* File input field with ref to reset after sending */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef} // Attach ref to input field
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          />
          <button type="submit">Send</button>
        </form>
      )}
    </>
  );
};

export default ChatRoom;
