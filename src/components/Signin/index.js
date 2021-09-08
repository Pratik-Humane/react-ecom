import React, { Component } from 'react'
import { siginWithGoogle, auth } from '../../firebase/util';
import Button from '../forms/Button';
import FormInput from '../forms/FormInput';
import './style.scss';
/**
* @author
* @function Signin
**/

const initialState = {
  email: '',
  password: '',
  errors: []
};

class Signin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email === '') {
      this.setState({
        errors: ['Email is required']
      })
      return;
    }
    if (password === '') {
      this.setState({
        errors: ['Password is required']
      })
      return;
    }
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        ...initialState
      })
    } catch (error) {
      this.setState({
        errors: ['Invalid Credentials']
      })
    }
  };
  
  
  render() {
    const { email, password, errors } = this.state;
    return(
      <div className="signin">
        <div className="wrap">
          <h2>Login</h2>
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
            <form onSubmit={this.handleSubmit}>
              <FormInput
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={this.handleChange}
              />
              <FormInput
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={this.handleChange}
              />
              <Button type="submit">Login</Button>
              <div className="socialSignin">
                <div className="row">
                  <Button onClick={siginWithGoogle}>Sign in with Google</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
  

 }

export default Signin