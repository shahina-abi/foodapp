import Restaurant from '../models/restaurantModel.js'; // Import the restaurant model

// Function to get all restaurants
export const getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find(); // Fetch all restaurants from the database
        res.status(200).json(restaurants); // Respond with the restaurants
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};

// Function to add a new restaurant with logo upload
export const addRestaurant = async (req, res) => {
    const { name, location } = req.body; // Destructure name and location from the request body
    const logo = req.file ? `/uploads/${req.file.filename}` : null; // Handle logo upload

    try {
        const restaurant = await Restaurant.create({
            name,
            location,
            image: logo // Store the logo path in the database
        });

        res.status(201).json(restaurant); // Respond with the newly created restaurant
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};
