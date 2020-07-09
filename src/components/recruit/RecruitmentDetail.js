import React, {Component} from 'react';
import {Document, Page} from "react-pdf"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Recruitment.css"

class RecruitmentDetail extends Component{

    state = { recruitment: {}, numPages:null, pageNumber:1 }

    componentDidMount() {
        
        const {id} = this.props.match.params;
        
        fetch(`https://api.recruitdsm.ga/api/recruitment/${id}`, {
        method: 'GET',
        headers: {
            'Authorization':`Bearer ${window.sessionStorage.getItem("token")}`
        }})
        .then(res => res.json())
        .then(res =>
            this.setState({recruitment:res.recruitment, numPages:null, pageNumber:1}))
        .catch(error=>console.log(error));
}

onDocumentLoadSuccess = ({numPages}) => {
    this.setState({...this.state, numPages: numPages, pageNumber:1})
  
}

applyForRecruit = () => {

    fetch('https://api.recruitdsm.ga/api/apply?recruitment='+this.state.recruitment.company_name, {
        method: 'GET',
        headers: {
            'Authorization':`Bearer ${window.sessionStorage.getItem("token")}`
        }})
        .then(res => {if (res.status == 200) alert("채용 지원이 완료되었습니다.")})
        .catch(error=> {
            console.log(error);
            alert("잠시 후 다시 시도하여 주십시오.");}
        );
}

    render (){
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows:false
          };

        const {pageNumber, numPages} = this.state;
        return (
        <div id="recruitment-detail" className="content-body">

        <div className="content-info-container">

            <div className="slider-wrapper">
            <Slider {...settings}>
                {
                    (this.state.recruitment.recruit_img_paths||[]).map((path, index) =>
                    <img className="slider-img"src={path} key={index}/>)
                } 

            </Slider>
            </div>

            <div className="content-item-summary">
                
                <div>
                    <h3>
                        {this.state.recruitment.company_name}
                    </h3>
                    <span className={this.state.recruitment.status == "진행 중"? "in-progress":"completed"}>{this.state.recruitment.status}</span>
                </div>
                
                <br/>
                <div>
                    <span>{this.state.recruitment.company_info}</span>
                </div>
                <br/>
                
                <div>
                    <span><b>직무</b>&nbsp;</span>
                    <span>{this.state.recruitment.position}</span>
                </div>

                <div>
                    <span><b>직무 소개</b>&nbsp;</span>
                    <span>{this.state.recruitment.position_info}</span>
                </div>
                
                <div>
                    <span><b>근무 위치</b>&nbsp;</span>
                    <span>{this.state.recruitment.location}</span>
                </div>

                {this.state.recruitment.status == "진행 중"?
                <button className="normal-button" id="apply-button" onClick={this.applyForRecruit}>지원하기</button> :null}
            </div>
            </div>
       

            <div className="recruitment-preview">
                <Document file={this.state.recruitment.document_file_path}
                            onLoadSuccess={this.onDocumentLoadSuccess}
                            onLoadError={() => { this.setState({...this.state, numPages:null, pageNumber:1});console.error();}}
                            noData={""}>
                <Page pageNumber={pageNumber} />
          
                </Document>
                {numPages? 
        
                    <p className="normal-text">
                        <span className="normal-text" onClick={() => pageNumber > 1 ? 
                            this.setState({...this.state, pageNumber :this.state.pageNumber+1}) : null}>
                            &lt;</span>
                        <span className="normal-text"> {pageNumber} / {numPages} </span>
                        <span className="normal-text" onClick={() => pageNumber < numPages ?
                            this.setState({...this.state, pageNumber: this.state.pageNumber+1}) : null}>

                            &gt;</span>
                    </p>
                :null}
            </div>

        </div>
        );
    }
}

export default RecruitmentDetail;