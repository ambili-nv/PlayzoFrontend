import { useState, useEffect } from 'react';

interface Location {
  latitude: number;
  longitude: number;
}

const useUserLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const geo = navigator.geolocation;
        if (!geo) {
          setError('Geolocation is not supported by this browser.');
          return;
        }

        geo.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
          },
          (err) => {
            setError('Failed to retrieve location.');
          }
        );
      } catch (err) {
        setError('An error occurred while fetching location.');
      }
    };

    fetchLocation();
  }, []);

  return { location, error };
};

export default useUserLocation;
