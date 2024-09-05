import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaLocationArrow } from 'react-icons/fa'; // Importing the icon from React Icons
import showToast from '../../../utils/toaster';
import { USER_API } from '../../../constants';
import useUserLocation from '../../../hooks/useUserLocation'; // Import the custom hook
import StarRating from './starRating'; // Import the StarRating component
import LoadingSpinner from '../../../pages/User/loading';

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
  averageRating: number; // Add averageRating to Venue interface
}

interface CardProps {
  searchQuery: string;
  limit?: number; // Optional prop for limiting the number of venues
}

// Haversine formula to calculate distance between two coordinates
const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const toRadians = (degrees: number) => degrees * (Math.PI / 180);
  
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

const Card: React.FC<CardProps> = ({ searchQuery, limit }) => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { location: userLocation, error: locationError, permissionDenied } = useUserLocation();
  const [maxDistance, setMaxDistance] = useState(10); // Example max distance in kilometers
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const params = permissionDenied
          ? {} // Fetch all venues when location access is denied
          : {
              latitude: userLocation?.latitude,
              longitude: userLocation?.longitude,
              maxDistance,
            };

        const response = await axios.get(USER_API + "/getvenues", { params });
        setVenues(response.data.venues);
      } catch (error: any) {
        showToast('Failed to fetch venues');
        setError('Failed to fetch venues');
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch venues regardless of location access
    fetchVenues();
  }, [userLocation, maxDistance, permissionDenied]);

  if (isLoading){
    <LoadingSpinner/>
  }
  if (error) return <div>{error}</div>;

  const filteredVenues = venues.filter((venue) =>
    venue.place.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const displayedVenues = limit ? filteredVenues.slice(0, limit) : filteredVenues;

  const handleViewDetails = (venueId: string) => {
    navigate(`/single-venue/${venueId}`);
  };

  const handleViewMore = () => {
    navigate('/book'); 
  };

  return (
    <>
      <div className="flex flex-wrap justify-around items-center p-5">
        {displayedVenues.length > 0 ? (
          displayedVenues.map((venue) => {
            // Calculate distance if user location is available
            const distance = userLocation ? calculateDistance(
              userLocation.latitude,
              userLocation.longitude,
              venue.coordinates?.lat,
              venue.coordinates?.lng
            ) : 0;

            return (
              <div key={venue._id} className="bg-white rounded-lg shadow-md overflow-hidden duration-300 hover:-translate-y-1 w-[350px] mt-5">
                <img src={venue.primaryImage} alt={venue.name} className="w-full h-52 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{venue.name}</h3>
                  <p className="font-semibold">{venue.sportsitem}</p>
                  <p className="text-gray-500">{venue.place}</p>
                  {userLocation && (
                    <div className="flex items-center text-gray-500 mt-2">
                      <FaLocationArrow className="mr-2 mb-2" />
                      <p className="mr-2 mb-2">Distance: {distance.toFixed(1)} km</p>
                    </div>
                  )}
                  <StarRating rating={venue.averageRating} /> {/* Display star rating */}
                  <div className="flex justify-end mt-2"> {/* Align button to the right */}
                    <button
                      className="px-4 py-2 rounded-full text-white font-semibold shadow-md transition-all duration-300 ease-in-out bg-green-500 hover:bg-green-600"
                      onClick={() => handleViewDetails(venue._id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center mt-10">
            <h3 className="text-xl font-semibold">No venues found for "{searchQuery}"</h3>
            <p className="text-gray-500">Try searching for a different location.</p>
          </div>
        )}
      </div>
      {limit === 4 && filteredVenues.length > 4 && (
        <div className="flex justify-center mt-6 mb-8">
          <button
            className="px-6 py-2 rounded-full text-white font-semibold shadow-md transition-all duration-300 ease-in-out bg-green-500 hover:bg-green-600"
            onClick={handleViewMore}
          >
            View More
          </button>
        </div>
      )}
    </>
  );
};

export default Card;
