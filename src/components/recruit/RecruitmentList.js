import React, { Component } from 'react';
import RecruitmentItem from './RecruitmentItem';

class RecruitmentList extends Component {

    constructor(props){
        super(props);
    }

    render() { 
        return (
            <div>
            {this.props.children}
            <div id="recruitment-list" className="content-body">
            {(this.props.recruitments || []).map((recruitment, index) =>
                    <RecruitmentItem recruitment={recruitment} key={index} />)}
            </div>
            </div>
        );
    }
}
export default RecruitmentList;