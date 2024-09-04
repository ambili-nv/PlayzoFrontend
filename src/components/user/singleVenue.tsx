import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { USER_API } from '../../constants';
import BookingModal from './bookingModal';
import StarRating from './cards/starRating'; // Import the StarRating component

interface Rating {
  _id: string;
  rating: number;
  comment: string;
  userId: {
    name: string;
  };
  venueId: string;
  createdAt: string;
  updatedAt: string;
}

interface Venue {
  _id: string;
  name: string;
  sportsitem: string;
  place: string;
  description: string;
  primaryImage: string;
  secondaryImages: string[];
  rating: Rating[];
  isApproved: boolean;
}

const VenuePage: React.FC = () => {
  const { venueId } = useParams<{ venueId: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentRatingIndex, setCurrentRatingIndex] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const response = await axios.get(`${USER_API}/single-venue/${venueId}`);
        console.log(response.data, "venue details");

        if (response.data && response.data.success) {
          const fetchedVenue = response.data.venueDetails;
          const fetchedRatings = response.data.rating;

          console.log(fetchedRatings, "ratings data"); // Log the ratings data

          setVenue(fetchedVenue);
          setRatings(fetchedRatings); // Store ratings in state
        } else {
          setError('Error loading venue details');
        }
      } catch (err) {
        setError('Error loading venue details');
      } finally {
        setLoading(false);
      }
    };

    fetchVenueDetails();
  }, [venueId]);

  useEffect(() => {
    if (ratings.length > 0) {
      const interval = setInterval(() => {
        setCurrentRatingIndex((prevIndex) =>
          (prevIndex + 1) % ratings.length
        );
      }, 5000); // Change rating every 5 seconds

      return () => clearInterval(interval);
    }
  }, [ratings]);

  const handlePrevImage = () => {
    if (venue && venue.secondaryImages.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? venue.secondaryImages.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNextImage = () => {
    if (venue && venue.secondaryImages.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === venue.secondaryImages.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    
    <div className="container mx-auto px-4 py-8 mt-12 bg-gray-100">
      {venue ? (
        <>
          <h1 className="text-4xl font-bold mb-8 text-center text-green-700">Venue Details</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{venue?.name}</h2>
              </div>
              <div className="border rounded p-4">
                <p className="text-lg font-semibold">Sport</p>
                <p className="text-base mt-2 text-slate-600">{venue.sportsitem}</p>
              </div>
              <div className="border rounded p-4">
                <p className="text-xl font-semibold">Location</p>
                <p className="text-base mt-2 text-slate-600">{venue.place}</p>
              </div>
              <div className="border rounded p-4">
                <p className="text-xl font-semibold">Description</p>
                <p className="text-base mt-2 text-slate-600">{venue.description}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center relative">
              {venue.secondaryImages && venue.secondaryImages.length > 0 && (
                <div className="relative w-full h-96 flex items-center justify-center">
                  <img
                    src={venue.secondaryImages[currentImageIndex]}
                    alt={venue.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {venue.secondaryImages.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full"
                      >
                        &lt;
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full"
                      >
                        &gt;
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Ratings Display */}
          <div className="flex justify-center mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
              {ratings.length > 0 ? (
                <div>
                  <StarRating rating={ratings[currentRatingIndex].rating} />
                  <p className="text-base mt-1 text-slate-600">{ratings[currentRatingIndex].comment}</p>
                  <p className="text-sm text-gray-500">- {ratings[currentRatingIndex].userId?.name}</p>
                </div>
              ) : (
                <p>No ratings available.</p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-4 h-200">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-4 py-2 rounded-full text-white font-semibold shadow-md transition-all duration-300 ease-in-out bg-green-500 hover:bg-green-600"
            >
              Book Now
            </button>
          </div>
          <BookingModal
            isOpen={isBookingModalOpen}
            onClose={() => setIsBookingModalOpen(false)}
            venueId={venue._id}
            
          />
        </>
      ) : (
        <div>No venue details available.</div>
      )}
    </div>
  );
};

export default VenuePage;




// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { useParams } from 'react-router-dom';
// // import { USER_API } from '../../constants';
// // import BookingModal from './bookingModal';
// // import StarRating from './cards/starRating'; // Import the StarRating component

// // interface Rating {
// //   _id: string;
// //   rating: number;
// //   comment: string;
// //   userId: {
// //     name: string;
// //     avatarUrl?: string; // Optional avatar URL
// //   };
// //   venueId: string;
// //   createdAt: string;
// //   updatedAt: string;
// // }

// // interface Venue {
// //   _id: string;
// //   name: string;
// //   sportsitem: string;
// //   place: string;
// //   description: string;
// //   primaryImage: string;
// //   secondaryImages: string[];
// //   rating: Rating[];
// //   isApproved: boolean;
// // }

// // const VenuePage: React.FC = () => {
// //   const { venueId } = useParams<{ venueId: string }>();
// //   const [venue, setVenue] = useState<Venue | null>(null);
// //   const [ratings, setRatings] = useState<Rating[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [currentImageIndex, setCurrentImageIndex] = useState(0);
// //   const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

// //   useEffect(() => {
// //     const fetchVenueDetails = async () => {
// //       try {
// //         const response = await axios.get(`${USER_API}/single-venue/${venueId}`);
// //         if (response.data && response.data.success) {
// //           setVenue(response.data.venueDetails);
// //           setRatings(response.data.rating);
// //         } else {
// //           setError('Error loading venue details');
// //         }
// //       } catch (err) {
// //         setError('Error loading venue details');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchVenueDetails();
// //   }, [venueId]);

// //   const handlePrevImage = () => {
// //     if (venue && venue.secondaryImages.length > 0) {
// //       setCurrentImageIndex((prevIndex) =>
// //         prevIndex === 0 ? venue.secondaryImages.length - 1 : prevIndex - 1
// //       );
// //     }
// //   };

// //   const handleNextImage = () => {
// //     if (venue && venue.secondaryImages.length > 0) {
// //       setCurrentImageIndex((prevIndex) =>
// //         prevIndex === venue.secondaryImages.length - 1 ? 0 : prevIndex + 1
// //       );
// //     }
// //   };

// //   const getStarCount = (ratingValue: number) => {
// //     return ratings.filter((rating) => rating.rating === ratingValue).length;
// //   };

// //   const calculatePercentage = (count: number) => {
// //     return (count / ratings.length) * 100;
// //   };

// //   const calculateAverageRating = (): string => {
// //     if (ratings.length === 0) return '0.0'; // Return '0.0' as a string
  
// //     const totalRating = ratings.reduce((acc, rating) => acc + rating.rating, 0);
// //     const averageRating = totalRating / ratings.length;
  
// //     return averageRating.toFixed(1); // Convert to string with one decimal place
// //   };
  

// //   if (loading) return <div>Loading...</div>;
// //   if (error) return <div>{error}</div>;

// //   return (
// //     <div className="container mx-auto px-4 py-8 mt-12 bg-gray-100">
// //       {venue ? (
// //         <>
// //           <h1 className="text-4xl font-bold mb-8 text-center text-green-700">Venue Details</h1>
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
// //               <h2 className="text-3xl font-bold text-gray-800">{venue.name}</h2>
// //               <div className="border rounded p-4">
// //                 <p className="text-lg font-semibold">Sport</p>
// //                 <p className="text-base mt-2 text-slate-600">{venue.sportsitem}</p>
// //               </div>
// //               <div className="border rounded p-4">
// //                 <p className="text-xl font-semibold">Location</p>
// //                 <p className="text-base mt-2 text-slate-600">{venue.place}</p>
// //               </div>
// //               <div className="border rounded p-4">
// //                 <p className="text-xl font-semibold">Description</p>
// //                 <p className="text-base mt-2 text-slate-600">{venue.description}</p>
// //               </div>
// //             </div>

// //             <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center relative">
// //               {venue.secondaryImages && venue.secondaryImages.length > 0 && (
// //                 <div className="relative w-full h-96 flex items-center justify-center">
// //                   <img
// //                     src={venue.secondaryImages[currentImageIndex]}
// //                     alt={venue.name}
// //                     className="w-full h-full object-cover rounded-lg"
// //                   />
// //                   {venue.secondaryImages.length > 1 && (
// //                     <>
// //                       <button
// //                         onClick={handlePrevImage}
// //                         className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
// //                       >
// //                         &lt;
// //                       </button>
// //                       <button
// //                         onClick={handleNextImage}
// //                         className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
// //                       >
// //                         &gt;
// //                       </button>
// //                     </>
// //                   )}
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           <div className="flex justify-end mt-8 mb-4">
// //             <button
// //               onClick={() => setIsBookingModalOpen(true)}
// //               className="px-6 py-3 rounded-lg text-white font-semibold shadow-md transition-all duration-300 ease-in-out bg-green-500 hover:bg-green-600"
// //             >
// //               Book Now
// //             </button>
// //           </div>

// //           {/* Ratings Summary */}
// //           <div className="bg-white p-6 rounded-lg shadow-md mt-8 mb-12 max-w-md mx-auto">
// //             <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Overall Ratings</h2>
// //             <div className="flex items-center justify-center mb-4">
// //               <StarRating rating={parseFloat(calculateAverageRating())} />
// //               <p className="ml-2 text-lg text-gray-600">({calculateAverageRating()} out of 5)</p>
// //             </div>
// //             <p className="text-center text-gray-500">{ratings.length} reviews</p>
// //             <div className="mt-6">
// //               {[5, 4, 3, 2, 1].map((star) => (
// //                 <div key={star} className="flex items-center my-2">
// //                   <p className="w-8 text-sm text-gray-600">{star} star</p>
// //                   <div className="flex-grow h-4 bg-gray-200 rounded-full mx-2">
// //                     <div
// //                       className="h-full bg-green-500 rounded-full"
// //                       style={{ width: `${calculatePercentage(getStarCount(star))}%` }}
// //                     />
// //                   </div>
// //                   <p className="w-8 text-sm text-gray-600">{getStarCount(star)}</p>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Individual Reviews */}
// //           <div className="my-12">
// //             <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer Reviews</h2>
// //             {ratings.length > 0 ? (
// //               <div className="space-y-6">
// //                 {ratings.map((review) => (
// //                   <div key={review._id} className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
// //                     <div className="flex items-start">
// //                       <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
// //                         {review.userId.avatarUrl ? (
// //                           <img src={review.userId.avatarUrl} alt="User Avatar" className="w-full h-full object-cover" />
// //                         ) : (
// //                           <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 text-xl">
// //                             {review.userId.name.charAt(0)}
// //                           </div>
// //                         )}
// //                       </div>
// //                       <div className="flex-grow">
// //                         <div className="flex items-center justify-between">
// //                           <h3 className="text-lg font-semibold">{review.userId.name}</h3>
// //                           <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
// //                         </div>
// //                         <div className="flex items-center mt-1">
// //                           <StarRating rating={review.rating} />
// //                         </div>
// //                         <p className="text-gray-700 mt-2">{review.comment}</p>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             ) : (
// //               <p className="text-center text-gray-500">No reviews yet.</p>
// //             )}
// //           </div>

// //           {/* Booking Modal */}
// //           {isBookingModalOpen && (
// //             <BookingModal
// //               isOpen={isBookingModalOpen}
// //               onClose={() => setIsBookingModalOpen(false)}
// //               venueId={venue._id}
// //             />
// //           )}
// //         </>
// //       ) : (
// //         <div>Venue not found</div>
// //       )}
// //     </div>
// //   );
// // };

// // export default VenuePage;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { USER_API } from '../../constants';
// import BookingModal from './bookingModal';
// import StarRating from './cards/starRating';

// interface Rating {
//   _id: string;
//   rating: number;
//   comment: string;
//   userId: {
//     name: string;
//     avatarUrl?: string;
//   };
//   venueId: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface Venue {
//   _id: string;
//   name: string;
//   sportsitem: string;
//   place: string;
//   description: string;
//   primaryImage: string;
//   secondaryImages: string[];
//   rating: Rating[];
//   isApproved: boolean;
// }

// const VenuePage: React.FC = () => {
//   const { venueId } = useParams<{ venueId: string }>();
//   const [venue, setVenue] = useState<Venue | null>(null);
//   const [ratings, setRatings] = useState<Rating[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchVenueDetails = async () => {
//       try {
//         const response = await axios.get(`${USER_API}/single-venue/${venueId}`);
//         if (response.data && response.data.success) {
//           setVenue(response.data.venueDetails);
//           setRatings(response.data.rating);
//         } else {
//           setError('Error loading venue details');
//         }
//       } catch (err) {
//         setError('Error loading venue details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVenueDetails();
//   }, [venueId]);

//   const handlePrevImage = () => {
//     if (venue && venue.secondaryImages.length > 0) {
//       setCurrentImageIndex((prevIndex) =>
//         prevIndex === 0 ? venue.secondaryImages.length - 1 : prevIndex - 1
//       );
//     }
//   };

//   const handleNextImage = () => {
//     if (venue && venue.secondaryImages.length > 0) {
//       setCurrentImageIndex((prevIndex) =>
//         prevIndex === venue.secondaryImages.length - 1 ? 0 : prevIndex + 1
//       );
//     }
//   };

//   const getStarCount = (ratingValue: number) => {
//     return ratings.filter((rating) => rating.rating === ratingValue).length;
//   };

//   const calculatePercentage = (count: number) => {
//     return (count / ratings.length) * 100;
//   };

//   const calculateAverageRating = (): string => {
//     if (ratings.length === 0) return '0.0';

//     const totalRating = ratings.reduce((acc, rating) => acc + rating.rating, 0);
//     const averageRating = totalRating / ratings.length;

//     return averageRating.toFixed(1);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="container mx-auto px-4 py-8 mt-12 bg-gray-100">
//       {venue ? (
//         <>
//           <h1 className="text-4xl font-bold mb-8 text-center text-green-700">Venue Details</h1>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
//               <h2 className="text-3xl font-bold text-gray-800">{venue.name}</h2>
//               <div className="border rounded p-4">
//                 <p className="text-lg font-semibold">Sport</p>
//                 <p className="text-base mt-2 text-slate-600">{venue.sportsitem}</p>
//               </div>
//               <div className="border rounded p-4">
//                 <p className="text-xl font-semibold">Location</p>
//                 <p className="text-base mt-2 text-slate-600">{venue.place}</p>
//               </div>
//               <div className="border rounded p-4">
//                 <p className="text-xl font-semibold">Description</p>
//                 <p className="text-base mt-2 text-slate-600">{venue.description}</p>
//               </div>
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center relative">
//               {venue.secondaryImages && venue.secondaryImages.length > 0 && (
//                 <div className="relative w-full h-96 flex items-center justify-center">
//                   <img
//                     src={venue.secondaryImages[currentImageIndex]}
//                     alt={venue.name}
//                     className="w-full h-full object-cover rounded-lg"
//                   />
//                   {venue.secondaryImages.length > 1 && (
//                     <>
//                       <button
//                         onClick={handlePrevImage}
//                         className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
//                       >
//                         &lt;
//                       </button>
//                       <button
//                         onClick={handleNextImage}
//                         className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
//                       >
//                         &gt;
//                       </button>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="flex justify-end mt-8 mb-4">
//             <button
//               onClick={() => setIsBookingModalOpen(true)}
//               className="px-6 py-3 rounded-lg text-white font-semibold shadow-md transition-all duration-300 ease-in-out bg-green-500 hover:bg-green-600"
//             >
//               Book Now
//             </button>
//           </div>

//           {/* Ratings and Reviews */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-12">
//             {/* Overall Ratings */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Overall Ratings</h2>
//               <div className="flex items-center justify-center mb-4">
//                 <StarRating rating={parseFloat(calculateAverageRating())} />
//                 <p className="ml-2 text-lg text-gray-600">({calculateAverageRating()} out of 5)</p>
//               </div>
//               <p className="text-center text-gray-500">{ratings.length} reviews</p>
//               <div className="mt-6">
//                 {[5, 4, 3, 2, 1].map((star) => (
//                   <div key={star} className="flex items-center my-2">
//                     <p className="w-8 text-sm text-gray-600">{star} star</p>
//                     <div className="flex-grow h-4 bg-gray-200 rounded-full mx-2">
//                       <div
//                         className="h-full bg-green-500 rounded-full"
//                         style={{ width: `${calculatePercentage(getStarCount(star))}%` }}
//                       />
//                     </div>
//                     <p className="w-8 text-sm text-gray-600">{getStarCount(star)}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Customer Reviews */}
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-4">Customer Reviews</h2>
//               {ratings.length > 0 ? (
//                 <div className="space-y-6">
//                   {ratings.map((review) => (
//                     <div key={review._id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
//                       <div className="flex items-start">
//                         <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
//                           {review.userId.avatarUrl ? (
//                             <img
//                               src={review.userId.avatarUrl}
//                               alt="User Avatar"
//                               className="w-full h-full object-cover"
//                             />
//                           ) : (
//                             <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 text-xl">
//                               {review.userId.name.charAt(0)}
//                             </div>
//                           )}
//                         </div>
//                         <div className="flex-grow">
//                           <div className="flex items-center justify-between">
//                             <h3 className="text-lg font-semibold">{review.userId.name}</h3>
//                             <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
//                           </div>
//                           <div className="flex items-center mt-1">
//                             <StarRating rating={review.rating} />
//                           </div>
//                           <p className="text-gray-700 mt-2">{review.comment}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500">No reviews yet.</p>
//               )}
//             </div>
//           </div>

//           {isBookingModalOpen && venue && (
//             <BookingModal
//               isOpen={isBookingModalOpen}
//               onClose={() => setIsBookingModalOpen(false)}
//               venueId={venue._id}
//             />
//           )}
//         </>
//       ) : (
//         <div>Venue not found</div>
//       )}
//     </div>
//   );
// };

// export default VenuePage;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { USER_API } from '../../constants';
// import BookingModal from './bookingModal';
// import StarRating from './cards/starRating';

// interface Rating {
//   _id: string;
//   rating: number;
//   comment: string;
//   userId: {
//     name: string;
//   };
//   venueId: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface Venue {
//   _id: string;
//   name: string;
//   sportsitem: string;
//   place: string;
//   description: string;
//   primaryImage: string;
//   secondaryImages: string[];
//   rating: Rating[];
//   isApproved: boolean;
// }

// const VenuePage: React.FC = () => {
//   const { venueId } = useParams<{ venueId: string }>();
//   const [venue, setVenue] = useState<Venue | null>(null);
//   const [ratings, setRatings] = useState<Rating[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchVenueDetails = async () => {
//       try {
//         const response = await axios.get(`${USER_API}/single-venue/${venueId}`);
//         if (response.data && response.data.success) {
//           setVenue(response.data.venueDetails);
//           setRatings(response.data.rating);
//         } else {
//           setError('Error loading venue details');
//         }
//       } catch (err) {
//         setError('Error loading venue details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVenueDetails();
//   }, [venueId]);

//   const handlePrevImage = () => {
//     if (venue && venue.secondaryImages.length > 0) {
//       setCurrentImageIndex((prevIndex) =>
//         prevIndex === 0 ? venue.secondaryImages.length - 1 : prevIndex - 1
//       );
//     }
//   };

//   const handleNextImage = () => {
//     if (venue && venue.secondaryImages.length > 0) {
//       setCurrentImageIndex((prevIndex) =>
//         prevIndex === venue.secondaryImages.length - 1 ? 0 : prevIndex + 1
//       );
//     }
//   };

//   const getStarCount = (ratingValue: number) => {
//     return ratings.filter((rating) => rating.rating === ratingValue).length;
//   };

//   const calculatePercentage = (count: number) => {
//     return (count / ratings.length) * 100;
//   };

//   const calculateAverageRating = (): string => {
//     if (ratings.length === 0) return '0.0';

//     const totalRating = ratings.reduce((acc, rating) => acc + rating.rating, 0);
//     const averageRating = totalRating / ratings.length;

//     return averageRating.toFixed(1);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="container mx-auto px-4 py-8 mt-12 bg-gray-100">
//       {venue ? (
//         <>
//           <h1 className="text-4xl font-bold mb-8 text-center text-green-700">Venue Details</h1>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
//               <h2 className="text-3xl font-bold text-gray-800">{venue?.name}</h2>
//               <div className="border rounded p-4">
//                 <p className="text-lg font-semibold">Sport</p>
//                 <p className="text-base mt-2 text-slate-600">{venue.sportsitem}</p>
//               </div>
//               <div className="border rounded p-4">
//                 <p className="text-xl font-semibold">Location</p>
//                 <p className="text-base mt-2 text-slate-600">{venue.place}</p>
//               </div>
//               <div className="border rounded p-4">
//                 <p className="text-xl font-semibold">Description</p>
//                 <p className="text-base mt-2 text-slate-600">{venue.description}</p>
//               </div>
//             </div>

//             <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center relative">
//               {venue.secondaryImages && venue.secondaryImages.length > 0 && (
//                 <div className="relative w-full h-96 flex items-center justify-center">
//                   <img
//                     src={venue.secondaryImages[currentImageIndex]}
//                     alt={venue?.name}
//                     className="w-full h-full object-cover rounded-lg"
//                   />
//                   {venue.secondaryImages.length > 1 && (
//                     <>
//                       <button
//                         onClick={handlePrevImage}
//                         className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
//                       >
//                         &lt;
//                       </button>
//                       <button
//                         onClick={handleNextImage}
//                         className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
//                       >
//                         &gt;
//                       </button>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="flex justify-end mt-8 mb-4">
//             <button
//               onClick={() => setIsBookingModalOpen(true)}
//               className="px-6 py-3 rounded-lg text-white font-semibold shadow-md transition-all duration-300 ease-in-out bg-green-500 hover:bg-green-600"
//             >
//               Book Now
//             </button>
//           </div>

//           {/* Reviews and Ratings */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 mb-12">
//             {/* Customer Reviews */}
//             <div className="bg-white p-4 rounded-lg shadow-md">
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">Customer Reviews</h2>
//               {ratings.length > 0 ? (
//                 <div className="space-y-4">
//                   {ratings.map((review) => (
//                     <div key={review._id} className="bg-gray-100 p-3 rounded-lg shadow-sm">
//                       <div className="flex items-start">
//                         <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
//                           {/* {review.userId.avatarUrl ? (
//                             <img
//                               src={review.userId.avatarUrl}
//                               alt="User Avatar"
//                               className="w-full h-full object-cover"
//                             />
//                           ) : ( */}
//                             <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 text-lg">
//                               {review.userId?.name.charAt(0)}
//                             </div>
//                           {/* )} */}
//                         </div>
//                         <div className="flex-grow">
//                           <div className="flex items-center justify-between">
//                             <h3 className="text-base font-semibold">{review.userId?.name}</h3>
//                             <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
//                           </div>
//                           <div className="flex items-center mt-1">
//                             <StarRating rating={review.rating} />
//                           </div>
//                           <p className="text-gray-700 text-sm mt-1">{review.comment}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500">No reviews yet.</p>
//               )}
//             </div>

//             {/* Overall Ratings */}
//             <div className="bg-white p-4 rounded-lg shadow-md">
//               <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Overall Ratings</h2>
//               <div className="flex items-center justify-center mb-4">
//                 <StarRating rating={parseFloat(calculateAverageRating())} />
//                 <p className="ml-2 text-lg text-gray-600">({calculateAverageRating()} out of 5)</p>
//               </div>
//               <p className="text-center text-gray-500">{ratings.length} reviews</p>
//               <div className="mt-4">
//                 {[5, 4, 3, 2, 1].map((star) => (
//                   <div key={star} className="flex items-center my-2">
//                     <p className="w-8 text-sm text-gray-600">{star} star</p>
//                     <div className="flex-grow h-3 bg-gray-200 rounded-full mx-2">
//                       <div
//                         className="h-full bg-green-500 rounded-full"
//                         style={{ width: `${calculatePercentage(getStarCount(star))}%` }}
//                       />
//                     </div>
//                     <p className="w-6 text-sm text-gray-600">{getStarCount(star)}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {isBookingModalOpen && venue && (
//             <BookingModal
//               isOpen={isBookingModalOpen}
//               onClose={() => setIsBookingModalOpen(false)}
//               venueId={venue._id}
//             />
//           )}
//         </>
//       ) : (
//         <div>Venue not found</div>
//       )}
//     </div>
//   );
// };

// export default VenuePage;
