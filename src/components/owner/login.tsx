import React,{useState} from "react";
import { useNavigate } from 'react-router-dom';
import '../../index.css';
import Map from '../../assets/images/bg.png'
import axios from "axios";
import { OWNER_API } from "../../constants";
import { validateLogin } from "../../utils/validation";
import { setItemToLocalStorage } from "../../utils/Set&Get";
import { useAppDispatch } from "../../redux/store/store";
import { useFormik } from "formik";
import showToast from "../../utils/toaster";
import { setOwner } from "../../redux/slice/ownerSlice";
import { auth,provider,signInWithPopup} from '../../firebase/firebase';

interface ownerData {
  name:string | null;
  email:string | null;
  email_verified:boolean | null;
  isAuthenticated: boolean;
  role:String | null;
  id:string | null
}


const OwnerLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues:{
      email:"",
      password:""
    },
    validate:validateLogin,
    onSubmit:async ({email,password})=>{
      setIsSubmitting(true)
      axios
      .post(OWNER_API+"/login",({email,password}))
      .then(({data})=>{
        console.log(data,"owner login details");
        const access_token = data.accessToken;
        console.log(access_token,"owner - accesstoken");
        const {name,role,_id} = data.owner
        console.log(name,role,_id," data recieved");
        setItemToLocalStorage("access_token", access_token);
        showToast(data.message, "success");
        dispatch(setOwner({isAuthenticated:true,name,role,id:_id}));
        navigate("/owner/homepage")
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
        const owner = result.user;
        const access_token = owner.getIdToken()
        console.log(access_token,"accessToken is .............");
        
        console.log('Google owner', owner);
        setItemToLocalStorage("accessToken", access_token)
        const ownerData = {
          name: owner.displayName,
          email: owner.email,
          email_verified: owner.emailVerified,
          isAuthenticated: true,
          role: "owner",
          id: owner.uid
        };

        return axios.post(`${OWNER_API}/google-signIn`, ownerData);
      })
      .then((response) => {
        const { message,owner,accessToken } = response.data;
        showToast(message, "success");

        localStorage.setItem("access_token",accessToken)
        dispatch(
          setOwner({
            name:owner.name,
            isAuthenticated: true,
            role: owner.role,
            id: owner._id,
          })
        )
        showToast(message, "success");
        navigate("/owner/homepage");
      })

      .catch(({ response }) => showToast(response.data.message, "error"));
  };

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
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none "
                  {...formik.getFieldProps("email")}
                />
                {formik.errors.email && formik.touched.email && (
                  <div className="text-red-500">{formik.errors.email}</div>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none "
                  {...formik.getFieldProps("password")}
                />
                {formik.errors.password && formik.touched.password && (
                  <div className="text-red-500">{formik.errors.password}</div>
                )}
              </div>
              <button 
                type="submit" 
                id="password"
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </form>
            <div className="flex items-center mt-4">
              <div className="border-b border-gray-300 flex-1 "></div>
              <div className="mx-3 text-sm text-gray-500 ">Or</div>
              <div className="border-b border-gray-300 flex-1"></div>
            </div>
            <div className="px-4 py-2 w-full flex justify-center gap-2">
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
              Don't have an account? <a href="/owner/signup" className="text-green-500 hover:underline">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default OwnerLoginPage;
