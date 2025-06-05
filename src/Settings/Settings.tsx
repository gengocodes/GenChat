import React, { useState, useEffect } from "react";
import "./Settings.css";
import TextInput from "./Input/TextInput";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeBackground from "../HomePage/particles";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import logo from "../assets/GenChat.png";
import messageicon from "../assets/message-icon.svg";
import posticon from "../assets/post-icon.png";
import homeicon from "../assets/home-icon.png";
import logouticon from "../assets/logout-icon.png";
import greatericon from "../assets/greater-icon.png";

import { auth, firestore, storage } from "../FirebaseConfig"; // Ensure storage is imported
import { useNavigate } from "react-router-dom";

const Settings: React.FC = () => {
  const user = auth.currentUser;
  const displayName = user?.displayName || "";
  const photoURL = user?.photoURL || "";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [newPhotoURL, setNewPhotoURL] = useState<string | null>(null); // for new photo URL
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("No file chosen");

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
        await firestore.collection("users").doc(user.uid).update({
          displayName: newName,
        });
        console.log("Name updated in Firestore successfully.");
      }
      navigate("/settings");
    } catch (error) {
      console.error("Error updating name:", error);
    } finally {
      setIsLoading(false); // Stop loading animation
    }
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !user) return;

    const file = e.target.files[0];
    setFileName(file.name);
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
      await firestore.collection("users").doc(user.uid).update({
        photoURL: downloadURL,
      });
      console.log("Photo URL updated in Firestore.");
      setNewPhotoURL(downloadURL); // Update the photo URL in the state
    } catch (error) {
      console.error("Error updating photo URL:", error);
    }
  };

  const navChatRoom = () => navigate("/chatroom");
  const handleSignOut = () => {
    auth.signOut(); // Sign out the user
    navigate("/"); // Redirect to LandingPage
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
    setVisibleSection((prevSection) =>
      prevSection === section ? null : section
    );
  };
  const [activeSection2] = useState("settings");

  return (
    <div className="main-settings">
      <HomeBackground id={undefined} className="home-background" />
      <div className="settings-cont1">
        <div className="home1">
          <div className="home-selection">
            <div className="home-div1">
              {" "}
              <div className="logo-cont">
                <img src={logo} className="home-logo" alt="" />
              </div>
            </div>
            <div className="home-div2">
              <div className="home-cont">
                <div
                  className={`homeic-cont ${
                    activeSection2 === "home" ? "active" : ""
                  }`}
                  onClick={() => navigate("/home")}
                >
                  <HomeFilledIcon className="homeic-icon" />
                </div>
                <div
                  className={`home-settings-cont ${
                    activeSection2 === "settings" ? "active" : ""
                  }`}
                  onClick={() => navigate("/settings")}
                >
                  {" "}
                  <SettingsIcon className="settings-icon" />
                </div>
                <div
                  className="chat-cont"
                  onClick={() => navigate("/chatroom")}
                >
                  {" "}
                  <ChatIcon className="chat-icon" />
                </div>
                <div className="logout-cont" onClick={handleSignOut}>
                  <LogoutIcon className="logout-icon" />
                </div>
              </div>
            </div>
            <div className="home-div3">
              {" "}
              <div className="notif-cont">
                <NotificationsNoneIcon className="notif-icon" />
              </div>
              <div className="img-cont">
                <img src={photoURL} className="home-homeimg" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="homepage-content">
          <div className="cont1">
            <div className="items">
              <div className="settings-title">
                <p className="set-title">Settings & Privacy</p>
              </div>
              <div
                className={`settings-cont ${
                  visibleSection === "username" ? "active" : ""
                }`}
                onClick={() => toggleSection("username")}
              >
                <div className="settings-cont-1">
                  <p className="option-settings">Change Username </p>
                </div>

                <div className="settings-cont-2">
                  <img src={greatericon} alt="" className="greater-icon" />
                </div>
              </div>
              <div
                className={`settings-cont ${
                  visibleSection === "profilePicture" ? "active" : ""
                }`}
                onClick={() => toggleSection("profilePicture")}
              >
                <div className="settings-cont-1">
                  <p className="option-settings">Change Profile Picture </p>
                </div>
                <div className="settings-cont-2">
                  <img src={greatericon} alt="" className="greater-icon" />
                </div>
              </div>
              <div
                className={`settings-cont ${
                  visibleSection === "comingSoon" ? "active" : ""
                }`}
                onClick={() => toggleSection("comingSoon")}
              >
                <div className="settings-cont-1">
                  <p className="option-settings">Linked Accounts</p>
                </div>
                <div className="settings-cont-2">
                  <img src={greatericon} alt="" className="greater-icon" />
                </div>
              </div>
              <div
                className={`settings-cont ${
                  visibleSection === "comingSoon2" ? "active" : ""
                }`}
                onClick={() => toggleSection("comingSoon2")}
              >
                <div className="settings-cont-1">
                  <p className="option-settings">Change Password </p>
                </div>
                <div className="settings-cont-2">
                  <img src={greatericon} alt="" className="greater-icon" />
                </div>
              </div>
              <div
                className={`settings-cont ${
                  visibleSection === "comingSoon3" ? "active" : ""
                }`}
                onClick={() => toggleSection("comingSoon3")}
              >
                <div className="settings-cont-1">
                  <h1 className="option-settings">
                    Two-Factor Authentication{" "}
                  </h1>
                </div>
                <div className="settings-cont-2">
                  <img src={greatericon} alt="" className="greater-icon" />
                </div>
              </div>
              <div
                className={`settings-cont ${
                  visibleSection === "comingSoon4" ? "active" : ""
                }`}
                onClick={() => toggleSection("comingSoon4")}
              >
                <div className="settings-cont-1">
                  <h1 className="option-settings">Language Preferences </h1>
                </div>
                <div className="settings-cont-2">
                  <img src={greatericon} alt="" className="greater-icon" />
                </div>
              </div>
              <div
                className={`settings-cont ${
                  visibleSection === "comingSoon5" ? "active" : ""
                }`}
                onClick={() => toggleSection("comingSoon5")}
              >
                <div className="settings-cont-1">
                  <h1 className="option-settings">Privacy Settings </h1>
                </div>
                <div className="settings-cont-2">
                  <img src={greatericon} alt="" className="greater-icon" />
                </div>
              </div>
              <div
                className={`settings-cont ${
                  visibleSection === "comingSoon6" ? "active" : ""
                }`}
                onClick={() => toggleSection("comingSoon6")}
              >
                <div className="settings-cont-1">
                  <h1 className="option-settings"> App Theme </h1>
                </div>
                <div className="settings-cont-2">
                  <img src={greatericon} alt="" className="greater-icon" />
                </div>
              </div>
            </div>
          </div>
          <div className="settings-main-cont2">
            <div className="holder">
              {visibleSection === "username" && (
                <div className="set-cont2-cont">
                  <form className="settings-forms-1" onSubmit={handleSubmit}>
                    <p className="set-cont2-title">Update your Username</p>
                    <div className="rowgap">
                      <div className="row">
                        {" "}
                        <label htmlFor="firstName" className="form1-label">
                          First Name:
                        </label>{" "}
                        <TextInput
                          type="text"
                          id="firstName"
                          placeholder="Cardo"
                          className="form1-input"
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="row">
                        {" "}
                        <label htmlFor="lastName" className="form1-label">
                          Last Name:
                        </label>
                        <TextInput
                          type="text"
                          id="lastName"
                          placeholder="Dalisay"
                          className="form1-input"
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                      <button
                        type="submit"
                        className="settings-submit"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="loading-spinner"></div>
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {visibleSection === "profilePicture" && (
                <div className="set-cont2-cont">
                  <form className="settings-forms-1" onSubmit={handleSubmit}>
                    <p className="set-cont2-title">
                      Update your Profile Picture
                    </p>
                    <div className="rowgap">
                      <div className="row">
                        <img
                          src={newPhotoURL || photoURL}
                          className="update-homeimg"
                          alt=""
                        />
                        <input
                          type="file"
                          id="photo"
                          className="input-img"
                          onChange={handlePhotoChange}
                          required
                          accept="image/*"
                        />
                        <button
                          type="submit"
                          value="Submit"
                          className="settings-submit"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <div className="loading-spinner"></div>
                          ) : (
                            "Submit"
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
              {visibleSection === "comingSoon" && (
                <form
                  className="settings-forms-profilepic"
                  onSubmit={handleSubmit}
                >
                  <div className="prof-container">
                    <h1>Coming Soon...</h1>
                  </div>
                </form>
              )}
              {visibleSection === "comingSoon2" && (
                <form
                  className="settings-forms-profilepic"
                  onSubmit={handleSubmit}
                >
                  <div className="prof-container">
                    <h1>Coming Soon...</h1>
                  </div>
                </form>
              )}
              {visibleSection === "comingSoon3" && (
                <form
                  className="settings-forms-profilepic"
                  onSubmit={handleSubmit}
                >
                  <div className="prof-container">
                    <h1>Coming Soon...</h1>
                  </div>
                </form>
              )}
              {visibleSection === "comingSoon4" && (
                <form
                  className="settings-forms-profilepic"
                  onSubmit={handleSubmit}
                >
                  <div className="prof-container">
                    <h1>Coming Soon...</h1>
                  </div>
                </form>
              )}
              {visibleSection === "comingSoon5" && (
                <form
                  className="settings-forms-profilepic"
                  onSubmit={handleSubmit}
                >
                  <div className="prof-container">
                    <h1>Coming Soon...</h1>
                  </div>
                </form>
              )}
              {visibleSection === "comingSoon6" && (
                <form
                  className="settings-forms-profilepic"
                  onSubmit={handleSubmit}
                >
                  <div className="prof-container">
                    <h1>Coming Soon...</h1>
                  </div>
                </form>
              )}
              {/* {displayName ? 
        <div className='settings-greet'>Hello, {displayName}</div>
         : "No name!"} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
