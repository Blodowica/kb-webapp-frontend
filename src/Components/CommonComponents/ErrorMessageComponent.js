import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ErrorMessage = ({ message, show, onClose }) => {
  if (!message) return null;

  return (
    <ToastContainer
      position="top-center"
      className="p-3"
      style={{
        position: "fixed",
        top: 10,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1050,
        maxWidth: "500px",
        width: "90%",
      }}
    >
      <Toast bg="danger" onClose={onClose} show={show} delay={5000} autohide>
        <Toast.Header>
          <strong className="me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ErrorMessage;
