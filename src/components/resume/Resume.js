import React, { useEffect, useState } from 'react';
import { Document, Page,  pdfjs } from "react-pdf";
import axios from "axios";
import "./Resume.css"


function Resume(){

    const [resumePath, setResumePath] = useState('')
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const [showUploader, setShowUploader] = useState(false);

    let resumeUploader= null;

    const handleSubmit = (e) => {
        e.preventDefault();

        const file = resumeUploader.files[0];

        if (file){
            const form = new FormData();
            form.append(file.name, file);

            fetchData(form);
        }
    }

    const fetchData=(form) => {

        axios.patch("https://api.recruitdsm.ga/api/user", form, {
            headers: {
                'Authorization':`Bearer ${window.sessionStorage.getItem("token")}`,
                'content-type': 'multipart/form-data'
        }})
        .then(res => {
            setResumePath(res.data.result);
        })
        .catch( error => { console.log(error)});

        setShowUploader(false);
    }
    
    const onDocumentLoadSuccess = ({numPages}) => {
        setNumPages(numPages);
        setPageNumber(1);
    }

    useEffect(() => {fetchData(new FormData())},[resumePath]);

    return (
        <div className="content-container">

            <div className="content-header" id="resume-header">
                {/* <span>이력서</span> */}

                <button className="normal-button margin-left-auto" onClick={() => setShowUploader(true)}>수정</button>
            </div>

            {showUploader ?
                <div className="content-header">
                    <form id="resume-form" onSubmit={handleSubmit}>
                        <input type="file" ref={(ref) => {resumeUploader = ref}} accept=".pdf"/>
                        <button type="submit" className="normal-button">업로드</button>
                    </form>
                </div>
            : null}

        
            <div className="resume-preview">
                <Document file={resumePath}
                            onLoadSuccess={onDocumentLoadSuccess}
                            onLoadError={() => { setNumPages(null); setPageNumber(1);console.error();}}
                            noData={""}>
                <Page pageNumber={pageNumber} />
          
                </Document>
                {numPages? 
        
                    <p className="normal-text">
                        <span className="normal-text" onClick={() => pageNumber > 1 ? setPageNumber(pageNumber-1) : null}>
                            &lt;</span>
                        <span className="normal-text"> {pageNumber} / {numPages} </span>
                        <span className="normal-text" onClick={() => pageNumber < numPages ? setPageNumber(pageNumber+1) : null}>
                            &gt;</span>
                    </p>
                :null}
            </div>
      </div>
    );
}

export default Resume;