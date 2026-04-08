import React, { useState } from "react";
import "./ProjectAcknowledgementModule.css";

function ProjectAcknowledgementModule() {
  const pdfHref = `${import.meta.env.BASE_URL}Aryan_Dame_Project_Report_Copilot.pdf`;
  const githubHref = "https://github.com/AryanDame/algorithm-visualizer";
  const [photoAvailable, setPhotoAvailable] = useState(true);
  const [photoSrc, setPhotoSrc] = useState(
    `${import.meta.env.BASE_URL}aryan-professional-photo.png`,
  );

  const handlePhotoError = () => {
    const fallbackSrc = `${import.meta.env.BASE_URL}hero.png`;
    if (photoSrc !== fallbackSrc) {
      setPhotoSrc(fallbackSrc);
      return;
    }
    setPhotoAvailable(false);
  };

  return (
    <section
      className="project-ack-module"
      aria-label="Project acknowledgement module"
    >
      <div className="project-ack-head">
        <div>
          <p className="project-ack-label">Acknowledgement</p>
          <h2>Artificial Business Intelligence Project</h2>{" "}
        </div>
        <span className="project-ack-tag">Removable Module</span>
      </div>

      <div className="project-ack-body">
        <div className="project-ack-photo-card">
          {photoAvailable ? (
            <img
              src={photoSrc}
              alt="Aryan Dame professional portrait"
              className="project-photo"
              onError={handlePhotoError}
            />
          ) : (
            <div
              className="project-photo-fallback"
              aria-label="Photo placeholder"
            >
              <span>AD</span>
              <small>Add file: public/aryan-professional-photo.png</small>
            </div>
          )}
        </div>

        <div className="project-ack-copy-area">
          <p className="project-ack-lead">
            Welcome Prof. Dr. Igor Perko from the University of Maribor. This
            website was designed as a project for the subject Artificial
            Business Intelligence to test the capabilities of GitHub Copilot.
          </p>

          <p className="project-ack-copy">
            I am Aryan Dame, a student working at the intersection of Artificial
            Intelligence, data science, and product engineering. This project
            demonstrates practical algorithm understanding through an
            interactive application experience.
          </p>

          <p className="project-ack-copy project-ack-emphasis">
            This project statement notes that not a single line of code was
            manually typed by the author and that the implementation was
            generated using GitHub Copilot.
          </p>

          <div className="project-ack-actions">
            <a
              className="project-action-button"
              href={pdfHref}
              target="_blank"
              rel="noreferrer"
            >
              <span className="project-action-icon" aria-hidden="true">
                PDF
              </span>
              <span>Open Project Report</span>
            </a>

            <a
              className="project-action-button"
              href={githubHref}
              target="_blank"
              rel="noreferrer"
            >
              <span className="project-action-icon github" aria-hidden="true">
                GH
              </span>
              <span>Open GitHub Repo</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectAcknowledgementModule;
