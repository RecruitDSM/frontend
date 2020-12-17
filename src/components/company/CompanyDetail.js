import React from 'react';
import Slider from "react-slick";

import { baseURL } from '../../data/api';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const CompanyDetail = (props) => {

  const [company, setCompany] = React.useEffect({});

  React.useEffect(() => {
    const { id } = this.props.match.params;

    fetch(`${baseURL}/company/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ company: res.company });
      })
      .catch(error => { console.log(error) });
  });

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  return (
    <div className="content-body">

      <div className="content-info-container">
        <div className="slider-wrapper">
          <Slider {...settings}>
            {
              (company.company_img_paths || []).map((path, index) =>
                <img className="slider-img" src={path} key={index} />)
            }

          </Slider>
        </div>

        <div className="content-item-summary">

          <div>
            <h3>
              {company.company_name}
            </h3>
          </div>
          <br />

          <div>
            <span><b>기업 위치</b>&nbsp;</span>
            <span>{company.location}</span>
          </div>
        </div>


      </div>
      <span className="comapny-info">{company.company_info}</span>
    </div>
  );

}

export default CompanyDetail;