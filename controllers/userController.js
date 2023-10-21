const User = require('../models/userModel'); 
const jwt = require('jsonwebtoken'); // Import JWT for authentication
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing

// Register a new user
const registerUser = async (req, res) => {
  console.log("reaching registerUser");
  console.log(req.body);
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    const newUser = new User({ name, email, password });
    const savedUser = await newUser.save();
    
    // Generate a JWT token for authentication
    const token = jwt.sign({ userId: savedUser._id }, 'our-secret-key', { expiresIn: '1h' });

    res.status(201).json({ user: savedUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({ success: false, error: 'User not found' });
    }

    if (password !== user.password) {
      return res.status(401).json({ success: false, error: 'Invalid password' });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ userId: user._id }, 'our-secret-key', { expiresIn: '1h' });

    // Return the token, user details (without password)
    res.status(200).json({ success: true, user: { ...user._doc, password: undefined }, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};





// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    // Get the user ID from the request
    const userId = req.params.id;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's profile fields with data from the request body
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // Check if a new password is provided and hash it
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    // Save the updated user object
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fetch all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fetch a specific user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  console.log(req.params)
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Export the user controller
module.exports = {
  registerUser,
  loginUser,
  updateUserProfile,
  getAllUsers,
  getUserById,
  deleteUser
};