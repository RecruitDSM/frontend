import React from "react";
import { Route} from "react-router-dom";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail"
import "./Company.css"

function Company({ match}) {
  return (
      <div className="content-container">
      <Route exact path={match.path} component={CompanyList} />
      <Route path={`${match.path}/:id`} component={CompanyDetail} />
      </div>
  );
}

export default Company;
