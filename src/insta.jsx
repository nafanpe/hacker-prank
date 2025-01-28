import React, { useState, useRef } from 'react';
import "./Insta.css";

const InstagramPassFinder = () => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);
  const [showSecondVideo, setShowSecondVideo] = useState(false);

  const firstVideoRef = useRef(null);
  const secondVideoRef = useRef(null);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult('');
    setShowOverlay(false);
    setShowSecondVideo(false);

    setTimeout(() => {
      setIsLoading(false);
      setResult(`Password for "${username}" could not be found.`);
      setUsername('');
      setShowOverlay(true);

      toggleFullScreen();

      if (firstVideoRef.current) {
        firstVideoRef.current.play();
      }

      setTimeout(() => {
        setShowSecondVideo(true);
        if (secondVideoRef.current) {
          secondVideoRef.current.play();
        }
      }, 10000);
    }, 2000);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
    setShowSecondVideo(false); 
  };

  return (
    <>
      {showOverlay && (
        <div className="overlay">
          <div className="black"></div>
          <video ref={firstVideoRef} autoPlay>
            <source
              src="src/assets/hacked.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {showSecondVideo && (
            <video ref={secondVideoRef} autoPlay loop>
              <source
                src="src/assets/Try this Hacker Voice to Prank your friends!.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )}

      <div className="finder">
        <h1>INSTAGRAM PASSWORD FINDER</h1>
      </div>

      <div className="finder">
        <h1 className="finder-heading">Find Your Buddies Password</h1>
        <p className="finder-instruction">Enter the Instagram username to find the password:</p>

        <form onSubmit={handleSubmit} className="finder-form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Instagram Username"
            className="input-field"
            required
          />
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Find Password'}
          </button>
        </form>

        {result && <div className="result-message">{result}</div>}
      </div>
    </>
  );
};

export default InstagramPassFinder;