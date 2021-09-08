import React, { useState } from 'react';
import FormInput from '../forms/FormInput'; 
import Button from '../forms/Button'; 
import { auth, handleUserProfile } from '../../firebase/util';
import { withRouter } from "react-router-dom";
import './style.scss';
import AuthWrapper from '../AuthWrapper';
/**
* @author
* @class Signup
**/

const Signup = props => {

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const resetForm = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (displayName === '') {
      setErrors(['Full Name is required']);
      return;
    }
    if (email === '') {
      setErrors(['Email is required']);
      return;
    }
    if (password !== confirmPassword) {
      setErrors(['Password Don\'t match']);
      return;
    }
    try {

      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      await handleUserProfile(user, { displayName });
      resetForm();
      props.history.push('/');

    } catch (error) {
      setErrors(['Something went wrong. Please try again.']);
    }
  }

    return(
        <AuthWrapper headline="SignUp">
            {errors.length>0 && (
              <ul className="errorUl">
                {errors.map((error,index)=>{
                  return (
                    <li key={index}>{error}</li>
                  )
                })}
              </ul>
            )}
            <div className="formWrapper">
              <form onSubmit={handleFormSubmit}>
                <FormInput
                  name="displayName"
                  type="text"
                  value={displayName}
                  placeholder="Full Name"
                  onChange={e=>setDisplayName(e.target.value)}
                />
                <FormInput
                  name="email"
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={e=>setEmail(e.target.value)}
                />
                <FormInput
                  name="password"
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={e=>setPassword(e.target.value)}
                />
                <FormInput
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={e=>setConfirmPassword(e.target.value)}
                />
                <Button type="submit">Register</Button>
              </form>
            </div>
          </AuthWrapper>
      )
    }



export default withRouter(Signup);