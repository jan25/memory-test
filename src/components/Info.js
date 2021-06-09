import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./Info.css";

const Info = ({ showInfo, showReset, onReset }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const renderResetBtn = () => {
    return (
      <div>
        <i className="material-icons" onClick={onReset}>
          refresh
        </i>
      </div>
    );
  }

  const renderInfo = () => {
    return (
      <div>
        <i className="material-icons md-light" onClick={() => setModalOpen(true)}>
          info
        </i>
        <Modal
          centered={true}
          show={modalOpen}
          onHide={() => setModalOpen(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <div className="custom-header">
                <i className="material-icons md-36">info</i>
                <span>Info</span>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            This game is a memory test for your brain on how well it can store
            information for short term recollection.
            <Modal.Title>Instructions</Modal.Title>
            <ol>
              <li>Remember the layout of numbers given to you</li>
              <li>
                Click on number <i>1</i> to hide the numbers under cards
              </li>
              <li>
                Now click on cards in order of numbers as you've seen them
                before
              </li>
              <li>Continue (3) until all numbers are collected</li>
            </ol>
          </Modal.Body>
        </Modal>
      </div>
    );
  }

  if (showInfo) {
    return renderInfo();
  } else if (showReset) {
    return renderResetBtn();
  }
}

export default Info;
