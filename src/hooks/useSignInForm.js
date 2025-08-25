import { signInRequest } from "@/sagas/users/userSlice";
import { useFormik } from "formik";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export function useSignInForm() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const onSubmit = useCallback(
    (values) => {
      const payload = {
        ...values,
        username: (values.username || "").trim(),
      };
      dispatch(signInRequest(payload));
    },
    [dispatch]
  );

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
    initialValues,
    validationSchema,
    formik,
    loading,
    error,
    getStatus,
    getHelp,
  };
}
