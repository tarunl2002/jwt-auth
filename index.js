const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

// Sample database to store user information (for demonstration purposes)
const users = [];

app.use(bodyParser.json());

// Registration endpoint
app.post('/register', async (req, res) => {
  try {
    const { aadharNumber, name, phoneNumber, email, password } = req.body;

    // Check if user already exists
    if (users.some(user => user.aadharNumber === aadharNumber)) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      aadharNumber,
      name,
      phoneNumber,
      email,
      password: hashedPassword,
    };

    users.push(newUser);

    res.status(201).json({ message: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  console.log(users)
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { aadharNumber, password } = req.body;

    // Find the user by Aadhar number
    const user = users.find(user => user.aadharNumber === aadharNumber);

    if (!user) {
      return res.status(401).json({ error: 'Invalid Aadhar number or password' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid Aadhar number or password' });
    }

    // Generate and return a JWT token upon successful login
    const token = jwt.sign({ aadharNumber: user.aadharNumber }, 'your-secret-key');
    res.json({ token });``
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(users);
});
