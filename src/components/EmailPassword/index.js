import React, { useEffect, useState } from "react";
import AuthWrapper from "../AuthWrapper";
import { Redirect, withRouter } from "react-router-dom";
import FormInput from "../forms/FormInput";
import Button from "../forms/Button";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPasswordFormInitialValues,
  validateResetPasswordForm,
} from "../../validations/authFormValidation";
import { resetUserPassword } from "../../redux/User/user.actions";
import ErrorMessage from "../ErrorMessage";

/**
 * @author
 * @class EmailPassword
 **/

const EmailPassword = (props) => {
  const { currentUser, resetPassError, resetPassSuccess } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const INITIAL_FORM_STATE = resetPasswordFormInitialValues;
  const FORM_VALIDATION = validateResetPasswordForm();

  useEffect(() => {
    if (resetPassSuccess) {
      props.history.push("/login");
    }
  }, [resetPassSuccess]);

  useEffect(() => {
    if (Array.isArray(resetPassError) && resetPassError.length > 0) {
      setErrors(resetPassError);
    }
  }, [resetPassError]);

  const confAuthWraper = {
    headline: "Email Password",
  };

  if (!currentUser && localStorage.getItem("key")) {
    return <Redirect to="/" />;
  }

  return (
    <AuthWrapper {...confAuthWraper}>
      <ErrorMessage errors={errors} />
      <div className="formWrap">
        <Formik
          initialValues={{ ...INITIAL_FORM_STATE }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values, { resetForm }) => {
            const { email } = values;
            dispatch(resetUserPassword({ email }));
            resetForm();
          }}
        >
          <Form>
            <FormInput name="email" type="email" placeholder="Enter Email" />
            <Button type="submit">Email Password</Button>
          </Form>
        </Formik>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(EmailPassword);
