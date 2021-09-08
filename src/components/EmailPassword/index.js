import React, { Component } from 'react'
import AuthWrapper from '../AuthWrapper';
import { auth } from '../../firebase/util';
import { withRouter } from "react-router-dom";
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';

/**
* @author
* @class EmailPassword
**/

const initialState = {
  email: '',
  errors: []
};

class EmailPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = async evt => {
    evt.preventDefault();
    try {
      const { email } = this.state;
      const config = {
        url: 'http://localhost:3000/login'
      };
      await auth.sendPasswordResetEmail(email, config)
        .then(() => {
          this.props.history.push('/login');
        })
        .catch(() => {
          const err = ['Email not found. Please try again.'];
          this.setState({
            errors: err
          });
        })
    } catch (error) {
      //console.log(error);
    }
  }

  render() {
    const { email, errors } = this.state;
    const confAuthWraper = {
      headline:'Email Password'
    }

    return(
      <AuthWrapper {...confAuthWraper}>
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
              name="email"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={this.handleChange}
            />
            <Button type="submit">Email Password</Button>
          </form>
        </div>
      </AuthWrapper>
    )
   }
 }

export default withRouter(EmailPassword)