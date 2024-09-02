
// import React, { useEffect, useState } from 'react';
// import axiosInstance from '../../utils/axiosInstance';
// import { USER_API } from '../../constants';

// interface Transaction {
//   _id: string;
//   createdAt: string;
//   type: 'credit' | 'debit';
//   amount: number;
//   description: string;
// }

// const WalletPage: React.FC = () => {
//   const [balance, setBalance] = useState<number>(0);
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalPages, setTotalPages] = useState<number>(1);

//   useEffect(() => {
//     const fetchWalletData = async () => {
//       try {
//         const response = await axiosInstance.get(`${USER_API}/wallet`, {
//           params: {
//             page: currentPage,
//             limit: 5
//           }
//         });
//         setBalance(response.data.balance);
//         setTransactions(response.data.transactions);
//         setTotalPages(Math.ceil(response.data.totalTransactions / 5));
//       } catch (error) {
//         // setError('Failed to fetch wallet data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWalletData();
//   }, [currentPage]);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-6">Wallet</h1>

//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
//           <div className="flex justify-between items-center mb-6">
//             <div className="text-xl font-semibold">Current Balance</div>
//             <div className="text-3xl font-bold text-green-500">{balance}</div>
//           </div>

//           <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>

//           {transactions.length > 0 ? (
//             <ul className="divide-y divide-gray-200">
//               {transactions.map(transaction => (
//                 <li key={transaction._id} className="py-4">
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <div className="font-semibold">{transaction.description}</div>
//                       <div className="text-sm text-gray-500">
//                         {new Date(transaction.createdAt).toLocaleString()}
//                       </div>
//                     </div>
//                     <div className={`font-bold ${transaction.type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
//                       {transaction.type === 'credit' ? '+' : '-'}{transaction.amount}
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500 text-center mt-4">No transaction history found.</p>
//           )}

//           <div className="flex justify-between mt-4">
//             <button
//               className="px-4 py-2 bg-gray-300 rounded-md"
//               onClick={handlePreviousPage}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </button>
//             <span className="px-4 py-2">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               className="px-4 py-2 bg-gray-300 rounded-md"
//               onClick={handleNextPage}
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WalletPage;



import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { USER_API } from '../../constants';

interface Transaction {
  _id: string;
  createdAt: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
}

const WalletPage: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const response = await axiosInstance.get(`${USER_API}/wallet`, {
          params: {
            page: currentPage,
            limit: 5
          }
        });
        setBalance(response.data.balance);
        setTransactions(response.data.transactions);
        setTotalPages(Math.ceil(response.data.totalTransactions / 5));
      } catch (error) {
        setError('Failed to fetch wallet data');
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Wallet</h1>

      {loading ? (
        <p>Loading...</p>
      // ) 
      // : error ? (
      //   <p className="text-red-500">{error}</p>
      ) : (
        <div className="w-full max-w-lg sm:max-w-4xl bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
            <div className="text-lg sm:text-xl font-semibold">Current Balance</div>
            <div className="text-2xl sm:text-3xl font-bold text-green-500">{balance}</div>
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Transaction History</h2>

          {transactions.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {transactions.map(transaction => (
                <li key={transaction._id} className="py-2 sm:py-4">
                  <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div>
                      <div className="font-semibold">{transaction.description}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(transaction.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div className={`font-bold ${transaction.type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                      {transaction.type === 'credit' ? '+' : '-'}{transaction.amount}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center mt-4">No transaction history found.</p>
          )}

          <div className="flex flex-col sm:flex-row justify-between mt-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded-md mb-2 sm:mb-0"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-4 py-2 text-center">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-gray-300 rounded-md"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletPage;

