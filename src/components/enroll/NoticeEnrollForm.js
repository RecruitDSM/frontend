import React, { useState } from 'react';
import axios from "axios";

import { baseURL } from '../../data/api';
import EnrollForm from "./EnrollForm";

function NoticeEnrollForm() {
  const [notice, setNotice] = useState({ title: "", content: "", author: "" });
  let uploadInput = null;

  const handleValueChange = (e) => {
    setNotice({
      ...notice,
      [e.target.name]: e.target.value
    });

  };
  const handleSubmit = (e) => {
    e.preventDefault();


    const form = new FormData();
    Object.keys(notice).forEach(key => form.append(key, notice[key]));
    Array.from(uploadInput.files).forEach(file => form.append(file.name, file));

    axios.post(`${baseURL}/notice`, form, {
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
    <div className="enroll-form-container" id="notice-enroll-form-container">
      <h1>공지 등록</h1>
      <EnrollForm handleSubmit={handleSubmit}>
        <label htmlFor="notice-title-input">제목</label>
        <input value={notice.title} name="title" id="notice-title-input" onChange={handleValueChange}></input>

        <label htmlFor="notice-content-input" >공지 내용</label>
        <textarea value={notice.content} name="content" id="notice-content-input" onChange={handleValueChange}></textarea>

        <label htmlFor="notice-author-input">작성자</label>
        <input value={notice.author} name="author" id="notice-author-input" onChange={handleValueChange}></input>

        <label htmlFor="notice-attachments-input">첨부 파일</label>
        <input type="file" name="files" ref={(ref) => { uploadInput = ref; }} multiple id="notice-attachments-input" />
      </EnrollForm>
    </div>
  );
};

export default NoticeEnrollForm;