import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';

import { signUp } from '../../store/session';
import './SignUpForm.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()

  const onSignUp = async (e) => {
    e.preventDefault();
   
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }else{
          history.push('/home')
      }
    
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  
  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <form onSubmit={onSignUp} className='sign-up-form'>
      <h1 className='title'>Welcome Please Signup</h1>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>          
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          placeholder='Enter username'
          className='login-form-input'
        ></input>    
    
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          placeholder='Enter your email'
          className='login-form-input'
        ></input>
     
      
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          placeholder='Enter password'
          className='login-form-input'
        ></input>
  
        <input
          type='password'
          name='confirm_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          // required={true}
          placeholder='Confirm Password'
          className='login-form-input'
        ></input>
     
      <button type='submit' className='form-login-btn'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
