import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import "./SignUp.scss";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createUserRequest, resetUserState } from "@/sagas/users/userSlice";
import { Input, message, Button } from "antd";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Checkbox } from "antd";

const fields = [
  {
    name: "firstName",
    placeholder: "Enter First Name",
    icon: <UserOutlined />,
  },
  { name: "lastName", placeholder: "Enter Last Name", icon: <UserOutlined /> },
  { name: "username", placeholder: "Enter Username", icon: <UserOutlined /> },
  {
    name: "email",
    placeholder: "Enter Your Email",
    type: "email",
    icon: <MailOutlined />,
  },
  {
    name: "password",
    placeholder: "Enter Your Password",
    type: "password",
    icon: <LockOutlined />,
  },
  {
    name: "confirmPassword",
    placeholder: "Confirm Your Password",
    type: "password",
    icon: <LockOutlined />,
  },
];

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

export function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useSelector((state) => state.user);

  const [messageApi, contextHolder] = message.useMessage();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const { confirmPassword, terms, ...userData } = values;
      dispatch(createUserRequest(userData));
      resetForm();
    },
  });

  useEffect(() => {
    if (success) {
      messageApi.success("Create User Successfully!");

      setTimeout(() => {
        navigate("/sign-in");

        dispatch(resetUserState());
      }, 2000);
    }
    if (error) {
      messageApi.error(`Error: ${error}`);
    }
  }, [success, error, messageApi, navigate, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetUserState());
    };
  }, [dispatch]);

  const renderField = ({ name, placeholder, type = "text", icon }) => (
    <div key={name}>
      <div>
        <Input
          type={type}
          size={"large"}
          placeholder={placeholder}
          {...formik.getFieldProps(name)}
          prefix={icon}
        />
      </div>
      {formik.touched[name] && formik.errors[name] && (
        <span className="error-message">{formik.errors[name]}</span>
      )}
    </div>
  );

  return (
    <div className="sign-up-page container">
      {contextHolder}

      <section className="hidden">
        <img
          src="/src/assets/images/sign-up/sign-up.png"
          alt="Sign Up banner"
        />
      </section>
      <section className="form-section">
        <h1>Sign Up</h1>
        <form className="form-sign-up" onSubmit={formik.handleSubmit}>
          {fields.map(renderField)}

          <div className="checkbox-group">
            <Checkbox
              {...formik.getFieldProps("terms")}
              checked={formik.values.terms}
            >
              I agree to the <Link to="#">Terms and Conditions</Link>
            </Checkbox>
          </div>
          {formik.touched.terms && formik.errors.terms && (
            <span className="error-message">{formik.errors.terms}</span>
          )}

          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          <Button
            htmlType="submit"
            type="primary"
            disabled={loading}
            loading={loading}
          >
            {loading ? "Submitting..." : "Sign Up"}
          </Button>

          <div>
            Already have an account? <Link to="/sign-in">Sign In</Link>
          </div>
        </form>
      </section>
    </div>
  );
}
