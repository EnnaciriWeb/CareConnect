import React, { useState } from 'react';
import { Review } from '../types';

interface ReviewsProps {
  addNotification: (message: string, type: 'success' | 'error' | 'info') => void;
}

const initialReviews: Review[] = [
  { id: 1, author: "Jane Doe", rating: 5, comment: "Dr. Smith was incredibly attentive and kind.", date: "2023-10-15" },
  { id: 2, author: "John Smith", rating: 4, comment: "Great facility, but the wait time was a bit long.", date: "2023-10-20" },
  { id: 3, author: "Emily White", rating: 5, comment: "Best dental experience I've ever had!", date: "2023-10-25" },
];

export const Reviews: React.FC<ReviewsProps> = ({ addNotification }) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReview, setNewReview] = useState({ author: '', comment: '', rating: 5 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.comment) {
      addNotification("Please fill in all fields", 'error');
      return;
    }

    const review: Review = {
      id: Date.now(),
      ...newReview,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([review, ...reviews]);
    setNewReview({ author: '', comment: '', rating: 5 });
    addNotification("Review submitted successfully!", 'success');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Patient Reviews</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Review Form */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-fit sticky top-24">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Leave a Review</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                value={newReview.author}
                onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <div className="flex space-x-2 text-2xl text-yellow-400 cursor-pointer">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    className={`${star <= newReview.rating ? 'fas' : 'far'} fa-star hover:scale-110 transition-transform`}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                  ></i>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition h-32 resize-none"
                placeholder="Share your experience..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-sky-600 transition duration-300 shadow-md"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                    {review.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{review.author}</h4>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`${i < review.rating ? 'fas' : 'far'} fa-star`}></i>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 italic">"{review.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};