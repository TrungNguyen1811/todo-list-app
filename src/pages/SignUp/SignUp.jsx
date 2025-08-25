import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import './SignUp.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { createUserRequest, resetUserState } from '@/sagas/users/userSlice'
import { Input, Button, Checkbox, Form } from 'antd'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const fields = [
  {
    name: 'firstName',
    placeholder: 'Enter First Name',
    icon: <UserOutlined />,
  },
  { name: 'lastName', placeholder: 'Enter Last Name', icon: <UserOutlined /> },
  { name: 'username', placeholder: 'Enter Username', icon: <UserOutlined /> },
  {
    name: 'email',
    placeholder: 'Enter Your Email',
    type: 'email',
    icon: <MailOutlined />,
  },
  {
    name: 'password',
    placeholder: 'Enter Your Password',
    type: 'password',
    icon: <LockOutlined />,
  },
  {
    name: 'confirmPassword',
    placeholder: 'Confirm Your Password',
    type: 'password',
    icon: <LockOutlined />,
  },
]

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password too short')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  terms: Yup.boolean().oneOf([true], 'You must accept the Terms'),
})

const initialValues = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false,
}

export function SignUp() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.user)

  const handelSignUpSuccess = () => {
    navigate('/sign-in')
    dispatch(resetUserState())
  }

  const handleSubmitSignUp = (values, { resetForm }) => {
    const userData = { ...values }

    delete userData.confirmPassword
    delete userData.terms

    dispatch(
      createUserRequest({
        values: userData,
        callback: () => handelSignUpSuccess(),
      })
    )
    resetForm()
  }

  return (
    <div className="sign-up-page container">
      <section className="hidden">
        <img
          src="/src/assets/images/sign-up/sign-up.png"
          alt="Sign Up banner"
        />
      </section>
      <section className="form-section">
        <h1>Sign Up</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmitSignUp}
        >
          {({
            errors,
            touched,
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            setFieldValue,
          }) => (
            <Form onFinish={handleSubmit}>
              {fields.map((field) => {
                const InputComponent =
                  field.type === 'password' ? Input.Password : Input

                return (
                  <Form.Item
                    key={field.name}
                    validateStatus={
                      touched[field.name] && errors[field.name] ? 'error' : ''
                    }
                    help={
                      touched[field.name] && errors[field.name]
                        ? errors[field.name]
                        : ''
                    }
                    style={{ marginBottom: '16px' }}
                  >
                    <InputComponent
                      name={field.name}
                      type={field.type}
                      size="large"
                      placeholder={field.placeholder}
                      prefix={field.icon}
                      value={values[field.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      status={
                        touched[field.name] && errors[field.name] ? 'error' : ''
                      }
                    />
                  </Form.Item>
                )
              })}

              <Form.Item
                validateStatus={touched.terms && errors.terms ? 'error' : ''}
                help={touched.terms && errors.terms ? errors.terms : ''}
                style={{ marginBottom: '16px' }}
              >
                <Checkbox
                  name="terms"
                  checked={values.terms}
                  onChange={(e) => setFieldValue('terms', e.target.checked)}
                  onBlur={handleBlur}
                >
                  I agree to the <Link to="#">Terms and Conditions</Link>
                </Checkbox>
              </Form.Item>

              {error && (
                <div
                  className="error-message"
                  style={{ color: '#ff4d4f', marginBottom: '16px' }}
                >
                  <p>{error}</p>
                </div>
              )}

              <Form.Item style={{ marginBottom: '16px' }}>
                <Button
                  htmlType="submit"
                  type="primary"
                  disabled={loading}
                  loading={loading}
                  block
                  size="large"
                >
                  {loading ? 'Submitting...' : 'Sign Up'}
                </Button>
              </Form.Item>

              <div>
                Already have an account? <Link to="/sign-in">Sign In</Link>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </div>
  )
}
