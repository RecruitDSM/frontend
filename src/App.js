import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Company from './components/company/Company';
import Resume from './components/resume/Resume';
import Notice from './components/notice/Notice';
import Recruitment from './components/recruit/Recruitment';
import './App.css';
import CompanyEnrollForm from './components/enroll/CompanyEnrollForm';
import NoticeEnrollForm from './components/enroll/NoticeEnrollForm';
import AuthForm from './components/auth/AuthForm';
import {signInHelper, signUpHelper, signOutHelper, isSignInChecker } from './util/authHelper';
import SearchResult from './components/search/SearchResult';
import RecruitmentEnrollForm from './components/enroll/RecruitmentEnrollForm';
import EmployeeStatistic from "./components/statistic/EmployeeStatistic"

import { pdfjs } from "react-pdf";


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class App extends Component {

      state = {authenticated: isSignInChecker()};

      signIn = async (signInForm) => {
            if (await signInHelper(signInForm)) {
                  this.setState({authenticated:true});
            }else{
                  alert('다시 시도하여 주십시오.');
            }
      }

      signUp = async (signUpForm) =>  {
            if (await signUpHelper(signUpForm)){
                  alert("가입되었습니다.");
                  return true;
            } else{
                  alert('다시 시도하여 주십시오.');
                  return false;
            }
      };
      signOut = () => { 
            signOutHelper();
            this.setState({authenticated:false});
      }

      signInNeed = () =>{
            return <p>로그인이 필요한 서비스입니다.</p>
      }

      render() {
        return (
              <div className="App">
              <Router> 
               <NavBar authenticated={this.state.authenticated} signOut={this.signOut}/>

               {/* <Route path="/search"
                     component={(props) => true? <SearchResult {...props} authenticated={this.state.authenticated}/> : null}/>
        <Route path="/recruit"
               component={(props) => true? <Recruitment {...props} authorized={this.state.authorized}/> : null}/>
        <Route path="/company"
               component={(props) => true? <Company {...props} authorized={this.state.authorized}/> :null} />
        <Route path="/resume"
               component={() => true? <Resume/>:null} />
        <Route path="/notice"
               component={(props) => true ? <Notice {...props} authenticated = {this.state.authenticated} authorized={this.state.authorized}/> :null} />
        <Route path="/auth"
               component={() => <AuthForm authenticated={this.state.authenticated} signIn={this.signIn} signUp={this.signUp}/>}/> */}



            <Route exact path="/" 
                  component={EmployeeStatistic}/>
               <Route path="/search"
                     component={(props) => this.state.authenticated? <SearchResult {...props} /> : this.signInNeed()}/>
               <Route path="/recruit"
                     component={(props) => this.state.authenticated? <Recruitment {...props} /> : this.signInNeed()}/>
               <Route path="/company"
                     component={(props) => this.state.authenticated? <Company {...props} /> :this.signInNeed()} />
               <Route path="/resume"
                     component={() => this.state.authenticated? <Resume/>: this.signInNeed()} />
               <Route path="/notice"
                     component={(props) => this.state.authenticated? <Notice {...props} /> :this.signInNeed()} />
               <Route path="/auth"
                     component={() =>
                     <AuthForm authenticated={this.state.authenticated} signIn={this.signIn} signUp={this.signUp}/>}/>
               <Route path="/enroll/recruit" component={RecruitmentEnrollForm}/>
               <Route path="/enroll/company" component={CompanyEnrollForm}/>
               <Route path="/enroll/notice" component={NoticeEnrollForm}/> 
              </Router>
              </div>
              );
       }
}



export default App;
