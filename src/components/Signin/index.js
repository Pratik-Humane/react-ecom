import React, { useState } from 'react'
import { siginWithGoogle, auth } from '../../firebase/util';
import Button from '../forms/Button';
import FormInput from '../forms/FormInput';
import AuthWrapper from '../../components/AuthWrapper';
import './style.scss';
import { Link, withRouter } from 'react-router-dom';
/**
* @author
* @function Signin
**/

const Signin = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  
  const resetForm = () => {
    setEmail('');
    setPassword('');
    setErrors([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (email === '') {
      setErrors(['Email is required']);
      return;
    }
    if (password === '') {
      setErrors(['Password is required']);
      return;
    }
    try {
      await auth.signInWithEmailAndPassword(email, password);
      resetForm();
      props.history.push('/');
    } catch (error) {
      setErrors(['Invalid Credentials']);
    }
  };

  const handleGoogleSignin = () => {
    const user = siginWithGoogle();
    console.log('user', user);
    //props.history.push('/');
  }
  
    return(
        <AuthWrapper headline="Signin">
          {errors.length>0 && (
            <ul className="errorUl">
              {errors.map((error,index)=>{
                return (
                  <li key={index}>{error}</li>
                )
              })}
            </ul>
          )}
          <div className="formWrap">
            <form onSubmit={handleSubmit}>
              <FormInput
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormInput
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit">Login</Button>
              <div className="socialSignin">
                <div className="row">
                  <Button type="button" onClick={handleGoogleSignin}>Sign in with Google</Button>
                </div>
              </div>
              <div className="link">
                <Link to="/recovery">Reset Password</Link>
              </div>
            </form>
          </div>
        </AuthWrapper>
    );
 }

export default withRouter(Signin);