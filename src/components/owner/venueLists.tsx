// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { OWNER_API } from '../../constants'; 
// import showToast from '../../utils/toaster'; 
// import axiosInstance from '../../utils/axiosInstance'; 
// import { useNavigate } from 'react-router-dom';
// import OwnerNavbar from './Header/OwnerNavbar';

// interface Venue {
//     _id: string;
//     name: string;
//     sportsitem: string;
//     place: string;
//     // price: number;
//     description: string;
//     primaryImage: string;
//     secondaryImages: string[];
//     isApproved: boolean;
// }



// const MyVenuesList: React.FC = () => {
//     const { ownerId } = useParams<{ ownerId: string }>();
//     const [venues, setVenues] = useState<Venue[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchVenues = async (page: number) => {
//             try {
//                 const token = localStorage.getItem('accessToken');
//                 const response = await axiosInstance.get(`${OWNER_API}/myvenue-list/${ownerId}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     },
//                     params: {
//                         page,
//                         limit: 6
//                     }
//                 });

//                 setVenues(response.data.venues.venueList);
//                 setTotalPages(response.data.venues.totalPages);
//                 setCurrentPage(response.data.venues.currentPage);
//             } catch (error) {
//                 showToast('Failed to fetch venues', 'error');
//                 setError('Failed to fetch venues');
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchVenues(currentPage);
//     }, [ownerId, currentPage]);

//     const handlePreviousPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     const handleNextPage = () => {
//         if (currentPage < totalPages) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     return (
//         <>
//         <OwnerNavbar/>
//         <div className="p-6 bg-gray-100 min-h-screen mt-12">
//             <h1 className="text-2xl font-bold text-green-700 mb-4 mt-12 ml-12">Venue List</h1>
//             {isLoading ? (
//                 <p>Loading...</p>
//             ) : error ? (
//                 <p>{error}</p>
//             ) : venues.length === 0 ? (
//                 <p>No venues available for this owner.</p>
//             ) : (
//                 <>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {venues.map((venue) => (
//                             <div key={venue._id} className="bg-white rounded-lg shadow-md overflow-hidden">
//                                 <div className="h-48 overflow-hidden">
//                                     {venue.primaryImage ? (
//                                         <img src={venue.primaryImage} alt={venue.name} className="w-full h-full object-cover" />
//                                     ) : (
//                                         <div className="w-full h-full flex items-center justify-center bg-gray-200">
//                                             <span>No Primary Image Available</span>
//                                         </div>
//                                     )}
//                                 </div>
//                                 <div className="p-4">
//                                     <h2 className="text-xl font-semibold text-green-700 text-center">{venue.name}</h2>
//                                     <p className="text-gray-600 mb-2 mt-5"><strong>SportsItem:</strong> {venue.sportsitem}</p>
//                                     <p className="text-gray-600 mb-2"><strong>Location:</strong> {venue.place}</p>
//                                     {/* <p className="text-gray-600 mb-2"><strong>Price:</strong> ${venue.price}</p> */}
//                                     <p className="text-gray-600 mb-2"><strong>Description:</strong> {venue.description}</p>
//                                     <p className="text-gray-600 mb-2"><strong>Status:</strong> <span className={venue.isApproved ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{venue.isApproved ? 'Accepted' : 'Rejected'}</span></p>
//                                     <div className="mt-4 flex justify-around">
//                                         <button
//                                             onClick={() => navigate(`/owner/edit-venue/${venue._id}`)}
//                                             className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         >
//                                             Edit
//                                         </button>

