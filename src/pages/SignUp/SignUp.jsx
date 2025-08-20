import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import "./SignUp.scss";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createUserRequest } from "@/sagas/users/userSlice";
import { Alert } from "antd";
import { Input } from "antd";

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
  const { loading, error } = useSelector((state) => state.user);

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
      const { confirmPassword, ...userData } = values;
      dispatch(createUserRequest(userData));
      resetForm();
    },
  });

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
      <section>
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
            <input
              type="checkbox"
              {...formik.getFieldProps("terms")}
              checked={formik.values.terms}
            />
            <p>
              I agree to the <a href="#">Terms and Conditions</a>
            </p>
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
            {loading ? "Submitting..." : "Submit"}
          </Button>

          <div>
            <p>
              Already have an account? <a href="/sign-in">Sign In</a>
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}
