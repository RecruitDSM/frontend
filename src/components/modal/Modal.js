import { Component } from "react";
import React from "react";
import "./Modal.css";

class Modal extends Component{

    render(){
        return(
            <div id="modal-background-layer" className={ this.props.isOpen ? "display-block" : "display-none"}>
            <div id="modal-container" >
                <span id="close-button" onClick={this.props.onRequestClose}>x</span>

                {this.props.children}

            </div>
            </div>
        );
    }
}

export default Modal;