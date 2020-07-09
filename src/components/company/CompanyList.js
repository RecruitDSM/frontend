import React, { Component } from 'react';
import { Link } from "react-router-dom";
import CompanyItem from './CompanyItem';
import InfiniteScroll from "react-infinite-scroll-component";


class CompanyList extends Component {

    constructor(props){
        super(props)
        this.state = { companys: [], hasMore:true, isAuthorized:false}
    }

    componentDidMount() {
        this.fetchData(0);
    }

    fetchData(skip){
        fetch('https://api.recruitdsm.ga/api/company?skip='+skip , {
            method: 'GET',
            headers: {
                'Authorization':`Bearer ${window.sessionStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(res => {
            if(res.companys.length == 0)
                this.setState({companys: this.state.companys, hasMore: false, isAuthorized:res.isAuthorized})
            else
                this.setState({ companys: this.state.companys.concat(res.companys), hasMore: true, isAuthorized:res.isAuthorized})
            console.log(this.state.isAuthorized);
            })
        .catch( error => { console.log(error)});
    }

    render() {
        return(
            
        <div id="company-list">
        {this.state.isAuthorized?
            <div className="content-header">
                <Link to="/enroll/company" className="normal-button link-button margin-left-auto">등록</Link>
            </div> : null}
            <div className="content-body">
        <InfiniteScroll
            dataLength={this.state.companys.length} //This is important field to render the next data
            next={() => this.fetchData(this.state.companys.length)}
            hasMore={this.state.hasMore}
            height={835}
            loader={<h4>불러오는 중입니다.</h4>}
            >
            {this.state.companys.map((company, index) => <CompanyItem company={company} key={index} />)}
        </InfiniteScroll>
        </div>
        </div>
        );
    }
}
export default CompanyList;