import React, { useEffect } from 'react';
import "./App.css";
import AppBar from "./Components/AppBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import AboutComponent from "./Components/Profile/AboutComponent";
import TodoComponent from "./Components/Goals/TodoComponent";

function App() {
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // Prevent the mini-infobar from appearing on mobile
      e.prompt(); // Automatically show the install prompt
      e.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
      });
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  return (
    <>
      <AppBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<AboutComponent />} />
          <Route path="/goals" element={<TodoComponent />} />
          <Route path="/settings" element={<h1>Settings</h1>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
