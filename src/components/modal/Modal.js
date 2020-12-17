import { Component } from "react";
import React from "react";
import "./Modal.css";

const Modal = (props) => {

  return (
    <div id="modal-background-layer" className={props.isOpen ? "display-block" : "display-none"}>
      <div id="modal-container" >
        <span id="close-button" onClick={props.onRequestClose}>x</span>

        {props.children}

      </div>
    </div>
  );
}

export default Modal;