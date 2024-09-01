import React, { useState } from "react";
import '../../index.css';
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useAppDispatch } from "../../redux/store/store";
import { setUser } from "../../redux/slice/userSlice";
import { USER_API } from "../../constants";
import showToast from "../../utils/toaster";
import { setItemToLocalStorage } from "../../utils/Set&Get";
import { validateLogin } from "../../utils/validation";
import Logo from '../../assets/images/bg.png'
import axios from "axios";
import { auth, provider, signInWithPopup } from '../../firebase/firebase';


interface UserData {
  name: string | null;
  email: string | null;
  email_verified: boolean;
  isAuthenticated: boolean;
  role: string;
  id: string;
}


const LoginPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validate: validateLogin,
    onSubmit: ({ email, password }) => {
      setIsSubmitting(true);
      axios
        .post(USER_API + "/login", ({ email, password }))
        .then(({ data }) => {
          const access_token = data.accessToken;
          console.log(access_token, "accessToken recieved");
          const { name, role, _id } = data.user
          console.log(name, role, _id, "USer data recieved");

          setItemToLocalStorage("access_token", access_token);
          showToast(data.message, "success");
          dispatch(setUser({ isAuthenticated: true, name, role, id: _id }));
          navigate("/");
        })
        .catch(({ response }) => {
          setIsSubmitting(false);
          showToast(response?.data?.message, "error");
        });
    }
  })


  const handleGoogleSignup = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const userData = {
          name: user.displayName,
          email: user.email,
          email_verified: user.emailVerified,
          isAuthenticated: true,
          role: "user",
          id: user.uid
        };

        // dispatch(setUser(userData));
        console.log(userData, "userdata");
        return axios.post(`${USER_API}/google-signIn`, userData);
      })
      .then((response) => {
        const { message, user, accessToken  } = response.data;
        showToast(message, "success");
        localStorage.setItem("access_token",accessToken)
        dispatch(
          setUser({
            name: user.name,
            isAuthenticated: true,
            role: user.role,
            id: user._id,
          })
        )
        navigate("/");
      })

      .catch(({ response }) => showToast(response.data.message, "error"));
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-50">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-6/12 bg-gray-100 relative overflow-hidden">
          <img
            src={Logo}
            alt="Map"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="w-2/3 bg-white flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">User Login</h2>
            <form onSubmit={formik.handleSubmit} >
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none "
                  {...formik.getFieldProps("email")}
                />
                {formik.errors.email && formik.touched.email && (
                  <div className="text-sm text-red-500">{formik.errors.email}</div>
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
                  <div className="text-sm text-red-500">{formik.errors.password}</div>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Login"}
              </button>
            </form>

            <div className="mt-4 text-right">
              <a href="/forgot-password" className="text-sm text-black hover:underline">
                Forgot Password?
              </a>
            </div>


            <div className="flex items-center mt-4">
              <div className="border-b border-gray-300 flex-1 "></div>
              <div className="mx-3 text-sm text-gray-500 ">Or</div>
              <div className="border-b border-gray-300 flex-1"></div>
            </div>
            <div className="px-4 py-2 w-full  flex justify-center gap-2 ">

              <button
                type="button"
                onClick={handleGoogleSignup}
                className="text-white w-full bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center mb-2"
              >
                <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                </svg>
                Sign up with Google
              </button>

            </div>
            <p className="mt-4 text-center text-gray-600">
              Don't have an account? <a href="/signup" className="text-green-500 hover:underline">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

