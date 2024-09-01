import React, { useState } from 'react';
import { USER_API } from '../../../constants';
import { FaStar, FaRegStar } from 'react-icons/fa';
import axiosInstance from '../../../utils/axiosInstance';
import showToast from '../../../utils/toaster'; // Import the showToast utility

interface ReviewFormProps {
  venueId: string;
  onReviewSubmitted: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ venueId, onReviewSubmitted }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`${USER_API}/reviews`, { venueId, rating, comment });
      console.log(response,"rating res");
      
      if(response.data){
              // Reset form values after successful submission
      setRating(0);
      setComment('');

      // Show success message using showToast
      showToast('Review submitted successfully!', 'success');

      // Notify parent component that review was submitted
      onReviewSubmitted();
      }

    } catch (error) {
      // Show error message using showToast
      showToast('Error submitting review. Please try again.', 'error');
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          onClick={() => handleStarClick(i)}
          className="focus:outline-none"
        >
          {i < rating ? (
            <FaStar className="text-yellow-500" />
          ) : (
            <FaRegStar className="text-gray-300" />
          )}
        </button>
      );
    }
    return stars;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Rating:</label>
        <div className="flex space-x-1 mt-1">
          {renderStars()}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 rounded-full bg-green-500 text-white font-semibold shadow-md transition-all duration-300 ease-in-out hover:bg-green-600"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
