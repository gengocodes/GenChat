import React from 'react'
import { auth, firebase } from '../../FirebaseConfig';
import "./ChatMessage.css";

// Define the expected shape of message props
interface MessageProps {
    text: string;
    uid: string;
    photoURL: string;
    createdAt?: firebase.firestore.Timestamp | null; // Firestore timestamps can be null or undefined
}
  
interface ChatMessageProps {
    message: MessageProps;
}

const  ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {

    // destructure message prop
    const { text, uid, photoURL, createdAt } = message;
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
            <img src={photoURL} alt="" />
            <p>{text}</p>
            <div className="timedate">
                <span className="time">{formattedTime}</span>
                <span className="date">Sent at {formattedDate}.</span>
            </div>
        </div>
    )
}

export default ChatMessage;
