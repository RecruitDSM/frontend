import React, {useState, useEffect}from "react";
import { Route, Link } from "react-router-dom";
import RecruitmentList from "./RecruitmentList";
import RecruitmentDetail from "./RecruitmentDetail";
import FilterModal from "../modal/FilterModal";
import "./Recruitment.css"


function Recruitment({ match }) {

  const [recruitments, setRecruitments] = useState([]);
  const [positions, setPositions] = useState(["전체"]);
  const [regions, setRegions] = useState(["전체"]);
  const [statuses, setStatuses] = useState(["전체"]);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }
 
  function closeModal(){
    setIsModalOpen(false);
  }

  function queryParams(data) {
    return Object.keys(data).map(key => {
      if (Array.isArray(data[key])) {
        return data[key].map((value) => `${key}=${value}`).join('&')
      }else{
        return data[key];
      }
    }).join('&')
  }

  const updateRecruitments = (selectedPositions, selectedRegions, selectedStatuses) => {

    fetch('https://api.recruitdsm.ga/api/recruitment?'+queryParams({position: selectedPositions, region: selectedRegions, status:selectedStatuses}) ,
      {
        method: 'GET',
        headers: {
          'Authorization':`Bearer ${window.sessionStorage.getItem("token")}`
      }})
      .then(res => res.json())
      .then(res => {
        setRecruitments([...res.recruitments]);

        setPositions(selectedPositions);
        setRegions(selectedRegions);
        setStatuses(selectedStatuses);

        setIsAuthorized(res.isAuthorized);
      })
      .catch( error => { console.log(error)});
  }

  useEffect(() => updateRecruitments(positions, regions, statuses),[]);
  

  return (
      <div className="content-container">

      <FilterModal isModalOpen={isModalOpen} closeModal={closeModal} updateRecruitments={updateRecruitments}
      positions={positions} regions={regions} statuses={statuses}/>

      <Route exact path={match.path} component={() => <RecruitmentList recruitments={recruitments}>
      <div id="filter-bar" className="content-header">
        <button className="reverse-button" onClick={() => openModal()}>직무
        {(positions|| []).map((position, index) => <span key={index}> {position} </span>)}
        </button>
        
        <button className="reverse-button" onClick={() => openModal()}>지역
        {(regions || []).map((region, index) =><span key={index}> {region} </span>)}
        </button>
        
        <button className="reverse-button" onClick={() => openModal()}>상태
        {(statuses || []).map((status, index) => <span key={index}> {status} </span>)}
        
        </button>

        <button className="normal-button" id="filter-button" onClick={() => openModal()}>필터</button>
        
        {isAuthorized? <Link to="/enroll/recruit" className="normal-button link-button">등록</Link> : null}
        </div>
      </RecruitmentList>}
      />
      <Route path={`${match.path}/:id`} component={RecruitmentDetail} />
      </div>
  );
}


export default Recruitment;