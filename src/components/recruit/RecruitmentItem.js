import React from 'react';
import { Link } from "react-router-dom";
import "./Recruitment.css"

function RecruitmentItem(props){

    return (
        <div className="content-item">
        <Link to={`/recruit/${props.recruitment._id}`}>
            <img src={props.recruitment.recruit_img_paths[0] }></img>

            <div className="content-item-summary">
                <div>
                <h3>{props.recruitment.company_name}</h3>
                
               <span className={props.recruitment.status == "진행 중"? "in-progress":"completed"}>{props.recruitment.status}</span>
                </div>
                <div>
                <span>직무&nbsp;·</span><span>&nbsp;{props.recruitment.position}</span>
                </div>
                <div><span>지역&nbsp;·</span><span>&nbsp;{props.recruitment.region}</span>
                </div>
            </div>
        </Link>
        </div>
        
    );
}

export default RecruitmentItem;