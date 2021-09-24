import React, { useState, useEffect } from "react";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import AuthWrapper from "../../components/AuthWrapper";
import "./style.scss";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../redux/User/user.actions";
import { Formik, Form } from "formik";
import ErrorMessage from "../ErrorMessage";
import {
  signInInitialValues,
  validateSignInForm,
} from "../../validations/authFormValidation";
/**
 * @author
 * @function Signin
 **/

const Signin = (props) => {
  const { currentUser, userError } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const INITIAL_FORM_STATE = signInInitialValues;
  const FORM_VALIDATION = validateSignInForm();

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

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <AuthWrapper headline="Signin">
      <ErrorMessage errors={errors} />
      <div className="formWrap">
        <Formik
          initialValues={{ ...INITIAL_FORM_STATE }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values, { resetForm }) => {
            const { email, password } = values;
            dispatch(emailSignInStart({ email, password }));
            resetForm();
          }}
        >
          <Form>
            <FormInput type="email" name="email" placeholder="Email" />
            <FormInput type="password" name="password" placeholder="Password" />
            <Button type="submit">Login</Button>
            <div className="socialSignin">
              <div className="row">
                <Button type="button" onClick={handleGoogleSignIn}>
                  Sign in with Google
                </Button>
              </div>
            </div>
            <div className="link">
              <Link to="/recovery">Reset Password</Link>
            </div>
          </Form>
        </Formik>
      </div>
    </AuthWrapper>
  );
};

export default Signin;
