import React from "react";
import { Link } from "react-router-dom";

interface PaymentMessageProps {
  isSuccess: boolean;
  error?: any; 
}

const PaymentMessage: React.FC<PaymentMessageProps> = ({ isSuccess, error }) => {
  return (
    <div className="text-center mb-5">
      {isSuccess ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto mb-4 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h2 className="text-2xl font-bold text-green-500">Payment Successful!</h2>
          <p className="mt-2 text-gray-600">Your payment was successful. Thank you for your purchase!</p>
          <div className="flex justify-center mt-4">
            <Link
              to={`/`}
              className="bg-teal-400 hover:bg-teal-500 inline-flex gap-1 items-center text-white font-semibold px-8 py-3 rounded-lg"
            >
              Go To Home Page
            </Link>
          </div>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto mb-4 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <h2 className="text-2xl font-bold text-red-500">Payment Failed</h2>
          <p className="mt-2 text-gray-600">Unfortunately, your payment could not be processed.</p>
          {error && (
            <p className="mt-2 text-gray-600">{error}</p>
          )}
          <p className="mt-2 text-gray-600">Please try again or <Link to="/contact-support" className="underline">contact support</Link>.</p>
        </>
      )}
    </div>
  );
};

export default PaymentMessage;











// // import React from "react";
// // import { Link, useParams } from "react-router-dom";

// // interface PaymentMessageProps {
// //   isSuccess: boolean;
// // }

// // const PaymentMessage: React.FC<PaymentMessageProps> = ({ isSuccess }) => {
// //   const { id } = useParams();

// //   return (
// //     <div className="text-center mb-5">
// //       {isSuccess ?
// //        (
// //         <>
// //           <svg
// //             xmlns="http://www.w3.org/2000/svg"
// //             className="h-16 w-16 mx-auto mb-4 text-green-500"
// //             fill="none"
// //             viewBox="0 0 24 24"
// //             stroke="currentColor"
// //           >
// //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// //           </svg>
// //           <h2 className="text-2xl font-bold text-green-500">Payment Successful!</h2>
// //           <p className="mt-2 text-gray-600">Your payment was successful. Thank you for your purchase!</p>
// //           <div className="flex justify-center mt-4"> {/* Centering the button */}
// //             <Link
// //               to={`/`}
// //               className="bg-teal-400 hover:bg-teal-500 inline-flex gap-1 items-center text-white font-semibold px-8 py-3 rounded-lg"
// //             >
// //               Go To Home Page
// //             </Link>
// //           </div>
// //         </>
// //       ) : (
// //         <>
// //           <svg
// //             xmlns="http://www.w3.org/2000/svg"
// //             className="h-16 w-16 mx-auto mb-4 text-red-500"
// //             fill="none"
// //             viewBox="0 0 24 24"
// //             stroke="currentColor"
// //           >
// //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //           </svg>
// //           <h2 className="text-2xl font-bold text-red-500">Payment Failed</h2>
// //           <p className="mt-2 text-gray-600">Unfortunately, your payment could not be processed.</p>
// //           <p className="mt-2 text-gray-600">Please try again or <Link to="/contact-support" className="underline">contact support</Link>.</p>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default PaymentMessage;



// import React from "react";
// import { Link } from "react-router-dom";

// interface PaymentMessageProps {
//   isSuccess: boolean;
// }

// const PaymentMessage: React.FC<PaymentMessageProps> = ({ isSuccess }) => {
//   return (
    
//     <div className="text-center mb-5">
//       {isSuccess ? (
//         <>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-16 w-16 mx-auto mb-4 text-green-500"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//           </svg>
//           <h2 className="text-2xl font-bold text-green-500">Payment Successful!</h2>
//           <p className="mt-2 text-gray-600">Your payment was successful. Thank you for your purchase!</p>
//           <div className="flex justify-center mt-4"> {/* Centering the button */}
//             <Link
//               to={`/`}
//               className="bg-teal-400 hover:bg-teal-500 inline-flex gap-1 items-center text-white font-semibold px-8 py-3 rounded-lg"
//             >
//               Go To Home Page
//             </Link>
//           </div>
//         </>
//       ) : (
//         <>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-16 w-16 mx-auto mb-4 text-red-500"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//           <h2 className="text-2xl font-bold text-red-500">Payment Failed</h2>
//           <p className="mt-2 text-gray-600">Unfortunately, your payment could not be processed.</p>
//           <p className="mt-2 text-gray-600">Please try again or <Link to="/contact-support" className="underline">contact support</Link>.</p>
//         </>
//       )} 
//     </div>
//   );
// };

// export default PaymentMessage;





