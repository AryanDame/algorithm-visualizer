import React, { useState } from 'react';
import './AboutModal.css';

function AboutModal({ isOpen, onClose }) {
  const [photoAvailable, setPhotoAvailable] = useState(true);
  const [photoSrc, setPhotoSrc] = useState(`${import.meta.env.BASE_URL}aryan-professional-photo.png`);

  const handlePhotoError = () => {
    const fallbackSrc = `${import.meta.env.BASE_URL}hero.png`;
    if (photoSrc !== fallbackSrc) {
      setPhotoSrc(fallbackSrc);
      return;
    }
    setPhotoAvailable(false);
  };

  if (!isOpen) return null;

  return (
    <div className="about-overlay">
      <div className="about-modal">
        <button className="about-close-top" onClick={onClose} aria-label="Close About modal">
          x
        </button>

        <div className="about-header">
          <div>
            <p className="about-label">About the author</p>
            <h1 className="about-title">Aryan Dame</h1>
          </div>
          <a
            className="about-link"
            href="https://www.linkedin.com/in/aryandame/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>

        <section className="about-intro-card">
          <div className="about-intro-copy">
            <p className="about-summary about-summary-strong">
              I am Aryan Dame. I built this visualizer to make graph search and maze generation easier to understand
              through motion, color, and interaction. I enjoy turning complex concepts into interactive products that
              are both technically strong and visually polished.
            </p>

            <p className="about-summary">
              My interests are at the intersection of data science, AI product thinking, and frontend engineering.
              I like building projects that are practical for learning and also showcase production-level UX.
              If you want to connect for collaboration, internships, or project work, feel free to reach out on LinkedIn.
            </p>
          </div>

          <div className="about-photo-section">
            <div className="about-photo-frame">
              {photoAvailable ? (
                <img
                  src={photoSrc}
                  alt="Aryan Dame professional portrait"
                  className="about-photo"
                  onError={handlePhotoError}
                />
              ) : (
                <div className="about-photo-fallback">
                  <span>AD</span>
                  <small>Add file: public/aryan-professional-photo.png</small>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="about-grid">
          <section className="about-panel">
            <h2>About Aryan Dame</h2>
            <ul>
              <li>Focused on practical AI, data science, and interactive engineering</li>
              <li>Builds educational tools that make algorithms intuitive</li>
              <li>Combines product design, frontend engineering, and analytics</li>
              <li>Open to collaborations and internships through LinkedIn</li>
              <li>Goal: bridge business understanding with technically rigorous AI systems</li>
            </ul>
          </section>

          <section className="about-panel">
            <h2>What This Project Aims To Do</h2>
            <ul>
              <li>Make complex pathfinding behavior understandable through live visuals</li>
              <li>Show trade-offs between speed, memory, and path quality</li>
              <li>Offer a clean and modern interface for learning and experimentation</li>
              <li>Connect algorithm theory to practical product and AI workflows</li>
            </ul>
          </section>
        </div>

      </div>
    </div>
  );
}

export default AboutModal;