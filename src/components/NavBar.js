import React from 'react';
import { Link} from "react-router-dom";
import "./NavBar.css";

class NavBar extends React.Component {

    state = {keyword : ''}

    render() {
        return (
            <div className="App-nav">
                <Link to="/" id="recruitdsm-link">
                    RecruitDSM
                </Link>
                <ul>
                    <li>
                        <div id="search-bar">
                        <input id="search-input" type="text" placeholder="  기업명" onChange={
                            (e) => this.setState({keyword: e.target.value})}/>
                        <Link to={"/search/"+this.state.keyword} id="search-link">
                            <img src={require("./search.png")} id="search-img"/>
                        </Link>
                        </div>
                    </li>
                    <li><Link to="/recruit">채용</Link></li>
                    <li><Link to="/company">기업</Link></li>
                    <li><Link to="/resume">이력서</Link></li>
                    <li><Link to="/notice">공지</Link></li>

                    { this.props.authenticated ?
                    <li onClick={() => this.props.signOut()}>
                        <a>로그아웃</a>
                    </li> :
                    <li>
                        <Link to="/auth">로그인/회원가입</Link>
                    </li>}
                </ul>
            </div>
        );
    }
}

export default NavBar;