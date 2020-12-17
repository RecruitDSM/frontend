import React, { useState } from 'react';
import axios from "axios";

import { baseURL } from '../../data/api';
import EnrollForm from "./EnrollForm";
import { POSITIONS, REGIONS, STATUSES } from "./ENROLL_OPTIONS";

function RecruitmentEnrollForm() {
  const [recruitment, setRecruitment] = useState({ company_name: "", location: "", region: "서울", company_info: "", position: "웹 프론트엔드", position_info: "", status: "진행 중" });

  let uploadImgFileInput = null;
  let uploadDocumentFileInput = null;

  const handleValueChange = (e) => {
    setRecruitment({
      ...recruitment,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(recruitment).forEach(key => form.append(key, recruitment[key]));
    Array.from(uploadImgFileInput.files).forEach(file => form.append(file.name, file));
    form.append(uploadDocumentFileInput.files[0].name, uploadDocumentFileInput.files[0])

    axios.post(`${baseURL}/recruitment`, form, {
      headers: {
        'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`,
        'content-type': 'multipart/form-data'
      }
    }).then(response => {
      if (response.status === 201) {
        alert('등록되었습니다.');
      } else {
        alert('다시 시도하여 주십시오.');
      }
    }
    )
      .catch(error => { console.log(error) });

  }

  return (
    <div className="enroll-form-container" id="recruit-enroll-form-container">
      <h1>채용 등록</h1>
      <EnrollForm handleSubmit={handleSubmit}>
        <label htmlFor="recruit-name-input">기업명</label>
        <input value={recruitment.company_name} name="company_name" id="recruit-name-input" onChange={handleValueChange}></input>
        <label htmlFor="recruit-info-input">기업 소개</label>
        <textarea value={recruitment.company_info} name="company_info" id="recruit-info-input" onChange={handleValueChange}></textarea>
        <label htmlFor="position-input">직무</label>
        <select name="position" value={recruitment.position} id="position-input" onChange={handleValueChange}>
          {POSITIONS.map((position, index) => <option value={position} key={index}>{position}</option>)}
        </select>

        <label htmlFor="position-info-input">직무 소개</label>

        <textarea value={recruitment.position_info} name="position_info" id="position-info-input" onChange={handleValueChange}></textarea>

        <label htmlFor="recruit-location-input">주소</label>
        <input value={recruitment.location} name="location" id="recruit-location-input" onChange={handleValueChange}></input>

        <label htmlFor="recruit-region-input">지역</label>
        <select name="region" value={recruitment.region} id="recruit-region-input" onChange={handleValueChange}>
          {REGIONS.map((region, index) => <option value={region} key={index}>{region}</option>)}
        </select>

        <label htmlFor="recruit-status-input">상태</label>

        <select name="status" value={recruitment.status} id="recruit-status-input" onChange={handleValueChange} required>
          {STATUSES.map((status, index) => <option value={status} key={index} >{status}</option>)}
        </select>

        <label htmlFor="recruit-images-input">기업 이미지</label>
        <input type="file" multiple accept="image/*" name="img_files" ref={(ref) => uploadImgFileInput = ref} id="recruit-images-input" required />

        <label htmlFor="recruit-document-input">채용 의뢰서</label>
        <input type="file" accept=".pdf" name="document_file" ref={(ref) => uploadDocumentFileInput = ref} id="recruit-document-input" required />
      </EnrollForm>
    </div>
  );
};

export default RecruitmentEnrollForm;