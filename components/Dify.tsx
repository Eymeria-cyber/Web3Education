// components/ProfilePopup.js

import React, { useState } from 'react';

const ProfilePopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="profile-popup">
      <div className={`popup ${showPopup ? 'visible' : ''}`}>
        <iframe src="https://udify.app/chat/a2HZ7VuycMwG6LNe" className="iframe-content" />
      </div>
      <div className="profile-button" onClick={togglePopup}>
        <img src="/icon.png" alt="Profile Avatar" />
      </div>

      <style jsx>{`
        .profile-popup {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000; /* Ensure it's above other content */
        }

        .popup {
          position: absolute;
          bottom: 50px;
          right: 0;
          width: 300px;
          height: 400px;
          background-color: white;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
          display: none;
        }

        .popup.visible {
          display: block;
        }

        .iframe-content {
          width: 100%;
          height: 100%;
          border: none; /* Remove iframe border */
        }

        .profile-button {
          width: 50px;
          height: 50px;
          background-color: #0070f3;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }

        .profile-button img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default ProfilePopup;
