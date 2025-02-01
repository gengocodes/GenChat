import React, { useEffect } from "react";
import "./LandingPage.css";
import SignIn from "../Auth/SignIn/SignIn";
// import Logo from "../assets/GenChat.png";
import Background from './particles';
import { getAuth } from "firebase/auth";
// import video1 from "../assets/video1.mp4";
// Hooks
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const auth = getAuth();

const LandingPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/HomePage');
    }
  }, [user, navigate]);

  return (
    <div className="landing-container">
      <Background id="landing-background" className="landing-background" />
      <div className="div1">  </div>
      <div className="div2"> <SignIn /> </div>
      
          
    </div>
  );
}

export default LandingPage
