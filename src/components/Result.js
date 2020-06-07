import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import "./Result.css";

class Result extends Component {

  constructor(props) {
    super(props);
    this.state = {  showModal: false };
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    this.setState({showModal: nextProps.showResult })
  }

  render() {
    return this.renderResult();
  }


  renderResult() {
    return (
      <Modal
      centered={true}
      show={this.state.showModal}
      onHide={() =>this.closeModal()}
      >
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="custom-header">
            <i className="material-icons md-36">tour</i>
            <span> Result</span>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Congrats! Your score is {this.props.score}
        <p>Want to try again?</p>
        <button
          className="button"
          onClick={this.props.resetGame}>
          play again
        </button>
      </Modal.Body>
      </Modal>
    );
  }

  openModal() {
    this.setState({
      showModal: true
    });
  }

  closeModal() {
    this.setState({
      showModal: false
    });
  }
}

export default Result;
