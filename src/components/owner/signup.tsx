import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { OWNER_API} from "../../constants";
import { validateSignUp } from "../../utils/validation";
import showToast from "../../utils/toaster";
import { setItemToLocalStorage } from "../../utils/Set&Get";
import Map from '../../assets/images/bg.png'

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validate: validateSignUp,
    onSubmit: async ({ name, email, phoneNumber, password }) => {
      setIsSubmitting(true);
      try {
        const { data } = await axios.post(OWNER_API + "/register", {
          name,
          email,
          phoneNumber,
          password,
        });
        const { message,newOwner } = data;
        console.log(message,newOwner._id,"ownerssss");
        
        showToast(message, "success");
        setItemToLocalStorage("OwnerId", newOwner._id);
        navigate("/owner/otp");
      } catch (error: any) {
        const { message } = error.response.data;
        setIsSubmitting(false);
        showToast(message, "error");
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-50">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-6/12 bg-gray-100 relative overflow-hidden">
          <img
            src={Map}
            alt="Map"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="w-2/3 bg-white flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Owner Sign Up</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Enter your Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none "
                  {...formik.getFieldProps("name")}
                />
                {formik.errors.name && formik.touched.name && (
                  <div className="text-red-500">{formik.errors.name}</div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="text"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none "
                  {...formik.getFieldProps("email")}
                />
                {formik.errors.email && formik.touched.email && (
                  <div className="text-red-500">{formik.errors.email}</div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                  {...formik.getFieldProps("phoneNumber")}
                />
                {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                  <div className="text-red-500">{formik.errors.phoneNumber}</div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none "
                  {...formik.getFieldProps("password")}
                />
                {formik.errors.password && formik.touched.password && (
                  <div className="text-red-500">{formik.errors.password}</div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none "
                  {...formik.getFieldProps("confirmPassword")}
                />
                {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                  <div className="text-red-500">{formik.errors.confirmPassword}</div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Sign Up"}
              </button>
            </form>
            <p className="mt-4 text-center text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-green-500 hover:underline">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;


