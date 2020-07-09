import React from "react";
import { Route} from "react-router-dom";
import NoticeList from "./NoticeList";
import NoticeDetail from "./NoticeDetail"
import "./Notice.css"

function Notice({ match }){
  return (
      <div className="content-container">
        <Route exact path={match.path} component={NoticeList} />
        <Route path={`${match.path}/:id`} component={({match}) => <NoticeDetail match={match}/>} />
      </div>
  );
}

export default Notice;
