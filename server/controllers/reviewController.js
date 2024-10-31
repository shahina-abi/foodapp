  import Review from '../models/reviewModel.js';

// Add a review for a restaurant
export const addReview = async (req, res) => {
    const { restaurant, rating, comment } = req.body;
    const review = new Review({ user: req.user.userId, restaurant, rating, comment });
    await review.save();

    res.status(201).json({ message: 'Review added successfully', review });
};

// Get all reviews for a specific restaurant
export const getRestaurantReviews = async (req, res) => {
    const reviews = await Review.find({ restaurant: req.params.restaurantId }).populate('user');
    res.json(reviews);
};

// Delete a review (only admin or review author can delete)
export const deleteReview = async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.user.toString() !== req.user.userId && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    await review.remove();
    res.json({ message: 'Review deleted successfully' });
};
