import React from 'react';

import { baseURL } from '../../data/api';
import "./Notice.css"

const NoticeDetail = (props) => {

  const [notice, setNotice] = React.useState({});

  React.useEffect(() => {
    const { id } = props.match.params;
    fetch(`${baseURL}/notice/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(res => {
        setNotice(res.notice)
      })
      .catch(error => { console.log(error) });
  }, []);

  return (
    <div>
      <div className="notice-header">
        <ul>
          <li className="float-left">{notice.title}</li>

          <li className="float-right" id="notice-header-date">{notice.date}</li>
          <li className="float-right">{notice.author}</li>
        </ul>
      </div>

      <div className="notice-content">
        {notice.content}
        {notice.attachment_paths && notice.attachment_paths.length > 0 ? <p>첨부파일</p> : null}
        {
          (notice.attachment_paths || []).map((attachment, index) =>
            <a target="_blank" href={attachment} key={index} className="attachment-link">{attachment.split("/").pop()}</a>
          )
        }
      </div>
    </div>
  );

}

export default NoticeDetail;