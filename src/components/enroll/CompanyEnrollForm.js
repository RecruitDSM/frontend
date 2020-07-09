import  React,{ useState } from 'react';
import EnrollForm from "./EnrollForm";
import axios from "axios";
import { REGIONS} from "./ENROLL_OPTIONS";

function CompanyEnrollForm(){
    const [company, setCompany] = useState({company_name:"", location:"", company_info:"", region:"서울"});
    let uploadInput = null;
  
    const handleValueChange = (e) => {
      setCompany({
        ...company, 
        [e.target.name]: e.target.value
      });
  
    };

    const handleSubmit = (e) =>{
      e.preventDefault();

      const form = new FormData();
      Object.keys(company).forEach(key => form.append(key, company[key]));
      Array.from(uploadInput.files).forEach(file => form.append(file.name, file));
      
      axios.post("https://api.recruitdsm.ga/api/company", form, {
          headers: {
              'Authorization':`Bearer ${window.sessionStorage.getItem("token")}`,
              'content-type': 'multipart/form-data'
          }}).then(response => 
        { if (response.status == 201){
            alert('등록되었습니다.');
      }else{
        alert('다시 시도하여 주십시오.');
      }
    }
      )
      .catch( error => { console.log(error)});
    
  }
  
    return(
      <div className="enroll-form-container" id="company-enroll-form-container">
        <h1>기업 등록</h1>
      <EnrollForm handleSubmit={handleSubmit}>
      
        <label htmlFor="company-name-input">기업명</label>
        <input value={company.company_name} name="company_name" id="company-name-input" onChange={handleValueChange}></input>

        <label htmlFor="company-info-input">기업 소개</label>
        <textarea value={company.company_info} name="company_info" id="company-info-input" onChange={handleValueChange}></textarea>

      <label htmlFor="company-location-input">주소</label>
      <input value={company.location} name="location" id="company-location-input" onChange={handleValueChange}></input>
      
      <label htmlFor="company-region-input" >지역</label>
      <select name="region" value={company.region} id="company-region-input" onChange={handleValueChange}>
        {REGIONS.map((region, index) => <option value={region} key={index}>{region}</option>)}
      </select>

      <label htmlFor="company-images-input">기업 이미지</label>
      <input type="file" name="files" ref={(ref) => { uploadInput = ref; }} multiple id="company-images-input" ></input>
      </EnrollForm>
      </div>
    );
  };

  export default CompanyEnrollForm;