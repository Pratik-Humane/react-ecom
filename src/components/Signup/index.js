import React, { Component } from 'react';
import FormInput from '../forms/FormInput'; 
import Button from '../forms/Button'; 
import { auth, handleUserProfile } from '../../firebase/util';

import './style.scss';
/**
* @author
* @class Signup
**/

const initialState = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors:[]
};

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    }
    this.handleChange = this.handleChange.bind(this);
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleFormSubmit = async (e) => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    if (displayName === '') {
      const err = ['Full Name is required'];
      this.setState({
        errors: err
      })
      return;
    }
    if (email === '') {
      const err = ['Email is required'];
      this.setState({
        errors: err
      })
      return;
    }
    if (password !== confirmPassword) {
      const err = ['Password Don\'t match'];
      this.setState({
        errors: err
      })
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      await handleUserProfile(user, { displayName });
      this.setState({
        ...initialState
      });
    } catch (error) {
      //console.log(error);
    }
  }


 render() {
   const { displayName, email, password, confirmPassword, errors } = this.state;

    return(
        <div className="signup">
          <div className="wrap">
            <h2>Signup</h2>
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
              <form onSubmit={this.handleFormSubmit}>
                <FormInput
                  name="displayName"
                  type="text"
                  value={displayName}
                  placeholder="Full Name"
                  onChange={this.handleChange}
                />
                <FormInput
                  name="email"
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={this.handleChange}
                />
                <FormInput
                  name="password"
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={this.handleChange}
                />
                <FormInput
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={this.handleChange}
                />
                <Button type="submit">Register</Button>
              </form>
            </div>
          </div>
        </div>
      )
    }
 }


export default Signup