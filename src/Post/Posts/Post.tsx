import React from 'react'
import { auth, firebase } from '../../FirebaseConfig';

// Define the expected shape of post props
interface postedProps {
    text: string;
    uid: string;
    photoURL: string;
    createdAt?: firebase.firestore.Timestamp | null; // Firestore timestamps can be null or undefined
}
  
interface postProps {
    post: postedProps;
}

const Post: React.FC<postProps> = ({ post }) => {
        // destructure post prop
        const { text, uid, photoURL, createdAt } = post;
        // Ensure auth.currentUser is not null before accessing uid
        const postClass = uid === auth.currentUser?.uid ? 'sent' : 'received';
    
        // Retrieve the createdAt timestamp in Firestore
        const postTime = createdAt ? createdAt.toDate() : new Date();
        // Format the time (for display in the hover tooltip)
        const formattedTime = postTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        // Format the full date to display in the post
        const formattedDate = postTime.toLocaleDateString(); // Defaults to MM/DD/YYYY in most locales
        
  return (
    <div className={`post ${postClass}`}>
        <img src={photoURL} alt="" />
        <p>{text}</p>
        <div className="timedate">
            <span className="time">{formattedTime}</span>
            <span className="date">Sent at {formattedDate}.</span>
        </div>
    </div>
  )
}

export default Post





