import React from 'react'
import './login.css'
import io from 'socket.io-client'
import {BsInstagram} from 'react-icons/bs'
import {BsTwitter} from 'react-icons/bs'
import {BsLinkedin} from 'react-icons/bs'
import { Link, Navigate } from 'react-router-dom'
import { Socket } from 'socket.io-client'
import { useState,UseEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BiRegistered } from 'react-icons/bi'
import {useForm} from 'react-hook-form'
import { useContext } from 'react'
import {Appcontext} from './App'

const socket =io.connect("http://localhost:3001");

function Login() {
	const navigate=useNavigate()
	
	let {room, username, setCredentials}=useContext(Appcontext);
	const { register, handleSubmit, formState: { errors } } = useForm();
	const joinRoom=(data)=>{
		// setRoom(data.room)
		room = data.room
		username = data.username

		setCredentials(data.username, data.room)
		// setUsername(data.username)
		console.log(`${JSON.stringify(data)}\n|${room}|, |${username}|`);
		if(data.username !=="" && data.room !==""){
			
			socket.emit("join_room", data.room);
			navigate("/chat")

			
		}
	}
  return (
      <>
    <div className="login1">
	<div className="screen">
		<div className="screen__content">
            <h3>Sign in</h3>
			<form onSubmit={handleSubmit(joinRoom)} className="login" >
				<div className="login__field">
					<i className="login__icon fas fa-user"></i>
					<input type="text" className="login__input" placeholder="User name / Email"
					 {...register("username",{maxLength:20 ,minLength: 3, required: true})}/>
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					<input type="password" className="login__input" placeholder="Room ID" 
					{...register("room",{maxLength:20 ,minLength: 3, required: true})}/>
				</div>
				<button className="button login__submit">
                    {/* <Link to={'/chat'} id='link'> */}
					<span type='submit' className="button__text">Join Room</span>
                    {/* </Link> */}
					<i className="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
			<div className="social-login">
				<h3>log in via</h3>
				<div className="social-icons">
					<a href="#" className="social-login__icon fab fa-instagram"><BsInstagram/></a>
					<a href="#" className="social-login__icon fab fa-facebook"><BsTwitter/></a>
					<a href="#" className="social-login__icon fab fa-twitter"><BsLinkedin/></a>
				</div>
			</div>
		</div>
		<div className="screen__background">
			<span className="screen__background__shape screen__background__shape4"></span>
			<span className="screen__background__shape screen__background__shape3"></span>		
			<span className="screen__background__shape screen__background__shape2"></span>
			<span className="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>
</>
  );
}

export default Login