import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';

import { baseURL } from '../../data/api';
import NoticeItem from './NoticeItem';
import "./Notice.css"

const NoticeList = () => {

  const [notices, setNotices] = React.useState([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [isAuthorized, setIsAuthorized] = React.useState(false);

  const fetchData = (skip) => {
    fetch(`${baseURL}/notice?skip=${skip}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.notices.length === 0) {
          setNotices(notices);
          setHasMore(false);
          isAuthorized(res.isAuthorized);
        } else {
          setNotices(notices.concat(res.notices));
          setHasMore(true);
          setIsAuthorized(res.isAuthorized)
        }
      })
      .catch(error => { console.log(error) });

    console.log(this.state.isAuthorized)
  }

  React.useEffect(() => {
    fetchData(0);
  }, []);


  return (
    <div>
      {isAuthorized &&
        <div className="content-header">
          <Link to="/enroll/notice" className="normal-button link-button margin-left-auto">등록</Link>
        </div>}
      <div className="notice-header">
        <ul>
          <li className="float-left">번호</li>
          <li>제목</li>
          <li className="float-right">날짜</li>
          <li className="float-right">작성자</li>
        </ul>
      </div>
      <InfiniteScroll
        dataLength={notices.length}
        next={() => fetchData(notices.length)}
        hasMore={this.state.hasMore}
        height={580}
        loader={<p>불러오는 중입니다.</p>}>
        {(this.state.notices || []).map((notice, index) => <NoticeItem notice={notice} key={index} sequence={index + 1} />)}
      </InfiniteScroll>
    </div>
  );

}
export default NoticeList;