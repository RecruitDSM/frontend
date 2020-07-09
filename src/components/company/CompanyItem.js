import React from 'react';
import { Link } from "react-router-dom";

function CompanyItem(props){

    return (
        <div className="content-item">
        <Link to={`/company/${props.company._id}`}>
            <img src={props.company.company_img_paths[0]}></img>
            <div className="content-item-summary">
                <h3>{props.company.company_name}</h3>
                <div>
                <span>지역·</span><span>{props.company.region}</span>
                </div>
            </div>
        </Link>
        </div>
    );
}

export default CompanyItem;