import React, {Component} from 'react';
import "./Notice.css"

class NoticeDetail extends Component{

    state = { notice: {} }
    componentDidMount() {
        const {id} = this.props.match.params;
        fetch(`https://api.recruitdsm.ga/api/notice/${id}`, {
            method: 'GET',
            headers: {
                'Authorization':`Bearer ${window.sessionStorage.getItem("token")}`
        }})
        .then(res => res.json())
        .then(res => {
          this.setState({notice: res.notice});
        })
        .catch( error => { console.log(error)});
    }

    render(){
        return (
        <div>
            <div className="notice-header">
            <ul>
                <li className="float-left">{this.state.notice.title}</li>
              
                <li className="float-right" id="notice-header-date">{this.state.notice.date}</li>
                <li className="float-right">{this.state.notice.author}</li>  
            </ul>
            </div>

        <div className="notice-content">
            {this.state.notice.content}
            {this.state.notice.attachment_paths && this.state.notice.attachment_paths.length > 0 ? <p>첨부파일</p> : null }
            {
                (this.state.notice.attachment_paths || []).map((attachment, index) =>
                <a target="_blank" href={attachment} key={index} className="attachment-link">{attachment.split("/").pop()}</a>
                )
            }
            </div>
        </div>
        );
    }
}

export default NoticeDetail;