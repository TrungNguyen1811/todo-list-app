// hooks/useSignUpForm.js
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createUserRequest, resetUserState } from "@/sagas/users/userSlice";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password too short")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  terms: Yup.boolean().oneOf([true], "You must accept the Terms"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  terms: false,
};

export function useSignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const handleSignUpSuccess = () => {
    navigate("/sign-in");
    dispatch(resetUserState());
  };
  const onSubmit = (values, helpers) => {
    const userData = { ...values };
    delete userData.confirmPassword;
    delete userData.terms;
    console.log("Submitting user data:", userData);

    dispatch(
      createUserRequest({
        values: userData,
        callback: handleSignUpSuccess,
      })
    );

    helpers.resetForm();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit,
  });

  const getStatus = (name) =>
    formik.touched[name] && formik.errors[name] ? "error" : undefined;
  const getHelp = (name) =>
    formik.touched[name] && formik.errors[name]
      ? formik.errors[name]
      : undefined;

  return {
    formik,
    loading,
    error,
    getStatus,
    getHelp,
  };
}
