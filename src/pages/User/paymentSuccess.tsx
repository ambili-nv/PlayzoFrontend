import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Navbar from "../../components/user/Header/Navbar";
import axiosInstance from "../../utils/axiosInstance";
import { USER_API } from "../../constants";
import PaymentMessage from "../../components/user/paymentMsg";
import { loadStripe } from '@stripe/stripe-js';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const updatePaymentStatus = async () => {
      const status = searchParams.get("success");
      const paymentStatus = status === "true" ? "paid" : "failed";
      setIsSuccess(status === "true");

      try {
        await axiosInstance.patch(`${USER_API}/payment/status/${id}`, { paymentStatus });
        console.log("Payment status updated successfully.");
      } catch (error) {
        console.error("Error updating payment status:", error);
        setError('Failed to update payment status');
      }
    };

    updatePaymentStatus();
  }, [searchParams, id]);

  const handleRetryPayment = async () => {
    try {
      const response = await axiosInstance.post(`${USER_API}/retry-payment`, { bookingId: id });
      const { sessionId } = response.data;

      // Redirect to Stripe checkout
      const stripe = await loadStripe('pk_test_51PaimnG8EaTCVCc3V37VRPWK4CHnrsjvdwOmKNyu6SZYIUJGBzPSJIuROfma8eqnXpQfQTOmBonXaPtiCUZBCFkx00OxC7tApr');
      //@ts-ignore
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        setError('Failed to initiate payment');
      }
    } catch (error) {
      console.error("Error retrying payment:", error);
      setError('Error retrying payment');
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-10 bg-white rounded-lg shadow-lg">
          {/* //@ts-ignore */}
          <PaymentMessage isSuccess={isSuccess} error={error} />
          {!isSuccess && !error && (
            <div className="mt-4 text-center">
              <button
                onClick={handleRetryPayment}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
              >
                Retry Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;




















// // // import React, { useEffect } from "react";
// // // import { useParams, useSearchParams } from "react-router-dom";
// // // import Navbar from "../../components/user/Header/Navbar";
// // // import axiosInstance from "../../utils/axiosInstance";
// // // import { USER_API } from "../../constants";
// // // import PaymentMessage from "../../components/user/paymentMsg";


// // // const PaymentSuccess = () => {
// // //   const [searchParams] = useSearchParams();
// // //   const { id } = useParams();

// // //   const status = searchParams.get("success");
// // //   const isSuccess = status === "true";

// // //   useEffect(() => {
// // //     const updatePaymentStatus = async () => {
// // //       if (status) {
// // //         const paymentStatus = isSuccess ? "paid" : "failed";
// // //         try {
// // //           await axiosInstance.patch(`${USER_API}/payment/status/${id}`, { paymentStatus });
// // //           console.log("Payment status updated successfully.");
// // //         } catch (error) {
// // //           console.error("Error updating payment status:", error);
// // //           // Handle error: show message to user or retry logic
// // //         }
// // //       }
// // //     };

// // //     updatePaymentStatus();
// // //   }, [status, isSuccess, id]);

// // //   return (
// // //     <>
// // //       <Navbar />
// // //       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
// // //         <div className="p-10 bg-white rounded-lg shadow-lg">
// // //           <PaymentMessage isSuccess={isSuccess} />
// // //         </div>
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default PaymentSuccess;



// import React, { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import Navbar from "../../components/user/Header/Navbar";
// import axiosInstance from "../../utils/axiosInstance";
// import { USER_API } from "../../constants";
// import PaymentMessage from "../../components/user/paymentMsg";
// import { loadStripe } from '@stripe/stripe-js';

// const PaymentSuccess = () => {
//   const [searchParams] = useSearchParams();
//   const { id } = useParams();
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const updatePaymentStatus = async () => {
//       const status = searchParams.get("success");
//       const paymentStatus = status === "true" ? "paid" : "failed";
//       setIsSuccess(status === "true");

//       try {
//         await axiosInstance.patch(`${USER_API}/payment/status/${id}`, { paymentStatus });
//         console.log("Payment status updated successfully.");
//       } catch (error) {
//         console.error("Error updating payment status:", error);
//         setError('Failed to update payment status');
//       }
//     };

//     updatePaymentStatus();
//   }, [searchParams, id]);

//   const handleRetryPayment = async () => {
//     try {
//       const response = await axiosInstance.post(`${USER_API}/retry-payment`, { bookingId: id });
//       const { sessionId } = response.data;

//       // Redirect to Stripe checkout
//       const stripe = await loadStripe('pk_test_51PaimnG8EaTCVCc3V37VRPWK4CHnrsjvdwOmKNyu6SZYIUJGBzPSJIuROfma8eqnXpQfQTOmBonXaPtiCUZBCFkx00OxC7tApr');
//       //@ts-ignore
//       const result = await stripe.redirectToCheckout({ sessionId });

//       if (result.error) {
//         setError('Failed to initiate payment');
//       }
//     } catch (error) {
//       console.error("Error retrying payment:", error);
//       setError('Error retrying payment');
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//         <div className="p-10 bg-white rounded-lg shadow-lg">
//           <PaymentMessage isSuccess={isSuccess} />
//           {!isSuccess && error && (
//             <div className="mt-4 text-center text-red-500">
//               {error}
//               <button
//                 onClick={handleRetryPayment}
//                 className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
//               >
//                 Retry Payment
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default PaymentSuccess;


