import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { ADMIN_API } from '../../constants';
import showToast from '../../utils/toaster';

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

const VenuesList: React.FC = () => {
    const { ownerId } = useParams<{ ownerId: string }>();
    console.log(ownerId, "ownerId-venue front end");

    const [venues, setVenues] = useState<Venue[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10; // Number of items per page

    useEffect(() => {
        const fetchVenues = async (page: number) => {
            try {
                const response = await axiosInstance.get(`${ADMIN_API}/venues/${ownerId}`, {
                    params: { page, limit },
                });
                setVenues(response.data.venues.venueList);
                setTotalPages(response.data.venues.totalPages);
            } catch (error) {
                showToast('Failed to fetch venues');
                setError('Failed to fetch venues');
            } finally {
                setIsLoading(false);
            }
        };
        fetchVenues(currentPage);
    }, [ownerId, currentPage]);

    const handleAccept = async (venueId: string) => {
        try {
            const response = await axiosInstance.post(`${ADMIN_API}/accept-venues/${venueId}`);
            showToast(response.data.message, 'success');
            setVenues((prevVenues) => prevVenues.map((venue) => 
                venue._id === venueId ? { ...venue, isApproved: true } : venue
            ));
        } catch (error) {
            showToast('Failed to accept venue', 'error');
        }
    };

    const handleReject = async (venueId: string) => {
        try {
            const response = await axiosInstance.post(`${ADMIN_API}/reject-venues/${venueId}`);
            showToast(response.data.message, 'success');
            setVenues((prevVenues) => prevVenues.map((venue) => 
                venue._id === venueId ? { ...venue, isApproved: false } : venue
            ));
        } catch (error) {
            showToast('Failed to reject venue', 'error');
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-green-700 mb-4">Venue List</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : venues.length === 0 ? (
                <p>No venues available for this owner.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {venues.map((venue) => (
                            <div key={venue._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="h-48 overflow-hidden">
                                    {venue.primaryImage ? (
                                        <img src={venue.primaryImage} alt={venue.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                            <span>No Primary Image Available</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold text-green-700 text-center ">{venue.name}</h2>
                                    <p className="text-gray-600 mb-2 mt-5"><strong>SportsItem:</strong> {venue.sportsitem}</p>
                                    <p className="text-gray-600 mb-2"><strong>Location:</strong> {venue.place}</p>
                                    <p className="text-gray-600 mb-2"><strong>Description:</strong> {venue.description}</p>
                                    <p className="text-gray-600 mb-2"><strong>Status:</strong> <span className={venue.isApproved ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{venue.isApproved ? 'Accepted' : 'Rejected'}</span></p>
                                    <div className="mt-4 flex justify-around">
                                        <button
                                            onClick={() => handleAccept(venue._id)}
                                            className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleReject(venue._id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="px-3 py-1 mx-1 bg-gray-300 rounded-md shadow-md hover:bg-gray-400 focus:outline-none"
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span className="px-3 py-1 mx-1 bg-gray-200 rounded-md shadow-md">{`Page ${currentPage} of ${totalPages}`}</span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="px-3 py-1 mx-1 bg-gray-300 rounded-md shadow-md hover:bg-gray-400 focus:outline-none"
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default VenuesList;

