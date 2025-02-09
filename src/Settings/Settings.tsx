import React, { useState, useEffect } from 'react';
import './Settings.css';
import TextInput from './Input/TextInput';

import logo from '../assets/GenChat.png';
import messageicon from '../assets/message-icon.svg';
import posticon from '../assets/post-icon.png';
import homeicon from '../assets/home-icon.png';
import logouticon from '../assets/logout-icon.png';
import greatericon from '../assets/greater-icon.png';

import { auth, firestore, storage } from '../FirebaseConfig'; // Ensure storage is imported
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
    const user = auth.currentUser;
    const displayName = user?.displayName || '';
    const photoURL = user?.photoURL || '';
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [newPhotoURL, setNewPhotoURL] = useState<string | null>(null); // for new photo URL
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
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

      setIsLoading(true); // Start loading animation
  
      const newName = `${firstName} ${lastName}`;
      try {
        if (user) {
          // Update the displayName in Firebase Authentication
          await user.updateProfile({
            displayName: newName, // Update the name in Firebase Authentication
          });
          console.log("Display name updated in Firebase Authentication.");
  
          // Save the updated name in Firestore
          await firestore.collection('users').doc(user.uid).update({
            displayName: newName,
          });
          console.log("Name updated in Firestore successfully.");
        }
        navigate('/updated');
      } catch (error) {
        console.error("Error updating name:", error);
      } finally {
        setIsLoading(false); // Stop loading animation
      }
    };
  
    const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || e.target.files.length === 0 || !user) return;
  
      const file = e.target.files[0];
      const storageRef = storage.ref();
      const photoRef = storageRef.child(`profilePhotos/${user.uid}`);
  
      try {
        const snapshot = await photoRef.put(file);
        const downloadURL = await snapshot.ref.getDownloadURL();
  
        // Update the photoURL in Firebase Authentication
        await user.updateProfile({
          photoURL: downloadURL, // Set new photo URL
        });
        console.log("Photo updated in Firebase Authentication.");
  
        // Save the new photo URL to Firestore
        await firestore.collection('users').doc(user.uid).update({
          photoURL: downloadURL,
        });
        console.log("Photo URL updated in Firestore.");
        setNewPhotoURL(downloadURL); // Update the photo URL in the state
      } catch (error) {
        console.error("Error updating photo URL:", error);
      }
    };
  
    const navChatRoom = () => navigate('/chatroom');
    const navPostRoom = () => navigate('/postroom');
    const navHome = () => navigate('/home');
    const handleSignOut = () => {
      auth.signOut(); // Sign out the user
      navigate('/'); // Redirect to LandingPage
    };

    // const [isUsernameVisible, setIsUsernameVisible] = useState(false);
    // const [isProfilePicVisible, setIsProfilePicVisible] = useState(false);

    // const toggleUsername = () => {
    //   setIsUsernameVisible(!isUsernameVisible);
    // };
    // const toggleProfilePic = () => {
    //   setIsProfilePicVisible(!isProfilePicVisible);
    // };

    const [visibleSection, setVisibleSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
      setVisibleSection((prevSection) => (prevSection === section ? null : section));
    };
    const goToCreator = () => {
      window.open("https://gengo-bit.netlify.app", "_blank");
    };    

    
    return (
      <div className='settings'>
        <nav className='navSettings'>
          <div className='settings-logo-cont' onClick={goToCreator}>
          <img src={logo} className='settings-logo' alt="" />
            <p className='settings-genchat'>Creator</p>
          </div>
          <div className='settings-user-cont'>
            <img src={photoURL} className='settings-homeimg' alt="" />
            <p className='settings-user-name'>{displayName}</p>
          </div>
          <div className='settings-home-icon-cont' onClick={navHome}>
            <img src={homeicon} alt='' className='settings-home-icon' />
            <p className='settings-nav-text'>Home</p>
          </div>
          <div className='settings-post-icon-cont' onClick={navPostRoom}>
            <img src={posticon} alt="" className='settings-post-icon' />
            <p className='settings-nav-text'>Post</p>
          </div>
          <div className='settings-chat-icon-cont' onClick={navChatRoom}>
            <img src={messageicon} alt='' className='settings-chat-icon' />
            <p className='settings-nav-text'>Chat</p>
          </div>
          <div className='settings-logout-icon-cont' onClick={handleSignOut}>
            <img src={logouticon} alt='' className='settings-logout-icon' />
            <p className='settings-nav-text'>Logout</p>
          </div>
        </nav>

        <div className='settingsarea'>
          <div className='settings-selection'>
            <div 
              className={`settings-cont ${visibleSection === 'username' ? 'active' : ''}`} 
              onClick={() => toggleSection('username')}
            > 
              <h1 className='your-account'> Username </h1>
              <img src={greatericon} alt="" className='greater-icon' />
            </div>
            <div 
              className={`settings-cont ${visibleSection === 'profilePicture' ? 'active' : ''}`} 
              onClick={() => toggleSection('profilePicture')}
            > 
              <h1 className='your-account'> Profile Picture </h1>
              <img src={greatericon} alt="" className='greater-icon' />
            </div>
            <div className='settings-cont'> 
              <h1 className='your-account'> Email </h1>
              <img src={greatericon} alt="" className='greater-icon' />
            </div>
            <div className='settings-cont'> 
              <h1 className='your-account'> Password </h1>
              <img src={greatericon} alt="" className='greater-icon' />
            </div>
            <div className='settings-cont'> 
              <h1 className='your-account'> Username </h1>
              <img src={greatericon} alt="" className='greater-icon' />
            </div>
            <div className='settings-cont'> 
              <h1 className='your-account'> Profile Picture </h1>
              <img src={greatericon} alt="" className='greater-icon' />
            </div>
            <div className='settings-cont'> 
              <h1 className='your-account'> Email </h1>
              <img src={greatericon} alt="" className='greater-icon' />
            </div>
            <div className='settings-cont'> 
              <h1 className='your-account'> Password </h1>
              <img src={greatericon} alt="" className='greater-icon' />
            </div>
          </div>
        </div>

              {visibleSection === 'username' && (
                <form className='settings-forms' onSubmit={handleSubmit}>
                  <div className='div-first-name'>
                  <h1>Update your Username</h1>
                    <label htmlFor="firstName">First Name:</label>
                    <TextInput
                        type='text'
                        id="firstName"
                        placeholder="Cardo"
                        className='input-firstname'
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label htmlFor="lastName">Last Name:</label>
                    <TextInput
                        type='text'
                        id="lastName"
                        placeholder="Dalisay"
                        className='input-lastname'
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <button type="submit" className='settings-submit' disabled={isLoading}>
                      {isLoading ? <div className="loading-spinner"></div> : "Submit"}
                    </button>
                  </div>
                </form>
            )}

              {visibleSection === 'profilePicture' && (
                <form className='settings-forms-profilepic' onSubmit={handleSubmit}>
                  <div className='prof-container'>
                  <h1>Update your Profile Picture</h1>
                  <img src={newPhotoURL || photoURL} className='update-homeimg' alt="" />
                    <input
                        type="file"
                        id="photo"
                        className='input-img'
                        accept="image/*"
                        onChange={handlePhotoChange}
                        required
                    />
                    <button type="submit" value="Submit" className='settings-submit' disabled={isLoading}>
                    {isLoading ? <div className="loading-spinner"></div> : "Submit"}
                    </button>
                  </div>
                </form>
            )}
  
        {/* {displayName ? 
        <div className='settings-greet'>Hello, {displayName}</div>
         : "No name!"} */}
      </div>
    );
  };
  
  export default Settings;