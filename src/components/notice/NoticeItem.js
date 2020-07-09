import React from 'react';
import { Link } from "react-router-dom";
import "./Notice.css"

function NoticeItem(props){
    return (
        <Link to={`/notice/${props.notice._id}`}>
        <div className="notice-item">
        
        <ul>
            <li className="float-left">{props.sequence}</li>

            <li>{props.notice.title}</li>

            <li className="float-right">{props.notice.date}</li>
            <li className="float-right">{props.notice.author}</li>
        </ul>
        
        </div>
        </Link>
    );
}

export default NoticeItem;