/*const User = require('../models/userModel'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
const crypto = require('crypto');


// Create array storing black tokens
const tokenBlacklist = [];

// add to blacklist
const addToBlacklist = (token) => {
  tokenBlacklist.push(token);
};

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken. Please choose a different one.' });
    }

    // Hash the user's password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: 'User registration successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const logoutUser = (req, res) => {
  try {
    // Extract the token from the request
    const token = req.header('Authorization');

    if (!token) {
      return res.status(400).json({ message: 'Token not provided' });
    }

    // Check if the token is in the blacklist
    if (tokenBlacklist.includes(token)) {
      return res.status(401).json({ message: 'Token has already been invalidated' });
    }

    // Add the token to the blacklist
    addToBlacklist(token);

    return res.status(200).json({ message: 'User logout successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Export the auth controller
module.exports = {
  authenticateUser,
  authoriseUser,
  registerUser,
  logoutUser,
};*/

// delete this