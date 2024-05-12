import React from "react";

interface InterviewModalProps {
  handleClick: () => void;
}

const InterviewModal: React.FC<InterviewModalProps> = ({ handleClick }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      {/* Overlay */}
      <div
        onClick={handleClick}
        className="absolute inset-0 bg-slate-400 opacity-50"
      ></div>

      {/* Modal Content */}
      <div className="z-10 bg-white p-1 rounded-lg shadow-lg">
        <iframe
          width="300"
          src="https://www.youtube.com/embed/xopvkx6CpNs?si=w19IiO0CmM0BsIul"
          title="YouTube video player"
          className="block mx-auto"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default InterviewModal;
