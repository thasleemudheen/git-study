import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserSignup from '../services/User/UserSignup';
import { useNavigate } from 'react-router-dom';

export default function UserSignupPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col md:flex-row justify-evenly md:w-11/12 lg:w-2/5 items-center bg-white shadow-lg h-auto md:h-5/6 rounded-lg overflow-hidden">
        <div className="w-full lg:w-4/5 md:w-2/3 h-auto md:h-full flex flex-col justify-between p-8">
          <div>
            <h1 className="font-bold text-4xl mb-8 text-gray-800 text-center">
              Create an Account
            </h1>
            <Formik
              initialValues={{
                userName: '',
                userEmail: '',
                password: '',
                confirmPassword: '',
                userPhone: '',
              }}
              validate={(values) => {
                const errors = {};
                if (!values.userEmail) {
                  errors.userEmail = 'Email is required';
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.userEmail)
                ) {
                  errors.userEmail = 'Invalid email address';
                }
                if (!values.password) {
                  errors.password = 'Password is required';
                } else if (!/^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(values.password)) {
                  errors.password = 'Password must be 6-16 characters long';
                }
                if (!values.confirmPassword) {
                  errors.confirmPassword = 'Confirm password is required';
                } else if (values.confirmPassword !== values.password) {
                  errors.confirmPassword = 'Passwords do not match';
                }
                if (!values.userName) {
                  errors.userName = 'Name is required';
                } else if (!/^[a-zA-Z\s]{2,50}$/.test(values.userName)) {
                  errors.userName = 'Name must be 2-50 characters';
                }
                if (!values.userPhone) {
                  errors.userPhone = 'Phone number is required';
                } else if (!/^\d{10}$/.test(values.userPhone)) {
                  errors.userPhone = 'Phone number must be 10 digits';
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const response = await UserSignup(values);
                  console.log('response from the backend',response)
                  if (response.status === 404) {
                    setError(response.data.message);
                  } else if (response.status === 200) {
                    navigate('/login');
                  }
                } catch (err) {
                  setError('An unexpected error occurred');
                }
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="w-full flex flex-col items-center">
                  <div className="w-full mb-4">
                    <Field
                      type="text"
                      name="userName"
                      placeholder="Your name"
                      className="w-full p-3 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="userName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-full mb-4">
                    <Field
                      type="email"
                      name="userEmail"
                      placeholder="Email"
                      className="w-full p-3 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="userEmail"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-full mb-4">
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="w-full p-3 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-full mb-4">
                    <Field
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      className="w-full p-3 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="w-full mb-4">
                    <Field
                      type="text"
                      name="userPhone"
                      placeholder="Phone number"
                      className="w-full p-3 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="userPhone"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Display global error message */}
                  {error && (
                    <div className="w-full mb-4 text-center text-red-600 font-bold">
                      {error}
                    </div>
                  )}

                  <div className="w-full flex justify-center mb-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`lg:w-1/3 w-2/3 h-12 md:w-3/5 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-800 transition-colors flex justify-center items-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                        }`}
                    >
                      {isSubmitting ? 'Creating...' : 'Create Account'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="flex flex-col items-center mt-4">
            <h2 className="text-lg">
              Already have an account?{' '}
              <span className="text-blue-500 cursor-pointer hover:underline">
                Login
              </span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
