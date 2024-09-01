import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { USER_API } from '../../../constants';

interface Review {
  _id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewsProps {
  venueId: string;
}

const Reviews: React.FC<ReviewsProps> = ({ venueId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${USER_API}/venues/${venueId}/reviews`);
        setReviews(response.data.reviews);
      } catch (error) {
        setError('Error fetching reviews.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [venueId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="border p-4 mb-4 rounded-lg shadow-md">
            <h4 className="text-lg font-bold">User {review.userId}</h4>
            <p className="text-yellow-500">Rating: {review.rating}</p>
            <p>{review.comment}</p>
            <p className="text-gray-500 text-sm">
              Date: {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default Reviews;
