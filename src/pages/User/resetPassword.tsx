import React from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { validateResetPassword } from '../../utils/validation';
import axios from 'axios';
import { useFormik } from 'formik';
import showToast from '../../utils/toaster';
import { USER_API } from '../../constants';




const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
   const {id} = useParams()
   const formik = useFormik({
    initialValues:{
      password:"",
      confirmPassword:""
    },
    validate:validateResetPassword,
    onSubmit:({password})=>{
      axios.post(USER_API + `/reset-password/${id}`,{password})
      .then(({ data }) => {
        showToast(data.message, "success");
        navigate("/login");
      })
      .catch(({ response }) => showToast(response.data.message, "error"));
    }
   })



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Reset Password</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your new password"
              required
              {...formik.getFieldProps("password")}
            />
              {!formik.errors.password ||
              (formik.touched.password && (
              <p className="text-red-500">{formik.errors.password}</p>
              ))}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Confirm your new password"
              required
              {...formik.getFieldProps("confirmPassword")}
            />
              {!formik.errors.confirmPassword ||
              (formik.touched.confirmPassword && (
              <p className="text-red-500">{formik.errors.confirmPassword}</p>
              ))}
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Reset Password
          </button>
        </form>
        {/* <div className="mt-4 text-center">
          <a href="/login" className="text-blue-500 hover:underline">Back to Login</a>
        </div> */}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
