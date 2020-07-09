import React, { useState } from "react";
import {Redirect} from "react-router-dom";
import "./AuthForm.css"

function AuthForm({authenticated, signIn, signUp}) {

    const [isSignInForm, setIsSignInForm] = useState(true);

    const initialSignInForm = {email:'', password:''};
    const initialSignUpForm = {grade:'1', class:'1', number:'1', name:'', email:'', password:''};

    const [signInForm, setSignInForm] = useState(initialSignInForm);
    const [signUpForm, setSignUpForm] = useState(initialSignUpForm);

    const updateSignInForm = e => {
        setSignInForm({
          ...signInForm,
          [e.target.name]: e.target.value
        });
    };

    const updateSignUpForm = e => {
        setSignUpForm({
            ...signUpForm,
            [e.target.name]: e.target.value
        });
    }

    if (authenticated) { return <Redirect to="/recruit" />};

    if(isSignInForm){

        return(
            <div className="auth-form-container" id="signin-form-container">
            <h1>로그인</h1>
                <form onSubmit={async(e) =>{
                    e.preventDefault(); 
                    await signIn(signInForm);
                    setSignInForm(initialSignInForm);}}
                    className="auth-form">
                   
                        <label htmlFor="signin-email-input">이메일</label>
                        <input type="email" name="email" id="signin-email-input" value={signInForm.email} onChange={updateSignInForm} required></input>
                    
                    
                        <label htmlFor="signin-password-input">비밀번호</label>
                        <input type="password" name="password" id="signin-password-input" value={signInForm.password} onChange={updateSignInForm} required></input>
                    
                    <button type="submit">로그인</button>
                </form>
                <p className="change-form" onClick={(e) => {
                    setSignInForm(initialSignInForm);
                    setIsSignInForm(false)}}>
                    회원가입으로
                </p>
            </div>
        );

    }else{
        return(
        <div className="auth-form-container" id="signup-form-container">
        <h1>회원가입</h1>
            <form onSubmit={async(e) => {
                e.preventDefault();
                if (await signUp(signUpForm)){
                    setIsSignInForm(true);
                }
                setSignUpForm(initialSignUpForm);}}
                className="auth-form">

                <div id="short-form-element-container">

                    <div className="short-form-element">
                        <label htmlFor="signup-grade-input">학년</label>
                        <input type="number" name="grade" id="signup-grade-input" value={signUpForm.grade} min={1} max={3}
                        onChange={updateSignUpForm}></input>
                    </div>
                
                    <div className="short-form-element">
                        <label htmlFor="signup-class-input">반</label>
                        <input type="number" name="class" id="signup-class-input" value={signUpForm.class} min={1} max={4} 
                        onChange={updateSignUpForm}></input>
                    </div>

                    <div className="short-form-element">
                        <label htmlFor="signup-number-input">번호</label>
                        <input type="number" name="number" id="signup-number-input" value={signUpForm.number} min={1} max={20}
                        onChange={updateSignUpForm}></input>
                    </div>
                </div>
                
                <label htmlFor="signup-name-input">이름</label>
                <input type="text" name="name" id="signup-name-input" value={signUpForm.name} onChange={updateSignUpForm}></input>
                
                <label htmlFor="signup-email-input">이메일</label>
                <input type="email" name="email" id="signup-email-input" value={signUpForm.email} onChange={updateSignUpForm}></input>
                
                <label htmlFor="signup-password-input">비밀번호</label>
                <input type="password" name="password" id="ignup-password-input" value={signUpForm.password} onChange={updateSignUpForm}></input>
                
                <button type="submit">회원가입</button>
            </form>
            <p className="change-form"  onClick={(e) => {
                setSignUpForm(initialSignUpForm);
                setIsSignInForm(true)}}>
                로그인으로
            </p>
        </div>);
    }
}


export default AuthForm;