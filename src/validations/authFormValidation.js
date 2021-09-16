import * as Yup from "yup";

export const signUpInitialValues = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const validateSignUpForm = () => {
  return Yup.object().shape({
    displayName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "password and confirm password need to be the same"
      ),
    }),
  });
};

export const signInInitialValues = {
  email: "",
  password: "",
};

export const validateSignInForm = () => {
  return Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
};

export const resetPasswordFormInitialValues = {
  email: "",
};

export const validateResetPasswordForm = () => {
  return Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });
};