//                                         <button
//                                             onClick={() => navigate(`/owner/add-slot/${venue._id}`)}
//                                             className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
//                                         >
//                                             Add Slot
//                                         </button>
//                                         <button
//                                             onClick={() => navigate(`/owner/viewslots/${venue._id}`)}
//                                             className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
//                                         >
//                                             view Slot
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="flex justify-center mt-4">
//                         <button
//                             onClick={handlePreviousPage}
//                             disabled={currentPage === 1}
//                             className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                             Previous
//                         </button>
//                         <span className="px-4 py-2">{currentPage} of {totalPages}</span>
//                         <button
//                             onClick={handleNextPage}
//                             disabled={currentPage === totalPages}
//                             className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                             Next
//                         </button>
//                     </div>
//                 </>
//             )}
//         </div>

//         </>
//     );
// };

// export default MyVenuesList;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { OWNER_API } from '../../constants'; 
import showToast from '../../utils/toaster'; 
import axiosInstance from '../../utils/axiosInstance'; 
import { useNavigate } from 'react-router-dom';
import OwnerNavbar from './Header/OwnerNavbar';

interface Venue {
    _id: string;
    name: string;
    sportsitem: string;
    place: string;
    description: string;
    primaryImage: string;
    secondaryImages: string[];
    isApproved: boolean;
}

const MyVenuesList: React.FC = () => {
    const { ownerId } = useParams<{ ownerId: string }>();
    const [venues, setVenues] = useState<Venue[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVenues = async (page: number) => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await axiosInstance.get(`${OWNER_API}/myvenue-list/${ownerId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: {
                        page,
                        limit: 6
                    }
                });

                setVenues(response.data.venues.venueList);
                setTotalPages(response.data.venues.totalPages);
                setCurrentPage(response.data.venues.currentPage);
            } catch (error) {
                showToast('Failed to fetch venues', 'error');
                setError('Failed to fetch venues');
            } finally {
                setIsLoading(false);
            }
        };

        fetchVenues(currentPage);
    }, [ownerId, currentPage]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>
            <OwnerNavbar />
            <div className="p-4 bg-gray-100 min-h-screen mt-12">
                <h1 className="text-2xl font-bold text-green-700 mb-4 mt-12 ml-4 md:ml-12">Venue List</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : venues.length === 0 ? (
                    <p>No venues available for this owner.</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {venues.map((venue) => (
                                <div key={venue._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="h-40 sm:h-48 overflow-hidden">
                                        {venue.primaryImage ? (
                                            <img
                                                src={venue.primaryImage}
                                                alt={venue.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                                <span>No Primary Image Available</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h2 className="text-lg sm:text-xl font-semibold text-green-700 text-center">
                                            {venue.name}
                                        </h2>
                                        <p className="text-gray-600 mb-2 mt-4 sm:mt-5">
                                            <strong>SportsItem:</strong> {venue.sportsitem}
                                        </p>
                                        <p className="text-gray-600 mb-2">
                                            <strong>Location:</strong> {venue.place}
                                        </p>
                                        <p className="text-gray-600 mb-2">
                                            <strong>Description:</strong> {venue.description}
                                        </p>
                                        <p className="text-gray-600 mb-2">
                                            <strong>Status:</strong>{" "}
                                            <span
                                                className={
                                                    venue.isApproved
                                                        ? "text-green-600 font-bold"
                                                        : "text-red-600 font-bold"
                                                }
                                            >
                                                {venue.isApproved ? "Accepted" : "Rejected"}
                                            </span>
                                        </p>
                                        <div className="mt-4 flex justify-around">
                                            <button
                                                onClick={() => navigate(`/owner/edit-venue/${venue._id}`)}
                                                className="px-2 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => navigate(`/owner/add-slot/${venue._id}`)}
                                                className="px-2 py-1 sm:px-4 sm:py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                            >
                                                Add Slot
                                            </button>
                                            <button
                                                onClick={() => navigate(`/owner/viewslots/${venue._id}`)}
                                                className="px-2 py-1 sm:px-4 sm:py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                            >
                                                View Slot
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                                className="px-3 py-2 bg-gray-300 text-gray-700 rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2">{currentPage} of {totalPages}</span>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="px-3 py-2 bg-gray-300 text-gray-700 rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default MyVenuesList;
