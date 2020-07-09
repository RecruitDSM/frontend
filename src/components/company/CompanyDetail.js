import React, {Component} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class CompanyDetail extends Component{

    state = { company: {} }

    componentDidMount() {
    
        const {id} = this.props.match.params;
    
        fetch(`https://api.recruitdsm.ga/api/company/${id}`, {
            method: 'GET',
            headers: {
                'Authorization':`Bearer ${window.sessionStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(res => {
          this.setState({company: res.company});
        })
        .catch( error => { console.log(error)});
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

        return (
        <div className="content-body">

        <div className="content-info-container">
            <div className="slider-wrapper">
                <Slider {...settings}>
                    {
                        (this.state.company.company_img_paths||[]).map((path, index) =>
                        <img className="slider-img"src={path} key={index}/>)
                    } 

                </Slider>
            </div>

            <div className="content-item-summary">

                <div>
                    <h3>
                        {this.state.company.company_name}
                    </h3>
                </div>
                <br/>

                <div>
                    <span><b>기업 위치</b>&nbsp;</span>
                    <span>{this.state.company.location}</span>
                </div>
            </div>


        </div>
                <span className="comapny-info">{this.state.company.company_info}</span>
        </div>
        );
    }
}

export default CompanyDetail;