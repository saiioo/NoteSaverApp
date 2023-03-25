import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { setLogin } from '../store/slice';
import { useNavigate } from 'react-router-dom';
import './login.css'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.auth);
  const navigate = useNavigate();


  function handleSubmit(event) {
    event.preventDefault();
    fetch('https://superdupernotessaver.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => response.json())
      .then(({token, user}) => {
        dispatch(setLogin({
          user:user,
          token:token
        }))
        if (!token || !user) {
          toast.error('Invalid credentials');
        }else{
          toast.success('Logged In successfully');
          navigate('/home')
        }
      })
      .catch(error => console.error(error));
      console.log(userData)
  }
  return (
    <div className='loginformpage-main-container'>
    <form className='login-form' onSubmit={handleSubmit}>
      <h1 className='loginpage-heading'>
        Login
      </h1>
      <div className='lognpage-form-fields'>
      <label className='loginpage-labels'>
        Email:
      </label>
      <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      <label className='loginpage-labels'>
        Password:
      </label>
      <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </div>
      <div className='loginpage-login-button'>
      <button className='button-86' type="submit">Login</button>
      </div>
      <span className='loginpagespan'>Not registerd ?<Link to='/signin'>click here</Link></span>
    </form>
    </div>
  );
}

export default Login;




















  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log(email,password)
  //   try {
  //     const response = await fetch('http://localhost:3008/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });
  //     const data = await response.json();
  //     console.log(data)
  //      // handle response data as needed
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
