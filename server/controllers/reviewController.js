import Review from '../models/reviewModel.js';

// Add a review
export const addReview = async (req, res) => {
  const { food, rating, comment } = req.body;
  const review = await Review.create({
    user: req.user._id,
    food,
    rating,
    comment,
  });
  res.status(201).json(review);
};

// Get reviews for a food item
export const getReviews = async (req, res) => {
  const reviews = await Review.find({ food: req.params.foodId }).populate('user', 'name');
  res.json(reviews);
};
