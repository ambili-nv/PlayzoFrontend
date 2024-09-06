
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FaLocationArrow } from 'react-icons/fa';
// import showToast from '../../../utils/toaster';
// import { USER_API } from '../../../constants';
// import useUserLocation from '../../../hooks/useUserLocation';
// // import StarRating from './starRating';
// import LoadingSpinner from '../../../pages/User/loading';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// interface Venue {
//   _id: string;
//   name: string;
//   primaryImage: string;
//   sportsitem: string;
//   place: string;
//   coordinates: {
//     lat: number;
//     lng: number;
//   };
//   // averageRating: number;
// }

// interface CardProps {
//   searchQuery: string;
//   limit?: number;
// }

// const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
//   const toRadians = (degrees: number) => degrees * (Math.PI / 180);
//   const R = 6371;
//   const dLat = toRadians(lat2 - lat1);
//   const dLng = toRadians(lng2 - lng1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
//     Math.sin(dLng / 2) * Math.sin(dLng / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// };

// const Card: React.FC<CardProps> = ({ searchQuery, limit }) => {
//   const [venues, setVenues] = useState<Venue[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { location: userLocation, error: locationError, permissionDenied } = useUserLocation();
//   const [maxDistance, setMaxDistance] = useState(10);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchVenues = async () => {
//       try {
//         const params = {
//           latitude: userLocation?.latitude,
//           longitude: userLocation?.longitude,
//           maxDistance,
//           date: selectedDate?.toISOString().split('T')[0],
//         };

//         const endpoint = selectedDate ? "/getvenuesbydate" : "/getvenues";
//         const response = await axios.get(USER_API + endpoint, {
//           params: selectedDate ? params : { latitude: userLocation?.latitude, longitude: userLocation?.longitude, maxDistance },
//         });

//         let venuesData;

//         if (selectedDate) {
//           venuesData = response.data.venues.map((slot: { venueId: any; date: any; startTime: any; endTime: any; price: any; }) => ({
//             ...slot.venueId,
//             date: slot.date,
//             startTime: slot.startTime,
//             endTime: slot.endTime,
//             price: slot.price
//           }));
//         } else {
//           venuesData = response.data.venues;
//         }

//         // Remove duplicates
//         const uniqueVenues = Array.from(new Set(venuesData.map((venue: { _id: any; }) => venue._id)))
//           .map(id => {
//             return venuesData.find((venue: { _id: unknown; }) => venue._id === id);
//           });

//         console.log('Unique Venues:', uniqueVenues);

//         setVenues(uniqueVenues);
//       } catch (error: any) {
//         showToast('Failed to fetch venues');
//         setError('Failed to fetch venues');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchVenues();
//   }, [userLocation, maxDistance, permissionDenied, selectedDate]);

//   if (isLoading) return <LoadingSpinner />;
//   if (error) return <div>{error}</div>;

//   const filteredVenues = venues.filter((venue) =>
//     venue.place?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   console.log('Filtered Venues:', filteredVenues);

//   const displayedVenues = limit ? filteredVenues.slice(0, limit) : filteredVenues;

//   console.log('Displayed Venues:', displayedVenues);

//   const handleViewDetails = (venueId: string) => {
//     navigate(`/single-venue/${venueId}`);
//   };

//   const handleViewMore = () => {
//     navigate('/book');
//   };

//   return (
//     <>
//       <div className="p-5">
//         <DatePicker
//           selected={selectedDate}
//           onChange={(date: Date | null) => setSelectedDate(date)}
//           dateFormat="yyyy-MM-dd"
//           className="mb-4 p-2 border border-gray-300 rounded"
//           placeholderText="Select a date"
//         />
//       </div>

//       <div className="flex flex-wrap justify-around items-center p-5">
//         {displayedVenues.length > 0 ? (
//           displayedVenues.map((venue) => {
//             const distance = userLocation && venue.coordinates ? calculateDistance(
//               userLocation.latitude,
//               userLocation.longitude,
//               venue.coordinates.lat,
//               venue.coordinates.lng
//             ) : 0;

//             console.log('Venue Coordinates:', venue.coordinates);

