import React, { useEffect, useState } from "react";
import FormInput from "../forms/FormInput";
import Button from "../forms/Button";
import { Redirect, useHistory } from "react-router-dom";
import "./style.scss";
import AuthWrapper from "../AuthWrapper";
import { useSelector } from "react-redux";
import { signUpUserStart } from "../../redux/User/user.actions";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import ErrorMessage from "../ErrorMessage";
import {
  signUpInitialValues,
  validateSignUpForm,
} from "../../validations/authFormValidation";
/**
 * @author
 * @class Signup
 **/

const Signup = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, userError } = useSelector((state) => state.user);
  const [errors, setErrors] = useState([]);

  const INITIAL_FORM_STATE = signUpInitialValues;
  const FORM_VALIDATION = validateSignUpForm();

  useEffect(() => {
    if (currentUser) {
      history.push("/");
    }
  }, [currentUser]);

  useEffect(() => {
    if (Array.isArray(userError) && userError.length > 0) {
      setErrors(userError);
    }
  }, [userError]);

  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <AuthWrapper headline="SignUp">
      <ErrorMessage errors={errors} />
      <div className="formWrapper">
        <Formik
          initialValues={{ ...INITIAL_FORM_STATE }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values, { resetForm }) => {
            const { displayName, email, password, confirmPassword } = values;
            dispatch(
              signUpUserStart({ displayName, email, password, confirmPassword })
            );
            resetForm();
          }}
        >
          <Form>
            <FormInput name="displayName" type="text" placeholder="Full Name" />
            <FormInput name="email" type="email" placeholder="Email" />
            <FormInput name="password" type="password" placeholder="Password" />
            <FormInput
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
            />
            <Button type="submit">Register</Button>
          </Form>
        </Formik>
      </div>
    </AuthWrapper>
  );
};

export default Signup;
