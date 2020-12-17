import React, { Component } from 'react';
import RecruitmentItem from './RecruitmentItem';

const RecruitmentList = (props) => {
  return (
    <div>
      {props.children}
      <div id="recruitment-list" className="content-body">
        {(props.recruitments || []).map((recruitment, index) =>
          <RecruitmentItem recruitment={recruitment} key={index} />)}
      </div>
    </div>
  );

}
export default RecruitmentList;