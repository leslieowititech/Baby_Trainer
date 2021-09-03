import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { useHistory } from 'react-router';
import './LoginForm.css'

const LoginForm = () => {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();    
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }else{

      history.push('/home')
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onLogin} className='login-form'>
      <h1 className='title'>Welcome Please login</h1>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
     
        
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
          className='login-form-input'
        />
  
   
      
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
          className='login-form-input'

        />
        <button type='submit' className='form-login-btn'>Login</button>
     
    </form>
  );
};

export default LoginForm;
