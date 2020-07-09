import React from "react";
import './EnrollForm.css';

class EnrollForm extends React.Component{

    render(){
        return(
            <form onSubmit={this.props.handleSubmit} className="enroll-form">
            {this.props.children}
            <button className="enroll-button"type="submit">등록</button>
            </form>
        );
    }

}

export default EnrollForm;