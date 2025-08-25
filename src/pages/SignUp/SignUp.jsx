import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import "./SignUp.scss";
import { Input, Button, Checkbox, Form } from "antd";
import { Link } from "react-router-dom";
import { useSignUpForm } from "@/hooks/useSignUpForm";
import signUpBanner from "@/assets/images/sign-up/sign-up.png";

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

export function SignUp() {
  const { formik, loading, error, getHelp, getStatus } = useSignUpForm();

  return (
    <div className="sign-up-page container">
      <section className="hidden">
        <img src={signUpBanner} alt="Sign Up banner" />
      </section>
      <section className="form-section">
        <h1>Sign Up</h1>
        <Form onFinish={formik.handleSubmit}>
          {fields.map((field) => {
            const InputComponent =
              field.type === "password" ? Input.Password : Input;
            return (
              <Form.Item
                key={field.name}
                validateStatus={getStatus(field.name)}
                help={getHelp(field.name)}
              >
                <InputComponent
                  name={field.name}
                  type={field.type}
                  size="large"
                  placeholder={field.placeholder}
                  prefix={field.icon}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  status={getStatus(field.name)}
                />
              </Form.Item>
            );
          })}

          <Form.Item
            validateStatus={getStatus("terms")}
            help={getHelp("terms")}
          >
            <Checkbox
              name="terms"
              checked={formik.values.terms}
              onChange={(e) => formik.setFieldValue("terms", e.target.checked)}
              onBlur={formik.handleBlur}
            >
              I agree to the <Link to="#">Terms and Conditions</Link>
            </Checkbox>
          </Form.Item>

          {error && <Form.Item validateStatus="error" help={error}></Form.Item>}

          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              disabled={loading}
              loading={loading}
              block
              size="large"
            >
              {loading ? "Submitting..." : "Sign Up"}
            </Button>
          </Form.Item>

          <div>
            Already have an account? <Link to="/sign-in">Sign In</Link>
          </div>
        </Form>
      </section>
    </div>
  );
}
