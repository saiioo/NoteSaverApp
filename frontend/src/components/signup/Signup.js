import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom'
import './signup.css'
import toast from 'react-hot-toast';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigae = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('https://superdupernotessaver.onrender.com/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data); 
      // handle response data as needed
      toast.success('Successfully registerd');
      navigae('/')
    } catch (error) {
      console.error(error);
      toast.error('user already exists');
    }
    setEmail("")
    setPassword('')
    setConfirmPassword('')
    setTermsAccepted(false)
  };

  return (
    <div className='signinpage-main-container'>
      <form className='signinpage-form' onSubmit={handleSubmit}>
        <h1 className='signingpage-heading'>SignIn</h1>
        <div className='signinpage-form-fields'>
        <label className="signin-page-labels">
          Email:
        </label>
        <input placeholder="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <label className="signin-page-labels">
          Password:
        </label>
        <input placeholder="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <label className="signin-page-labels">
          Confirm Password:
        </label>
        <input placeholder="confirm password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
        <label className="signin-page-labels">
          <input placeholder="" type="checkbox" checked={termsAccepted} onChange={(event) => setTermsAccepted(event.target.checked)} />
          I accept the terms and conditions.
        </label>
        </div>
        <div className='signinpage-siginin-button'>
          <button className='button-86' type="submit" disabled={!termsAccepted || !email || !password || !confirmPassword}>
            Sign up
          </button>
        </div>
        <span className='signinpage-span'>Already singedup?<Link to='/'>click here</Link></span>
      </form>
    </div>
  );
}

export default Signup;
