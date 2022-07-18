import React from 'react'
import axios from 'axios';
import {useRef, useContext, useState} from 'react';
import './login.css'
//import {loginCall} from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext'
import {CircularProgress} from '@material-ui/core'
import { useEffect } from 'react';


export default function Login() {
const email = useRef();
const password = useRef();
const {isFetching, error, dispatch} = useContext(AuthContext);
const [user, setUser] = useState();

const loginCall = async (userCredential, dispatch) => {
    dispatch({type: "LOGIN_START"});
    try{
        const res = await axios.post('/auth/login', userCredential);
        console.log(res.data);
        setUser(res.data);
        localStorage.setItem('user', res.data);
        dispatch({type: "LOGIN_SUCCESS", payload: res.data});
    }catch(err){
        dispatch({type: "LOGIN_FAILURE", payload: err});
    }
}



const handleClick = (e) => {
    e.preventDefault();
    loginCall({email: email.current.value , password:password.current.value}, dispatch);
}

  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Atlas</h3>
                <span className="loginDesc">Accessibility Online</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input
                        placeholder='Email'
                        type='email'
                        required
                        className="loginInput"
                        ref={email}
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        className="loginInput"
                        required
                        minLength="6"
                        ref={password}
                    />
                    <button className="loginButton" type="submit" disabled={isFetching}>
                        {isFetching ? <CircularProgress color="white" size="20px" /> : "Login"}
                    </button>
                    <span className="loginForgot">Forgot Password?</span>
                    <button className="loginRegisterButton">
                        {isFetching ? <CircularProgress color="white" size="20px" /> : "Create Account"}
                    </button>
                    
                </form>
            </div>
        </div>
    </div>
  )
}
