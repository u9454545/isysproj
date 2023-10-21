// Import necessary modules and models
const User = require('../models/userModel'); // Import the User model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token generation
const crypto = require('crypto');


// Create an array to store blacklisted tokens
const tokenBlacklist = [];

// Function to add a token to the blacklist
const addToBlacklist = (token) => {
  tokenBlacklist.push(token);
};

function generateSecretKey() {
    const secret = crypto.randomBytes(32).toString('base64url');
    return secret;
}

console.log(generateSecretKey());

// User authentication (login)
const authenticateUser = async (req, res) => {
  try {
    // Extract user credentials from the request body
    const { username, password } = req.body;

    // Find the user in the database by username
    const user = await User.findOne({ username });

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed. User not found.' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match, return an error
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Authentication failed. Invalid password.' });
    }

    // If authentication is successful, generate a JWT token
    const token = jwt.sign({ userId: user._id, username: user.username }, 'your-secret-key', {
      expiresIn: '1h', // Token expiration time
    });

    // Return a success message and the generated token
    return res.status(200).json({ message: 'Authentication successful', token });
  } catch (error) {
    // Handle any errors that occur during authentication
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// User authorization (role-based access control)
const authoriseUser = (req, res, next) => {
  try {
    // Checking the user's role or permissions here
    
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'Authorization denied. Token not provided.' });
    }

    jwt.verify(token, 'your-secret-key', (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Authorization denied. Invalid token.' });
      }

      const { userId, username } = decodedToken;

      //using the decoded token information

      if (decodedToken.role === 'admin') {
        // Allow access to the protected resource
        req.user = { userId, username, role: 'admin' };
        next();
      } else {
        // Deny access if the user doesn't have the required role/permissions
        return res.status(403).json({ message: 'Authorization denied. Insufficient permissions.' });
      }
    });
  } catch (error) {
    // Handle  errors that occur during authorization
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
const registerUser = async (req, res) => {
  try {
    // Extract user registration data from the request body
    const { username, password } = req.body;

    // Check if the username is already taken
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
};