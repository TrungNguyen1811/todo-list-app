import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import "./SignUp.scss";
import { Button } from "antd";

export function SignUp() {
  const fields = [
    {
      name: "firstName",
      placeholder: "Enter First Name",
      icon: <UserOutlined />,
    },
    {
      name: "lastName",
      placeholder: "Enter Last Name",
      icon: <UserOutlined />,
    },
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
        <form className="form-sign-up">
          {fields.map(({ name, placeholder, type = "text", icon }) => (
            <div key={name}>
              <div className="input-group">
                {icon}
                <input type={type} placeholder={placeholder} />
              </div>
            </div>
          ))}

          <div className="checkbox-group">
            <input type="checkbox" />
            <p>
              I agree to the <a href="#">Terms and Conditions</a>
            </p>
          </div>

          <Button>Submit</Button>

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
