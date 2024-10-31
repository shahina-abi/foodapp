import express from 'express';
import { addReview, getRestaurantReviews, deleteReview } from '../controllers/reviewController.js';
import { authUser } from '../middleware/authUser.js';

const router = express.Router();

router.post('/', authUser, addReview);                     // Add a review (authenticated users only)
router.get('/:restaurantId', getRestaurantReviews);        // Get all reviews for a specific restaurant
router.delete('/:id', authUser, deleteReview);             // Delete a review (review author or admin only)

export default router;
