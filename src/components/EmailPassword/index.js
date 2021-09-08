import React, { useState } from 'react'
import AuthWrapper from '../AuthWrapper';
import { auth } from '../../firebase/util';
import { withRouter } from "react-router-dom";
import FormInput from '../forms/FormInput';
import Button from '../forms/Button';

/**
* @author
* @class EmailPassword
**/

const EmailPassword = props => {
  
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);

  const resetForm = () => {
    setEmail('');
    setErrors([]);
  };

  const handleSubmit = async evt => {
    evt.preventDefault();
    if (email === '') {
      setErrors(['Email is required']);
      return;
    }
    try {
      const config = {
        url: 'http://localhost:3000/login'
      };
      await auth.sendPasswordResetEmail(email, config)
        .then(() => {
          resetForm();
          this.props.history.push('/login');
        })
        .catch(() => {
          setErrors(['Email not found. Please try again.']);
        })
    } catch (error) {
      //console.log(error);
    }
  }

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
          <form onSubmit={handleSubmit}>
            <FormInput
              name="email"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
            />
            <Button type="submit">Email Password</Button>
          </form>
        </div>
      </AuthWrapper>
    )
  }

export default withRouter(EmailPassword)