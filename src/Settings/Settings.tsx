import React, { useState, useEffect, FormEvent } from 'react'
import './Settings.css';
import BackButton from '../Buttons/BackButton/BackButton';
import SignOut from '../Auth/SignOut/SignOut';
import TextInput from './Input/TextInput';

import { auth, firestore } from '../FirebaseConfig';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {

    const user = auth.currentUser;
    const displayName = user?.displayName || '';
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();

    // Initialize firstName and lastName if a displayName exists
    useEffect(() => {
        if (displayName) {
            const [first, last] = displayName.split(" ");
            setFirstName(first);
            setLastName(last);
        }
    }, [displayName]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent page reload on submit

        if (!user) return;

        const newName = `${firstName} ${lastName}`;
        // Update the displayName in Firebase Authentication
        try {
            await user.updateProfile({
                displayName: newName, // Update the name in Firebase Authentication
            });
            console.log("Display name updated in Firebase Authentication.");

            await firestore.collection('users').doc(user.uid).update({
                displayName: newName,  // Save the updated name in Firestore
            });
            navigate('/Updated');
            console.log("Name updated in Firestore successfully.");
        } catch (error) {
            console.error("Error updating name:", error);
        }
    }

  return (
    <div className='settings'>
        <header className="settings-header">
            <BackButton />
            <SignOut className='' />
        </header>
        <form className='settings-forms' onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name:</label>
            <TextInput                     
                id="firstName"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)} 
            />
            <label htmlFor="lastName">Last Name:</label>
            <TextInput                     
                id="lastName"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)} 
            />
            <input type="submit" value="Submit" className='settings-submit' />
        </form>
        {
            !displayName? "No name!": 
            <div>Hello, {displayName}</div>
        }

    </div>
  )
}

export default Settings;

