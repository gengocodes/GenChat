import React, { useState } from 'react'
import { auth, firebase } from '../../FirebaseConfig';
import "./ChatMessage.css";

// Define the expected shape of message props
interface MessageProps {
    text?: string; // Make text optional
    imageUrl?: string; // Allow images
    uid: string;
    photoURL: string;
    createdAt?: firebase.firestore.Timestamp | null;
}
  
interface ChatMessageProps {
    message: MessageProps;
}

const  ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {

    const [modalOpen, setModalOpen] = useState(false);
    // destructure message prop
    const { text, uid, photoURL, imageUrl, createdAt } = message;

    // Ensure auth.currentUser is not null before accessing uid
    const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received';

    // Retrieve the createdAt timestamp in Firestore
    const messageTime = createdAt ? createdAt.toDate() : new Date();
    // Format the time (for display in the hover tooltip)
    const formattedTime = messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    // Format the full date to display in the message
    const formattedDate = messageTime.toLocaleDateString(); // Defaults to MM/DD/YYYY in most locales
    
    return (
    <div className={`message ${messageClass}`}>
        <img src={photoURL} alt="User Avatar" />
        {text && <p>{text}</p>}
            {imageUrl && (
                <>
                    <img
                        src={imageUrl}
                        alt="Uploaded"
                        className="chat-image"
                        onClick={() => setModalOpen(true)} // Open modal on click
                    />
                    {modalOpen && (
                        <div className="modal" onClick={() => setModalOpen(false)}>
                            <img src={imageUrl} alt="" className="modal-content" />
                        </div>
                    )}
                </>
            )}
        <div className="timedate">
            <span className="time">{formattedTime}</span>
            <span className="date">Sent at {formattedDate}.</span>
        </div>
    </div>
    )
}

export default ChatMessage;
