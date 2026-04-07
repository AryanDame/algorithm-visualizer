import React from 'react';
import './StartupAcknowledgementModal.css';
import ProjectAcknowledgementModule from './ProjectAcknowledgementModule';

function StartupAcknowledgementModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="startup-ack-overlay">
      <div className="startup-ack-modal">
        <div className="startup-ack-header">
          <h1>Welcome to PathForge Route Lab</h1>
          <button
            type="button"
            className="startup-ack-close"
            onClick={onClose}
            aria-label="Close acknowledgement"
          >
            x
          </button>
        </div>

        <ProjectAcknowledgementModule />

        <button type="button" className="startup-ack-continue" onClick={onClose}>
          Continue to Application
        </button>
      </div>
    </div>
  );
}

export default StartupAcknowledgementModal;
