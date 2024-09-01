import React from 'react';
import '../../index.css';
import { USER_API,emailRegex } from '../../constants';
import showToast from '../../utils/toaster';
import axios from 'axios';
import { useFormik } from 'formik';




const ForgotPasswordPage: React.FC = () => {
    const formik = useFormik({
        initialValues:{
            email:""
        },
        validate:({email})=>{
            let errors: { email?: string } = {};
            if (!email.trim().length) errors.email = "Required*";
            else if (!emailRegex.test(email)) errors.email = "Invalid email address";
            return errors;
        },
        onSubmit:({email})=>{
            axios.post(USER_API + "/forgot-password",{email})
            .then(({ data }) => showToast(data.message, "success"))
            .catch(({ response }) => {
              showToast(response.data.message, "error");
            });
        }
    })

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Forgot Password</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              {...formik.getFieldProps("email")}
            />
             {!formik.errors.email ||
             (formik.touched.email && (
             <p className="text-red-500">{formik.errors.email}</p>
           ))}
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Send Reset Link
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/login" className="text-blue-500 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
