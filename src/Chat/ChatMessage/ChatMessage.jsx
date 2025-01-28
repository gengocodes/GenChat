import React from 'react'
import { auth } from '../../FirebaseConfig';
import "./ChatMessage.css";

function ChatMessage(props) {

    // destructure message prop
    const { text, uid, photoURL, createdAt } = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

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
