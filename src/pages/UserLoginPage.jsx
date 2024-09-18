import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import UserLogin from '../services/User/UserLogin';
import { useDispatch } from 'react-redux';
import { addUserDetalis } from '../reduxStore/userSlice';

export default function UserLoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const dispatch=useDispatch()

  return (
    <div className="h-screen flex justify-center items-center bg-gray-50">
      <div className="flex flex-col md:flex-row justify-center md:justify-between md:w-4/5 lg:w-2/5 items-center bg-white shadow-lg h-auto md:h-auto rounded-xl overflow-hidden">
        <div className="w-full h-auto flex flex-col justify-center p-10">
          <h1 className="font-bold text-3xl md:text-4xl text-center mb-6 text-gray-900">
            Login to Your Account
          </h1>

          <Formik
            initialValues={{
              userEmail: '',
              password: '',
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
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const response = await UserLogin(values);
                console.log(response)
                if (response.status === 404) {
                  setError(response.data.message);
                } else if (response.status === 200) {
                    dispatch(addUserDetalis({id:response.data.user._id,name:response.data.user.userName}))
                  navigate('/');
                }
              } catch (err) {
                setError('An unexpected error occurred');
              }
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="w-full ">
                <div className="mb-4">
                  <Field
                    type="email"
                    name="userEmail"
                    placeholder="Email"
                    className="w-4/5 lg:ml-16 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="userEmail"
                    component="div"
                    className="text-red-500 text-sm lg:ml-16 mt-1"
                  />
                </div>

                <div className="mb-4">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-4/5 lg:ml-16 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm lg:ml-16 mt-1"
                  />
                </div>

                {error && (
                  <div className="w-full mb-4 text-center text-red-600 font-bold">
                    {error}
                  </div>
                )}

                <div className="w-4/5 flex justify-center mb-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-1/4 lg:ml-16 py-3 text-white font-semibold bg-blue-600 rounded-lg transition-colors hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 ${
                      isSubmitting
                        ? 'opacity-50 cursor-not-allowed'
                        : 'opacity-100'
                    }`}
                  >
                    {isSubmitting ? 'Logging In...' : 'Login'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="flex justify-center mt-4">
            <h2 className="text-lg">
              Don't have an account?{' '}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => navigate('/signup')}
              >
                Sign up
              </span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
