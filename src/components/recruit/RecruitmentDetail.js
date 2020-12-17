import React, { useState } from 'react';
import { Document, Page } from "react-pdf"
import Slider from "react-slick";

import { baseURL } from '../../data/api';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Recruitment.css"

const RecruitmentDetail = (props) => {

  const [recruitment, setRecruitment] = useState({});
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  React.useEffect(() => {
    const { id } = props.match.params;

    fetch(`${baseURL}/recruitment/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(res => {
        setRecruitment(res.recruitment);
        setNumPages(null);
        setPageNumber(1)
      }).catch(error => console.log(error));
  });


  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const applyForRecruit = () => {

    fetch(`${baseURL}/apply?recruitment=` + recruitment.company_name, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`
      }
    })
      .then(res => { if (res.status === 200) alert("채용 지원이 완료되었습니다.") })
      .catch(error => {
        console.log(error);
        alert("잠시 후 다시 시도하여 주십시오.");
      }
      );
  }


  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };


  return (
    <div id="recruitment-detail" className="content-body">

      <div className="content-info-container">

        <div className="slider-wrapper">
          <Slider {...settings}>
            {
              (recruitment.recruit_img_paths || []).map((path, index) =>
                <img className="slider-img" src={path} key={index} />)
            }

          </Slider>
        </div>

        <div className="content-item-summary">

          <div>
            <h3>
              {recruitment.company_name}
            </h3>
            <span className={recruitment.status === "진행 중" ? "in-progress" : "completed"}>{recruitment.status}</span>
          </div>

          <br />
          <div>
            <span>{recruitment.company_info}</span>
          </div>
          <br />

          <div>
            <span><b>직무</b>&nbsp;</span>
            <span>{recruitment.position}</span>
          </div>

          <div>
            <span><b>직무 소개</b>&nbsp;</span>
            <span>{recruitment.position_info}</span>
          </div>

          <div>
            <span><b>근무 위치</b>&nbsp;</span>
            <span>{recruitment.location}</span>
          </div>

          {recruitment.status === "진행 중" ?
            <button className="normal-button" id="apply-button" onClick={applyForRecruit}>지원하기</button> : null}
        </div>
      </div>


      <div className="recruitment-preview">
        <Document file={recruitment.document_file_path}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={() => { setNumPages(null); setPageNumber(1); console.error(); }}
          noData={""}>
          <Page pageNumber={pageNumber} />

        </Document>
        {numPages ?

          <p className="normal-text">
            <span className="normal-text" onClick={() => {
              if (pageNumber > 1)
                setPageNumber(pageNumber + 1);
            }}>
              &lt;</span>
            <span className="normal-text"> {pageNumber} / {numPages} </span>
            <span className="normal-text" onClick={() => {
              if (pageNumber < numPages)
                setPageNumber(pageNumber + 1);
            }}>
              &gt;</span>
          </p>
          : null}
      </div>

    </div>
  );

}

export default RecruitmentDetail;