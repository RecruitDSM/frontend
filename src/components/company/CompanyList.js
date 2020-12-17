import React from 'react';
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { baseURL } from '../../data/api';
import CompanyItem from './CompanyItem';


const CompanyList = () => {

  const [companys, setCompanys] = React.useState([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [isAuthorized, setIsAuthorized] = React.useState(false);

  React.useEffect(() => {
    fetchData(0);
  }, [])

  const fetchData = (skip) => {
    fetch(`${baseURL}/company?skip=${skip}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.companys.length === 0) {
          setCompanys(companys);
          setHasMore(false);
          setIsAuthorized(res.isAuthorized);
        }
        else {
          setCompanys(companys.concat(res.companys));
          setHasMore(true);
          setIsAuthorized(res.isAuthorized);
        }
      })
      .catch(error => { console.log(error) });
  }

  return (

    <div id="company-list">
      {isAuthorized &&
        <div className="content-header">
          <Link to="/enroll/company" className="normal-button link-button margin-left-auto">등록</Link>
        </div>}
      <div className="content-body">
        <InfiniteScroll
          dataLength={companys.length} //This is important field to render the next data
          next={() => fetchData(companys.length)}
          hasMore={hasMore}
          height={835}
          loader={<h4>불러오는 중입니다.</h4>}
        >
          {companys.map((company, index) => <CompanyItem company={company} key={index} />)}
        </InfiniteScroll>
      </div>
    </div>
  );

}
export default CompanyList;