import React, { Component } from 'react';
import { Link } from "react-router-dom";
import NoticeItem from './NoticeItem';
import "./Notice.css"
import InfiniteScroll from 'react-infinite-scroll-component';

class NoticeList extends Component {

    constructor(props){
        super(props);
        this.state = { notices: [], hasMore:true, isAuthorized:false }
    }

    componentDidMount() {
        this.fetchData(0);
    }

    fetchData(skip){
        fetch('https://api.recruitdsm.ga/api/notice?skip='+skip , {
            method: 'GET',
            headers: {
                'Authorization':`Bearer ${window.sessionStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.notices.length == 0)
                this.setState({notices: this.state.notices, hasMore: false, isAuthorized: res.isAuthorized})
            else
                this.setState({notices: this.state.notices.concat(res.notices), hasMore: true, isAuthorized: res.isAuthorized})
        })
        .catch( error => { console.log(error)});

        console.log(this.state.isAuthorized)
    }

 
    render() { 
        return (
            <div>
                {this.state.isAuthorized?
                 <div className="content-header">
                    <Link to="/enroll/notice" className="normal-button link-button margin-left-auto">등록</Link>
                 </div> : null}
            <div className="notice-header">
            <ul>
                <li className="float-left">번호</li>
                <li>제목</li>
                <li className="float-right">날짜</li>
                <li className="float-right">작성자</li>
            </ul>
            </div>
            <InfiniteScroll
                dataLength={this.state.notices.length} 
                next={() => this.fetchData(this.state.notices.length)}
                hasMore={this.state.hasMore}
                height={580}
                loader={<p>불러오는 중입니다.</p>}>
            {(this.state.notices || []).map((notice, index) => <NoticeItem notice={notice} key={index} sequence={index+1}/>)}
            </InfiniteScroll>
            </div>
        );
    }
}
export default NoticeList;