import React, { useRef, useEffect, useState } from 'react'
import './PostRoom.css';
import BackButton from '../../Buttons/BackButton/BackButton'
import SignOut from '../../Auth/SignOut/SignOut';
import NavBar from '../../NavBar/NavBar';
import Post from '../Posts/Post';
import { auth, firestore, firebase } from '../../FirebaseConfig';

// Firestore imports
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

// Define post type
interface post {
  id: string;
  text: string;
  uid: string;
  photoURL: string;
  displayName?: string;
  createdAt?: firebase.firestore.Timestamp | null;
}

const PostRoom: React.FC = () => {
  
    const dummy = useRef<HTMLDivElement | null>(null);
    const [posts, setPosts] = useState<post[]>([]);
    const [formValue, setFormValue] = useState<string>('');
  
    // Fetch posts in real-time
    useEffect(() => {
      const postsRef = collection(firestore, 'posts');
      const postsQuery = query(postsRef, orderBy('createdAt'));
  
      const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
        const postsList: post[] = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as post[];
  
        setPosts(postsList);
      });
  
      return () => unsubscribe();
    }, []);
  
    // Function to send a post
    const sendPost = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const user = auth.currentUser;
      if (!user) return;
  
      const { uid, photoURL, displayName } = user;
  
      await addDoc(collection(firestore, 'posts'), {
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
    <header className='post-header'>
        <BackButton />
        <SignOut className='' />
    </header>
    <NavBar />
    <main>
        {posts.map((pst) => (
          <Post key={pst.id} post={pst} />
        ))}
        <div ref={dummy}></div>
      </main>

      {auth.currentUser && (
        <form onSubmit={sendPost}>
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Type a post"
          />
          <button type="submit">X</button>
        </form>
      )}
    </>
  )
}

export default PostRoom
