import Modal from "./Modal";
import React, {useState} from "react";
import "./FilterModal.css"

import {POSITIONS, REGIONS, STATUSES} from "../enroll/ENROLL_OPTIONS"



function FilterModal({isModalOpen, closeModal, updateRecruitments, positions, regions, statuses}){

    const [selectedPositions, setSelectedPositions] = useState(positions? [...positions]:[]);
    const [selectedRegions, setSelectedRegions] = useState(regions? [...regions]:[] );
    const [selectedStatuses, setSelectedStatuses] = useState(statuses? [...statuses]:[]);
  
    function updateSelectedRegions(e) {
      if (e.target.checked){
          setSelectedRegions([...selectedRegions, e.target.name])
         
      } else {
          setSelectedRegions([...(selectedRegions.filter(function(value){return value != e.target.name}))])
          e.target.removeAttribute("checked");
          
      }
  }
  
  function updateSelectedPositions(e) {
      if (e.target.checked){
          setSelectedPositions([...selectedPositions, e.target.name]);  
          
      } else {
          setSelectedPositions([...(selectedPositions.filter(function(value){return value != e.target.name}))])
          e.target.removeAttribute("checked");
      }
  
  }
  
  
  function updateSelectedStatuses(e) {
      if (e.target.checked){
          setSelectedStatuses([...selectedStatuses, e.target.name]);  
      } else {
          setSelectedStatuses([...(selectedStatuses.filter(function(value){return value != e.target.name}))])
          e.target.removeAttribute("checked");
      }
  }
    return (
        <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
            <h1>필터</h1>
            <div id="filter-content">
                <p>직무</p>
                <div id="positions" className="filter-element-container">
                    <div className="filter-element">
                        <input type="checkbox" id="filter-position-all" name="전체" onChange={(e) => updateSelectedPositions(e)}
                            defaultChecked={selectedPositions.includes("전체")}/>
                        <label htmlFor="filter-position-all">전체</label>
                        </div> 
                    
                    {POSITIONS.map((position, index) =>
                        <div className="filter-element" key={index}>
                        <input type="checkbox" id={position} name={position} onChange={(e) => updateSelectedPositions(e)}
                            defaultChecked={selectedPositions.includes(position)}/>
                        <label htmlFor={position}>{position}</label>
                        </div>                       
                    )}
                </div>

                <p>지역</p>
                <div id="regions" className="filter-element-container">
                <div className="filter-element">
                        <input type="checkbox" id="filter-region-all" name="전체" onChange={(e) => updateSelectedRegions(e)}
                            defaultChecked={selectedRegions.includes("전체")}/>
                        <label htmlFor="filter-region-all">전체</label>
                        </div> 
                    
                    {REGIONS.map((region, index) =>
                        <div className="filter-element" key={index}>
                        <input type="checkbox" id={region} name={region} onChange={(e) => updateSelectedRegions(e)}
                            defaultChecked={selectedRegions.includes(region)} />
                        <label htmlFor={region}>{region}</label>
                        </div>
                    )}
                </div>


                <p>상태</p>
                <div id="statuses" className="filter-element-container">

                <div className="filter-element">
                        <input type="checkbox" id="filter-status-all" name="전체" onChange={(e) => updateSelectedStatuses(e)}
                            defaultChecked={selectedStatuses.includes("전체")}/>
                        <label htmlFor="filter-status-all">전체</label>
                        </div> 
                    
                    {STATUSES.map((status, index) => 
                        <div className="filter-element" key={index}>
                
                        <input type="checkbox" id={status} name={status} onChange={(e) => updateSelectedStatuses(e)} 
                            defaultChecked={selectedStatuses.includes(status)}/>
                        <label htmlFor={status}>{status}</label>
                        </div>
                    )}

                </div>

            </div>
            <button className="normal-button" onClick={() => {
                updateRecruitments([...selectedPositions],[...selectedRegions], [...selectedStatuses]); closeModal();}}>
                적용
                </button>
        </Modal>
   );
};

export default FilterModal;