//             return (
//               <div key={venue._id} className="bg-white rounded-lg shadow-md overflow-hidden duration-300 hover:-translate-y-1 w-[350px] mt-5">
//                 <img src={venue.primaryImage} alt={venue.name} className="w-full h-52 object-cover" />
//                 <div className="p-4">
//                   <h3 className="text-xl font-semibold">{venue.name}</h3>
//                   <p className="font-semibold">{venue.sportsitem}</p>
//                   <p className="text-gray-500">{venue.place}</p>
//                   {userLocation && venue.coordinates && (
//                     <div className="flex items-center text-gray-500 mt-2">
//                       <FaLocationArrow className="mr-2 mb-2" />
//                       <p className="mr-2 mb-2">Distance: {distance.toFixed(1)} km</p>
//                     </div>
//                   )}
//                   {/* <StarRating rating={venue.averageRating} /> */}
//                   <div className="flex justify-end mt-2">
//                     <button
//                       className="px-4 py-2 rounded-full text-white font-semibold shadow-md transition-all duration-300 ease-in-out bg-green-500 hover:bg-green-600"
//                       onClick={() => handleViewDetails(venue._id)}
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <div className="text-center mt-10">
//             <h3 className="text-xl font-semibold">No venues found</h3>
//             <p className="text-gray-500">Try searching for a different location or date.</p>
//           </div>
//         )}
//       </div>
//       {limit === 4 && filteredVenues.length > 4 && (
//         <div className="flex justify-center mt-6 mb-8">
//           <button
//             className="px-6 py-2 rounded-full text-white font-semibold shadow-md transition-all duration-300 ease-in-out bg-green-500 hover:bg-green-600"
//             onClick={handleViewMore}
//           >
//             View More
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// export default Card;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaLocationArrow } from 'react-icons/fa';
import showToast from '../../../utils/toaster';
import { USER_API } from '../../../constants';
import useUserLocation from '../../../hooks/useUserLocation';
import LoadingSpinner from '../../../pages/User/loading';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Venue {
  _id: string;
  name: string;
  primaryImage: string;
  sportsitem: string;
  place: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface CardProps {
  searchQuery: string;
  limit?: number;
}

const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const toRadians = (degrees: number) => degrees * (Math.PI / 180);
  const R = 6371; // Radius of Earth in km
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

async function getCoordinates(location: string) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`,
      {
        headers: {
          'User-Agent': 'YourAppName/1.0 (your.email@example.com)',
        },
      }
    );
    const data = await response.json();
    if (data.length > 0) {
      const { lat, lon } = data[0];
      return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
    } else {
      showToast('Location not found', 'error');
      throw new Error('Location not found');
    }
  } catch (error) {
    console.error(error);
    showToast('Error fetching location', 'error');
    throw error;
  }
}

const Card: React.FC<CardProps> = ({ searchQuery, limit }) => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { location: userLocation, error: locationError, permissionDenied, setLocation } = useUserLocation();
  const [maxDistance, setMaxDistance] = useState(10);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [city, setCity] = useState<string>(''); // To store city input
  const navigate = useNavigate();

  const fetchVenues = async () => {
    try {
      const params = {
        latitude: userLocation?.latitude,
        longitude: userLocation?.longitude,
        maxDistance,
        date: selectedDate?.toISOString().split('T')[0],
      };

      const endpoint = selectedDate ? "/getvenuesbydate" : "/getvenues";
      const response = await axios.get(USER_API + endpoint, {
        params,
      });

      const venuesData = selectedDate
        ? response.data.venues.map((slot: { venueId: any; date: any; startTime: any; endTime: any; price: any; }) => ({
            ...slot.venueId,
            date: slot.date,
            startTime: slot.startTime,
            endTime: slot.endTime,
            price: slot.price
          }))
        : response.data.venues;

      const uniqueVenues = Array.from(new Set(venuesData.map((venue: { _id: any; }) => venue._id)))
        .map(id => venuesData.find((venue: { _id: unknown; }) => venue._id === id));

      setVenues(uniqueVenues);
    } catch (error: any) {
      showToast('Failed to fetch venues');
      setError('Failed to fetch venues');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userLocation) {
      fetchVenues();
    }
  }, [userLocation, maxDistance, selectedDate]);

  const handleCitySubmit = async () => {
    try {
      const coordinates = await getCoordinates(city);
      setLocation(coordinates);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  const filteredVenues = venues.filter((venue) =>
    venue.place?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedVenues = limit ? filteredVenues.slice(0, limit) : filteredVenues;

  const handleViewDetails = (venueId: string) => {
    navigate(`/single-venue/${venueId}`);
  };

  return (
    <>
      <div className="p-5">
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          className="mb-4 p-2 border border-gray-300 rounded"
          placeholderText="Select a date"
        />
        {permissionDenied && (
          <div className="flex flex-col items-center">
            <input
              type="text"
              placeholder="Enter your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="p-2 border border-gray-300 rounded mb-4"
            />
            <button
              onClick={handleCitySubmit}
              className="px-4 py-2 rounded-full text-white font-semibold shadow-md transition-all duration-300 ease-in-out bg-green-500 hover:bg-green-600"
            >
              Fetch Venues
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-around items-center p-5">
        {displayedVenues.length > 0 ? (
          displayedVenues.map((venue) => {
            const distance = userLocation && venue.coordinates ? calculateDistance(
              userLocation.latitude,
              userLocation.longitude,
              venue.coordinates.lat,
              venue.coordinates.lng
            ) : 0;

            return (
              <div key={venue._id} className="bg-white rounded-lg shadow-md overflow-hidden duration-300 hover:-translate-y-1 w-[350px] mt-5">
                <img src={venue.primaryImage} alt={venue.name} className="w-full h-52 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{venue.name}</h3>
                  <p className="font-semibold">{venue.sportsitem}</p>
                  <p className="text-gray-500">{venue.place}</p>
                  {userLocation && venue.coordinates && (
                    <div className="flex items-center text-gray-500 mt-2">
                      <FaLocationArrow className="mr-2" />
                      <p>{distance.toFixed(2)} km away</p>
                    </div>
                  )}
                  <button
                    onClick={() => handleViewDetails(venue._id)}
                    className="px-4 py-2 rounded-full text-white font-semibold shadow-md transition-all duration-300 ease-in-out bg-green-500 hover:bg-green-600 w-full mt-3"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="mt-5 text-gray-500">No venues found.</p>
        )}
      </div>
    </>
  );
};

export default Card;

































































// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { FaLocationArrow } from 'react-icons/fa'; // Importing the icon from React Icons
// import showToast from '../../../utils/toaster';
// import { USER_API } from '../../../constants';
// import useUserLocation from '../../../hooks/useUserLocation'; // Import the custom hook
// import StarRating from './starRating'; // Import the StarRating component
// import LoadingSpinner from '../../../pages/User/loading';


// interface Venue {
//   _id: string;
//   name: string;
//   primaryImage: string;
//   sportsitem: string;
//   place: string;
//   coordinates: {
//     lat: number;
//     lng: number;
//   };
//   averageRating: number; // Add averageRating to Venue interface
// }

// interface CardProps {
//   searchQuery: string;
//   limit?: number; // Optional prop for limiting the number of venues
// }

// // Haversine formula to calculate distance between two coordinates
// const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
//   const toRadians = (degrees: number) => degrees * (Math.PI / 180);
  
//   const R = 6371; // Earth's radius in kilometers
//   const dLat = toRadians(lat2 - lat1);
//   const dLng = toRadians(lng2 - lng1);
//   const a = 
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
//     Math.sin(dLng / 2) * Math.sin(dLng / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c; // Distance in kilometers
// };

// const Card: React.FC<CardProps> = ({ searchQuery, limit }) => {
//   const [venues, setVenues] = useState<Venue[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { location: userLocation, error: locationError, permissionDenied } = useUserLocation();
//   const [maxDistance, setMaxDistance] = useState(10); // Example max distance in kilometers
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchVenues = async () => {
//       try {
//         const params = permissionDenied
//           ? {} // Fetch all venues when location access is denied
//           : {
//               latitude: userLocation?.latitude,
//               longitude: userLocation?.longitude,
//               maxDistance,
//             };

//         const response = await axios.get(USER_API + "/getvenues", { params });
//         console.log(response.data.venues,"///////");
        
//         setVenues(response.data.venues);
//       } catch (error: any) {
//         showToast('Failed to fetch venues');
//         setError('Failed to fetch venues');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     // Fetch venues regardless of location access
//     fetchVenues();
//   }, [userLocation, maxDistance, permissionDenied]);

//   if (isLoading){
//     <LoadingSpinner/>
//   }
//   if (error) return <div>{error}</div>;

//   const filteredVenues = venues.filter((venue) =>
//     venue.place.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//   const displayedVenues = limit ? filteredVenues.slice(0, limit) : filteredVenues;

//   const handleViewDetails = (venueId: string) => {
//     navigate(`/single-venue/${venueId}`);
//   };

//   const handleViewMore = () => {
//     navigate('/book'); 
//   };

//   return (
//     <>
//       <div className="flex flex-wrap justify-around items-center p-5">
//         {displayedVenues.length > 0 ? (
//           displayedVenues.map((venue) => {
//             // Calculate distance if user location is available
//             const distance = userLocation ? calculateDistance(
//               userLocation.latitude,
//               userLocation.longitude,
//               venue.coordinates?.lat,
//               venue.coordinates?.lng
//             ) : 0;

//             return (
//               <div key={venue._id} className="bg-white rounded-lg shadow-md overflow-hidden duration-300 hover:-translate-y-1 w-[350px] mt-5">
//                 <img src={venue.primaryImage} alt={venue.name} className="w-full h-52 object-cover" />
//                 <div className="p-4">
//                   <h3 className="text-xl font-semibold">{venue.name}</h3>
//                   <p className="font-semibold">{venue.sportsitem}</p>
//                   <p className="text-gray-500">{venue.place}</p>
//                   {userLocation && (
//                     <div className="flex items-center text-gray-500 mt-2">
//                       <FaLocationArrow className="mr-2 mb-2" />
//                       <p className="mr-2 mb-2">Distance: {distance.toFixed(1)} km</p>
//                     </div>
//                   )}
//                   <StarRating rating={venue.averageRating} /> {/* Display star rating */}
//                   <div className="flex justify-end mt-2"> {/* Align button to the right */}
//                     <button
//                       className="px-4 py-2 rounded-full text-white font-semibold shadow-md transition-all duration-300 ease-in-out bg-green-500 hover:bg-green-600"
//                       onClick={() => handleViewDetails(venue._id)}
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <div className="text-center mt-10">
//             <h3 className="text-xl font-semibold">No venues found for "{searchQuery}"</h3>
//             <p className="text-gray-500">Try searching for a different location.</p>
//           </div>
//         )}
//       </div>
//       {limit === 4 && filteredVenues.length > 4 && (
//         <div className="flex justify-center mt-6 mb-8">
//           <button
//             className="px-6 py-2 rounded-full text-white font-semibold shadow-md transition-all duration-300 ease-in-out bg-green-500 hover:bg-green-600"
//             onClick={handleViewMore}
//           >
//             View More
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// export default Card;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { FaLocationArrow } from 'react-icons/fa';
// import showToast from '../../../utils/toaster';
// import { USER_API } from '../../../constants';
// import useUserLocation from '../../../hooks/useUserLocation';
// import StarRating from './starRating';
// import LoadingSpinner from '../../../pages/User/loading';
// import DatePicker from 'react-datepicker'; // Import DatePicker
// import 'react-datepicker/dist/react-datepicker.css'; // Import DatePicker styles

// interface Venue {
//   _id: string;
//   name: string;
//   primaryImage: string;
//   sportsitem: string;
//   place: string;
//   coordinates: {
//     lat: number;
//     lng: number;
//   };
//   averageRating: number;
// }

// interface CardProps {
//   searchQuery: string;
//   limit?: number;
// }

// const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
//   const toRadians = (degrees: number) => degrees * (Math.PI / 180);
//   const R = 6371;
//   const dLat = toRadians(lat2 - lat1);
//   const dLng = toRadians(lng2 - lng1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
//     Math.sin(dLng / 2) * Math.sin(dLng / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// };

// const Card: React.FC<CardProps> = ({ searchQuery, limit }) => {
//   const [venues, setVenues] = useState<Venue[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { location: userLocation, error: locationError, permissionDenied } = useUserLocation();
//   const [maxDistance, setMaxDistance] = useState(10);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null); // State for selected date
//   const navigate = useNavigate();

//   useEffect(() => {
//     // const fetchVenues = async () => {
//     //   try {
//     //     const params = {
//     //       latitude: userLocation?.latitude,
//     //       longitude: userLocation?.longitude,
//     //       maxDistance,
//     //       date: selectedDate?.toISOString().split('T')[0], // Format date for API call
//     //     };

//     //     const endpoint = selectedDate ? "/getvenuesbydate" : "/getvenues";
//     //     const response = await axios.get(USER_API + endpoint, {
//     //       params: selectedDate ? params : { latitude: userLocation?.latitude, longitude: userLocation?.longitude, maxDistance },
//     //     });
        
//     //     let venuesData;

//     //     // If fetching by date, restructure the data to match the normal format
//     //     if (selectedDate) {
//     //       venuesData = response.data.venues.map((slot: { venueId: any; date: any; startTime: any; endTime: any; price: any; }) => ({
//     //         ...slot.venueId,  // Extract venue details from venueId
//     //         date: slot.date,  // Include additional fields like date, startTime, endTime if needed
//     //         startTime: slot.startTime,
//     //         endTime: slot.endTime,
//     //         price: slot.price
//     //       }));
//     //     } else {
//     //       // Normal venue fetching without date
//     //       venuesData = response.data.venues;
//     //     }

//     //     console.log(venuesData, "Processed Venue Data");

//     //     setVenues(venuesData);
//     //   } catch (error: any) {
//     //     showToast('Failed to fetch venues');
//     //     setError('Failed to fetch venues');
//     //   } finally {
//     //     setIsLoading(false);
//     //   }
//     // };

//     const fetchVenues = async () => {
//       try {
//         const params = {
//           latitude: userLocation?.latitude,
//           longitude: userLocation?.longitude,
//           maxDistance,
//           date: selectedDate?.toISOString().split('T')[0], // Format date for API call
//         };
    
//         const endpoint = selectedDate ? "/getvenuesbydate" : "/getvenues";
//         const response = await axios.get(USER_API + endpoint, {
//           params: selectedDate ? params : { latitude: userLocation?.latitude, longitude: userLocation?.longitude, maxDistance },
//         });
    
//         let venuesData;
    
//         // If fetching by date, restructure the data to match the normal format
//         if (selectedDate) {
//           venuesData = response.data.venues.map((slot: { venueId: any; date: any; startTime: any; endTime: any; price: any; }) => ({
//             ...slot.venueId,  // Extract venue details from venueId
//             date: slot.date,  // Include additional fields like date, startTime, endTime if needed
//             startTime: slot.startTime,
//             endTime: slot.endTime,
//             price: slot.price
//           }));
//         } else {
//           // Normal venue fetching without date
//           venuesData = response.data.venues;
//         }
    
//         // Remove duplicates
//         const uniqueVenues = Array.from(new Set(venuesData.map((venue: { _id: any; }) => venue._id)))
//           .map(id => {
//             return venuesData.find((venue: { _id: unknown; }) => venue._id === id);
//           });
    
//         console.log(uniqueVenues, "Processed Venue Data");
    
//         setVenues(uniqueVenues);
//       } catch (error: any) {
//         showToast('Failed to fetch venues');
//         setError('Failed to fetch venues');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchVenues();
//   }, [userLocation, maxDistance, permissionDenied, selectedDate]);


  


//   if (isLoading) return <LoadingSpinner />;
//   if (error) return <div>{error}</div>;

//   const filteredVenues = venues.filter((venue) =>
//     venue.place?.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//   const displayedVenues = limit ? filteredVenues.slice(0, limit) : filteredVenues;

//   const handleViewDetails = (venueId: string) => {
//     navigate(`/single-venue/${venueId}`);
//   };

//   const handleViewMore = () => {
//     navigate('/book');
//   };

//   return (
//     <>
//       <div className="p-5">
//         <DatePicker
//           selected={selectedDate}
//           onChange={(date: Date | null) => setSelectedDate(date)}
//           dateFormat="yyyy-MM-dd"
//           className="mb-4 p-2 border border-gray-300 rounded"
//           placeholderText="Select a date"
//         />
//       </div>

//       <div className="flex flex-wrap justify-around items-center p-5">
//         {displayedVenues.length > 0 ? (
//           displayedVenues.map((venue) => {
//             const distance = userLocation ? calculateDistance(
//               userLocation.latitude,
//               userLocation.longitude,
//               venue.coordinates?.lat,
//               venue.coordinates?.lng
//             ) : 0;

//             return (
//               <div key={venue._id} className="bg-white rounded-lg shadow-md overflow-hidden duration-300 hover:-translate-y-1 w-[350px] mt-5">
//                 <img src={venue.primaryImage} alt={venue.name} className="w-full h-52 object-cover" />
//                 <div className="p-4">
//                   <h3 className="text-xl font-semibold">{venue.name}</h3>
//                   <p className="font-semibold">{venue.sportsitem}</p>
//                   <p className="text-gray-500">{venue.place}</p>
//                   {userLocation && (
//                     <div className="flex items-center text-gray-500 mt-2">
//                       <FaLocationArrow className="mr-2 mb-2" />
//                       <p className="mr-2 mb-2">Distance: {distance.toFixed(1)} km</p>
//                     </div>
//                   )}
//                   <StarRating rating={venue.averageRating} />
//                   <div className="flex justify-end mt-2">
//                     <button
//                       className="px-4 py-2 rounded-full text-white font-semibold shadow-md transition-all duration-300 ease-in-out bg-green-500 hover:bg-green-600"
//                       onClick={() => handleViewDetails(venue._id)}
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <div className="text-center mt-10">
//             <h3 className="text-xl font-semibold">No venues found </h3>
//             <p className="text-gray-500">Try searching for a different location or date.</p>
//           </div>
//         )}
//       </div>
//       {limit === 4 && filteredVenues.length > 4 && (
//         <div className="flex justify-center mt-6 mb-8">
//           <button
//             className="px-6 py-2 rounded-full text-white font-semibold shadow-md transition-all duration-300 ease-in-out bg-green-500 hover:bg-green-600"
//             onClick={handleViewMore}
//           >
//             View More
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// export default Card;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FaLocationArrow } from 'react-icons/fa';
// import showToast from '../../../utils/toaster';
// import { USER_API } from '../../../constants';
// import useUserLocation from '../../../hooks/useUserLocation';
// import StarRating from './starRating';
// import LoadingSpinner from '../../../pages/User/loading';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// interface Venue {
//   _id: string;
//   name: string;
//   primaryImage: string;
//   sportsitem: string;
//   place: string;
//   coordinates: {
//     lat: number;
//     lng: number;
//   };
//   averageRating: number;
// }

// interface CardProps {
//   searchQuery: string;
//   limit?: number;
// }

// const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
//   const toRadians = (degrees: number) => degrees * (Math.PI / 180);
//   const R = 6371;
//   const dLat = toRadians(lat2 - lat1);
//   const dLng = toRadians(lng2 - lng1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
//     Math.sin(dLng / 2) * Math.sin(dLng / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// };

// const Card: React.FC<CardProps> = ({ searchQuery, limit }) => {
//   const [venues, setVenues] = useState<Venue[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { location: userLocation, error: locationError, permissionDenied } = useUserLocation();
//   const [maxDistance, setMaxDistance] = useState(10);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchVenues = async () => {
//       try {
//         const params = {
//           latitude: userLocation?.latitude,
//           longitude: userLocation?.longitude,
//           maxDistance,
//           date: selectedDate?.toISOString().split('T')[0],
//         };

//         const endpoint = selectedDate ? "/getvenuesbydate" : "/getvenues";
//         const response = await axios.get(USER_API + endpoint, {
//           params: selectedDate ? params : { latitude: userLocation?.latitude, longitude: userLocation?.longitude, maxDistance },
//         });

//         let venuesData;

//         if (selectedDate) {
//           venuesData = response.data.venues.map((slot: { venueId: any; date: any; startTime: any; endTime: any; price: any; }) => ({
//             ...slot.venueId,
//             date: slot.date,
//             startTime: slot.startTime,
//             endTime: slot.endTime,
//             price: slot.price
//           }));
//         } else {
//           venuesData = response.data.venues;
//         }

//         // Remove duplicates
//         const uniqueVenues = Array.from(new Set(venuesData.map((venue: { _id: any; }) => venue._id)))
//           .map(id => {
//             return venuesData.find((venue: { _id: unknown; }) => venue._id === id);
//           });

//         console.log('Unique Venues:', uniqueVenues);

//         setVenues(uniqueVenues);
//       } catch (error: any) {
//         showToast('Failed to fetch venues');
//         setError('Failed to fetch venues');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchVenues();
//   }, [userLocation, maxDistance, permissionDenied, selectedDate]);

//   if (isLoading) return <LoadingSpinner />;
//   if (error) return <div>{error}</div>;

//   const filteredVenues = venues.filter((venue) =>
//     venue.place?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   console.log('Filtered Venues:', filteredVenues);

//   const displayedVenues = limit ? filteredVenues.slice(0, limit) : filteredVenues;

//   console.log('Displayed Venues:', displayedVenues);

//   const handleViewDetails = (venueId: string) => {
//     navigate(`/single-venue/${venueId}`);
//   };

//   const handleViewMore = () => {
//     navigate('/book');
//   };

//   return (
//     <>
//       <div className="p-5">
//         <DatePicker
//           selected={selectedDate}
//           onChange={(date: Date | null) => setSelectedDate(date)}
//           dateFormat="yyyy-MM-dd"
//           className="mb-4 p-2 border border-gray-300 rounded"
//           placeholderText="Select a date"
//         />
//       </div>

//       <div className="flex flex-wrap justify-around items-center p-5">
//         {displayedVenues.length > 0 ? (
//           displayedVenues.map((venue) => {
//             const distance = userLocation ? calculateDistance(
//               userLocation.latitude,
//               userLocation.longitude,
//               venue.coordinates?.lat,
//               venue.coordinates?.lng
//             ) : 0;

//             console.log('Venue Coordinates:', venue.coordinates);

//             return (
//               <div key={venue._id} className="bg-white rounded-lg shadow-md overflow-hidden duration-300 hover:-translate-y-1 w-[350px] mt-5">
//                 <img src={venue.primaryImage} alt={venue.name} className="w-full h-52 object-cover" />
//                 <div className="p-4">
//                   <h3 className="text-xl font-semibold">{venue.name}</h3>
//                   <p className="font-semibold">{venue.sportsitem}</p>
//                   <p className="text-gray-500">{venue.place}</p>
//                   {userLocation && (
//                     <div className="flex items-center text-gray-500 mt-2">
//                       <FaLocationArrow className="mr-2 mb-2" />
//                       <p className="mr-2 mb-2">Distance: {distance.toFixed(1)} km</p>
//                     </div>
//                   )}
//                   <StarRating rating={venue.averageRating} />
//                   <div className="flex justify-end mt-2">
//                     <button
//                       className="px-4 py-2 rounded-full text-white font-semibold shadow-md transition-all duration-300 ease-in-out bg-green-500 hover:bg-green-600"
//                       onClick={() => handleViewDetails(venue._id)}
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <div className="text-center mt-10">
//             <h3 className="text-xl font-semibold">No venues found</h3>
//             <p className="text-gray-500">Try searching for a different location or date.</p>
//           </div>
//         )}
//       </div>
//       {limit === 4 && filteredVenues.length > 4 && (
//         <div className="flex justify-center mt-6 mb-8">
//           <button
//             className="px-6 py-2 rounded-full text-white font-semibold shadow-md transition-all duration-300 ease-in-out bg-green-500 hover:bg-green-600"
//             onClick={handleViewMore}
//           >
//             View More
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// export default Card;


