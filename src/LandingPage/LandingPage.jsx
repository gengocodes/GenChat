import React, { useEffect } from "react";
import "./LandingPage.css";
import SignIn from "../Auth/SignIn/SignIn";
import Logo from "../assets/GenChat.png";
import { motion } from "framer-motion";
import { auth } from "../FirebaseConfig";
import video1 from "../assets/video1.mp4";
// Hooks
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/HomePage');
    }
  }, [user, navigate]);

  return (
    <div className="landing-container">
      <div className="hello">
      <video autoPlay loop muted width="100%" height="100%">
  <source src={video1} type="video/mp4" />
</video>

      </div>
      <motion.div
        className="landing-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.img
          src={Logo}
          alt=""
          className="landing-logo"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        />
        <motion.h1
          className="landing-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Welcome to GenChat
        </motion.h1>
        <motion.p
          className="landing-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Powered by Gengo-bit
        </motion.p>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <SignIn className="signin-button" />
        </motion.div>
      </motion.div>
    </div>
  );
}


export default LandingPage
