import React, { useEffect, useState } from "react";
import FormInput from "../forms/FormInput";
import Button from "../forms/Button";
import { Redirect, withRouter } from "react-router-dom";
import "./style.scss";
import AuthWrapper from "../AuthWrapper";
import { useSelector } from "react-redux";
import { resetAllAuthForms, signUpUser } from "../../redux/User/user.actions";
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
  const { currentUser, signUpSuccess, signUpError } = useSelector(
    (state) => state.user
  );
  const [errors, setErrors] = useState([]);

  const INITIAL_FORM_STATE = signUpInitialValues;
  const FORM_VALIDATION = validateSignUpForm();

  useEffect(() => {
    if (signUpSuccess) {
      dispatch(resetAllAuthForms());
      props.history.push("/");
    }
  }, [signUpSuccess]);

  useEffect(() => {
    if (Array.isArray(signUpError) && signUpError.length > 0) {
      setErrors(signUpError);
    }
  }, [signUpError]);

  if (localStorage.getItem("key") && !currentUser) {
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
              signUpUser({ displayName, email, password, confirmPassword })
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

export default withRouter(Signup);
