import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {OWNER_API } from "../../constants";
import {  useFormik } from "formik";
import { getItemFromLocalStorage,removeItemFromLocalStorage } from "../../utils/Set&Get";
import showToast from "../../utils/toaster";


const OTP: React.FC = () => {
    const [seconds,setSeconds] = useState(60)
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues:{
            otp:""
        },
        onSubmit:({otp}) =>{
            const OwnerId = getItemFromLocalStorage("OwnerId")
            if(OwnerId){
                axios
                .post(OWNER_API + "/owner/verify-otp",{otp,OwnerId})
                .then(({data})=>{
                    showToast(data.message, "success");
                    removeItemFromLocalStorage("OwnerId");
                    setTimeout(() => navigate("/owner/login"), 1000);
                })
                .catch(({ response }) => {
                    showToast(response.data.message, "error");
                  });
            } else {
                showToast("something went wrong", "error");
                return navigate("/owner/login", { replace: true });
            }
        }
    });
    useEffect(() => {
        const timer = setInterval(() => {
          if (seconds > 0) {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }
        }, 1000);
    
        return () => clearInterval(timer);
      }, [seconds]);

      const resendCode = () => {
        setSeconds(60);
        const OwnerId = getItemFromLocalStorage("OwnerId");
        console.log(OwnerId,"ownerIDD");
        
        if (OwnerId) {
          axios
            .post(OWNER_API + "/owner/resend_otp", { OwnerId })
            .then(({ data }) => {
              showToast(data.message, "success");
            })
            .catch(({ response }) => {
              showToast(response.data.message, "error");
            });
        } else {
          showToast("something went wrong", "error");
          return navigate("/owner/login");
        }
      };
 

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
            <h1 className="text-3xl font-semibold text-center mb-6">
                Email Verification
            </h1>
            <p className="text-gray-600 text-center mb-8">
                Enter the verification code sent to your email
            </p>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div className="flex flex-col">
                    <label className="block text-gray-700 mb-2" htmlFor="otp">
                        Enter OTP
                    </label>
                    <input
                        className={`w-full py-3 px-4 border ${formik.touched.otp && formik.errors.otp ? 'border-red-500' : 'border-gray-200'} rounded-lg text-center focus:outline-none focus:ring-2 ${formik.touched.otp && formik.errors.otp ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
                        type="text"
                        id="otp"
                        maxLength={6}
                        placeholder="1234"
                        {...formik.getFieldProps('otp')}
                    />
                    {formik.touched.otp && formik.errors.otp && (
                        <p className="text-red-500 mt-1">{formik.errors.otp}</p>
                    )}
                </div>

                <button
                    className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                    type="submit"
                >
                    Verify OTP
                </button>
                <div className="text-center text-sm text-gray-500">
                    <p>Didn't receive the code?</p>
                    <button
                className="text-blue-500  hover:text-underline"
                onClick={resendCode}
                disabled={seconds !== 0}
              >
                Resend OTP
                <span className="font-medium">
                  {seconds !== 0 && ` (${seconds}s)`}
                </span>
              </button>
                </div>
            </form>
        </div>
    </div>
    )
}

export default OTP