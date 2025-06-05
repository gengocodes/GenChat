import React, { useRef, useState, useEffect } from "react";
import "./ChatRoom.css";
import ChatMessage from "../ChatMessage/ChatMessage";
import { auth, firestore, storage } from "../../FirebaseConfig";
import Background from "../../LandingPage/particles";
import logo from "../../assets/GenChat.png";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useNavigate } from "react-router-dom";

// Firestore imports
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
  const navigate = useNavigate();
  const user = auth.currentUser;
  const photoURL = user?.photoURL || "";
  const dummy = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [formValue, setFormValue] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [activeSection2] = useState("chat-cont");

  // Create a ref for the file input field to reset it after sending a message
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Fetch messages in real-time
  useEffect(() => {
    const messagesRef = collection(firestore, "messages");
    const messagesQuery = query(messagesRef, orderBy("createdAt"));

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
    let imageUrl = "";

    // Upload image if selected
    if (image) {
      const imageRef = ref(storage, `chat_images/${image.name}-${Date.now()}`);
      const snapshot = await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    // Store message in Firestore
    await addDoc(collection(firestore, "messages"), {
      text: formValue || null,
      imageUrl: imageUrl || null,
      createdAt: serverTimestamp(),
      uid,
      photoURL: photoURL || "",
      displayName: displayName || "Unknown User",
    });

    // Reset text input and image selection
    setFormValue("");
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

  const handleSignOut = () => {
    auth.signOut();
    navigate("/");
  };
  const toggleSection = (section: string) => {
    setVisibleSection((prevSection) =>
      prevSection === section ? null : section
    );
  };
  const [visibleSection, setVisibleSection] = useState<string | null>(null);
  return (
    <div className="chatroom-main">
      <Background id={undefined} className="home-background" />
      <div className="homepage-container">
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
                  className="home-settings-cont"
                  onClick={() => navigate("/settings")}
                >
                  {" "}
                  <SettingsIcon className="settings-icon" />
                </div>
                <div
                  className={`chat-cont ${
                    activeSection2 === "chat-cont" ? "active" : ""
                  }`}
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
                <p className="set-title">Chats</p>
              </div>
              <div
                className={`settings-cont ${
                  visibleSection === "public" ? "active" : ""
                }`}
                onClick={() => toggleSection("public")}
              >
                <div className="settings-cont-1">
                  <p className="option-settings">Public</p>
                </div>

                <div className="settings-cont-2"></div>
              </div>
              <div
                className={`settings-cont ${
                  visibleSection === "coming-soon" ? "active" : ""
                }`}
                onClick={() => toggleSection("coming-soon")}
              >
                <div className="settings-cont-1">
                  <p className="option-settings">Coming soon..</p>
                </div>
                <div className="settings-cont-2"></div>
              </div>
            </div>
          </div>
          <div className="settings-main-cont2">
            <div className="holder">
              {visibleSection === "public" && (
                <div className="set-cont2-cont">
                  <div className="chat-cont-1">
                    {" "}
                    <main>
                      {messages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg} />
                      ))}
                      <div ref={dummy}></div>
                    </main>
                    {auth.currentUser && (
                      <form onSubmit={sendMessage} className="chat-form">
                        <input
                          value={formValue}
                          onChange={(e) => setFormValue(e.target.value)}
                          placeholder="Type a message"
                          className="inputmessage"
                        />
                        {/* File input field with ref to reset after sending */}
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef} // Attach ref to input field
                          onChange={(e) =>
                            setImage(e.target.files ? e.target.files[0] : null)
                          }
                          className="inputimage"
                        />
                        <button type="submit" className="submitchat">
                          Send
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              )}
              {visibleSection === "coming-soon" && (
                <div className="set-cont2-cont">Coming soon...</div>
              )}
            </div>
          </div>
        </div>

        <div className="background"></div>
      </div>
    </div>
  );
};

export default ChatRoom;
