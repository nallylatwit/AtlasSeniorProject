import axios from 'axios';
import React from 'react'
import {useRef, useContext, useState} from 'react'
import './register.css'
import {useNavigate} from "react-router";
import { AuthContext } from '../../context/AuthContext';

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useNavigate();
    const {dispatch} = useContext(AuthContext);
    const [user, setUser] = useState();

    const loginCall = async (userCredential, dispatch) => {
        dispatch({type: "LOGIN_START"});
        try {
            const res = await axios.post('/auth/login', userCredential);
            setUser(res.data);
            localStorage.setItem('user', res.data);
            dispatch({type: 'LOGIN_SUCCESS', payload: res.data})
        } catch (err) {
            dispatch({type: "LOGIN_FAILURE", payload: err});
        }
    }

    const handleClick = async (e) => {
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            passwordAgain.current.setCustomValidity("Passwords don't match.");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try{
                await axios.post('/auth/register', user);

                try {
                    loginCall({email: email.current.value, password:password.current.value}, dispatch);
                } catch (err) {
                    console.log(err);
                }
                //history.push("/login");
            } catch (err) {
                console.log(err);
            }
            
        }
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
                        placeholder='Username' 
                        required 
                        ref={username} 
                        className="loginInput" 
                    />
                    <input 
                        placeholder='Email' 
                        required 
                        ref={email} 
                        className="loginInput" 
                        type="email"
                    />
                    <input 
                        placeholder='Password' 
                        required ref={password} 
                        className="loginInput" 
                        type="password"
                        minLength="6"
                    />
                    <input 
                        placeholder='Password Again' 
                        required 
                        ref={passwordAgain} 
                        className="loginInput" 
                        type="password"
                    />
                    <button className="loginButton" type='submit'>Sign Up</button>
                    {/* <button className="loginRegisterButton">Login to Account</button> */}
                    
                </form>
            </div>
        </div>
    </div>
  )
}
