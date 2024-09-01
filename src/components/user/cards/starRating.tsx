import React from 'react';

interface StarRatingProps {
  rating: number; // Rating out of 5
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);
  
  return (
    <div className="flex">
      {stars.map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          className={`w-5 h-5 ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
