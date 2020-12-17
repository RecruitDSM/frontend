import React, { useEffect, useState } from 'react';

import { baseURL } from '../../data/api';
import CompanyItem from '../company/CompanyItem';
import RecruitmentItem from '../recruit/RecruitmentItem';

function SearchResultList(props) {
  const { keyword } = props.match.params;

  useEffect(() => updateSearchResults(), [keyword]);

  const [searchResults, setSearchResults] = useState({
    recruitments: [],
    companys: []
  });


  function updateSearchResults() {
    fetch(`${baseURL}/search?keyword=${keyword}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(res => {
        setSearchResults({
          recruitments: res.recruitments,
          companys: res.companys
        });
      })
      .then(console.log(searchResults))
      .catch(error => { console.log(error) });
  }


  return (
    <div id="search-result-list" className="content-body">
      {(searchResults.recruitments || []).map((searchResult, index) =>
        <RecruitmentItem recruitment={searchResult} key={index} />)}

      {(searchResults.companys || []).map((searchResult, index) =>
        <CompanyItem company={searchResult} key={index} />)}
    </div>
  );
}
export default SearchResultList;

