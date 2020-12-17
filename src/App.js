import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { pdfjs } from "react-pdf";

import NavBar from './components/NavBar';
import Company from './components/company/Company';
import Resume from './components/resume/Resume';
import Notice from './components/notice/Notice';
import Recruitment from './components/recruit/Recruitment';
import CompanyEnrollForm from './components/enroll/CompanyEnrollForm';
import NoticeEnrollForm from './components/enroll/NoticeEnrollForm';
import AuthForm from './components/auth/AuthForm';
import { signInHelper, signUpHelper, signOutHelper, isSignInChecker } from './util/authHelper';
import SearchResult from './components/search/SearchResult';
import RecruitmentEnrollForm from './components/enroll/RecruitmentEnrollForm';
import EmployeeStatistic from "./components/statistic/EmployeeStatistic"

import './App.css';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const App = () => {

  const [authenticated, setAuthenticated] = React.useState(isSignInChecker());

  const signIn = async (signInForm) => {
    if (await signInHelper(signInForm)) {
      setAuthenticated(true);
    } else {
      alert('다시 시도하여 주십시오.');
    }
  }

  const signUp = async (signUpForm) => {
    if (await signUpHelper(signUpForm)) {
      alert("가입되었습니다.");
      return true;
    } else {
      alert('다시 시도하여 주십시오.');
      return false;
    }
  };

  const signOut = () => {
    signOutHelper();
    setAuthenticated(false);
  }

  const signInNeed = () => {
    return <p>로그인이 필요한 서비스입니다.</p>
  }

  return (
    <div className="App">
      <Router>
        <NavBar authenticated={authenticated} signOut={signOut} />

        <Route exact path="/"
          component={EmployeeStatistic} />
        <Route path="/search"
          component={(props) => authenticated ? <SearchResult {...props} /> : signInNeed()} />
        <Route path="/recruit"
          component={(props) => authenticated ? <Recruitment {...props} /> : signInNeed()} />
        <Route path="/company"
          component={(props) => authenticated ? <Company {...props} /> : signInNeed()} />
        <Route path="/resume"
          component={() => authenticated ? <Resume /> : signInNeed()} />
        <Route path="/notice"
          component={(props) => authenticated ? <Notice {...props} /> : signInNeed()} />
        <Route path="/auth"
          component={() =>
            <AuthForm authenticated={authenticated} signIn={signIn} signUp={signUp} />} />
        <Route path="/enroll/recruit" component={RecruitmentEnrollForm} />
        <Route path="/enroll/company" component={CompanyEnrollForm} />
        <Route path="/enroll/notice" component={NoticeEnrollForm} />
      </Router>
    </div>
  );
}



export default App;
