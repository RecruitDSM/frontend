import React from 'react';
import { Link, useHistory } from "react-router-dom";

import "./NavBar.css";

const NavBar = ({ authenticated, signOut }) => {
  const { push } = useHistory();

  const [keyword, setKeyword] = React.useState('');

  const handlePressEnter = (e) => {
    if (e.keyCode === 13 && e.target.value.trim() !== '') {
      handleSearch();
    }
  }

  const handleSearch = () => {
    const searchKeyword = keyword.trim();
    setKeyword('');
    push("/search/" + searchKeyword);
  }

  return (
    <div className="App-nav">
      <Link to="/" id="recruitdsm-link">
        RecruitDSM
        </Link>
      <ul>
        <li>
          <div id="search-bar">
            <input id="search-input" type="text" placeholder="기업명" value={keyword} onChange={
              (e) => setKeyword(e.target.value)} onKeyDown={(e) => handlePressEnter(e)} />
            <Link to={"/search/" + keyword} id="search-link">
              <img src={require("./search.png")} id="search-img" />
            </Link>
          </div>
        </li>
        <li><Link to="/recruit">채용</Link></li>
        <li><Link to="/company">기업</Link></li>
        <li><Link to="/resume">이력서</Link></li>
        <li><Link to="/notice">공지</Link></li>

        {authenticated ?
          <li onClick={() => signOut()}>
            <a>로그아웃</a>
          </li> :
          <li>
            <Link to="/auth">로그인/회원가입</Link>
          </li>}
      </ul>
    </div>
  );
}


export default NavBar;