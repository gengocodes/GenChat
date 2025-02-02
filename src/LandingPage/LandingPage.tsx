import React, { useEffect, useRef, useState, useMemo } from "react";
import "./LandingPage.css";
import SignInGoogle from "../Auth/SignIn/SignInGoogle";
import SignInFacebook from "../Auth/SignIn/SignInFacebook";
import Logo from "../assets/GenChat.png";
import Background from './particles';
import { getAuth } from "firebase/auth";
// import video1 from "../assets/video1.mp4";
// Hooks
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const auth = getAuth();


const LandingPage: React.FC = () => {

  const memoizedBackground = useMemo(() => (
    <Background id="landing-background" className="landing-background" />
  ), []);

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const [displayedText, setDisplayedText] = useState(""); // Text being displayed
  const [isTyping, setIsTyping] = useState(true); // Whether typing or deleting
  const [currentTextIndex, setCurrentTextIndex] = useState(0); // Index of current text
  const fullTexts = useRef(["Gengo-bit", "Paul Corsino"]); // List of texts to alternate
  const typingSpeed = 150; // Speed of typing in ms
  const deletingSpeed = 100; // Speed of deleting in ms
  const pauseTime = 2000; // Pause before switching text

  useEffect(() => {

    let timeout: string | number | NodeJS.Timeout | undefined;

    const typeAndDelete = () => {
      const currentFullText = fullTexts.current[currentTextIndex];

      if (isTyping) {
        // Typing effect
        if (displayedText.length < currentFullText.length) {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
          timeout = setTimeout(typeAndDelete, typingSpeed);
        } else {
          setIsTyping(false); // Switch to deleting after typing finishes
          timeout = setTimeout(typeAndDelete, pauseTime);
        }
      } else {
        // Deleting effect
        if (displayedText.length > 0) {
          setDisplayedText(currentFullText.slice(0, displayedText.length - 1));
          timeout = setTimeout(typeAndDelete, deletingSpeed);
        } else {
          setIsTyping(true); // Switch to typing the next text
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % fullTexts.current.length);
          timeout = setTimeout(typeAndDelete, typingSpeed);
        }
      }
    };

    timeout = setTimeout(typeAndDelete, typingSpeed);

    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, [displayedText, isTyping, currentTextIndex]); // Dependencies to trigger effect

  return (

    <div className="landing-container">
      {memoizedBackground}
      <div className="div1">  
        <div className="info">
        <h1> GenChat </h1>
        <h4> A Facebook web-application clone powered by </h4>
        <a className="gengo-bit" href="https://gengo-bit.netlify.app" target="_blank" rel="noreferrer"> {displayedText}.</a> 
        </div>
        
      </div>
      <div className="div2">
        <form>
            <img src={Logo} className="landing-logo" alt='' />
            <div className="input-box">
              <input type="text" id="username" placeholder="Username"  required />
            </div>
            <div className="input-box">
                <input type="password" id="password" placeholder="Password"  required />
            </div>
                <button className="submit"> Log In</button>
            <div className="links">
                <button className="forget-pass">Forgot password?</button>
                <button className="sign-up">Sign Up</button>
            </div>
            <div className="socmed-links">
                <p>Log In with:</p>
            </div>
            <div className="socmed-container">
            <SignInGoogle className="signin-button" />
            <SignInFacebook className="signin-button" />
            </div>
          </form>
          </div> 
    </div>
  );
}

export default LandingPage
