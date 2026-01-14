const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3001;
const SECRET_KEY = process.env.JWT_SECRET || 'vogue-ai-secret-key-2026';

app.use(cors());
app.use(express.json());

// Health Check
app.get('/', (req, res) => {
    res.send('Fashion Rec App Backend is Running! 🚀. Access frontend at http://localhost:5173');
});

// Load User Database
const USERS_FILE = path.join(__dirname, 'users.json');
const getUsers = () => {
    try {
        const data = fs.readFileSync(USERS_FILE);
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading users.json:", error);
        return [];
    }
};

// Login Endpoint
app.post('/api/login', (req, res) => {
    console.log('Login attempt:', req.body);
    const { username, password } = req.body;

    try {
        const users = getUsers();
        console.log(`Loaded ${users.length} users.`);

        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            console.log('User found, generating token...');
            // Explicitly define token
            const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
            res.json({ success: true, token: token, profile: user.profile });
            console.log('Login successful.');
        } else {
            console.log('Invalid credentials.');
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Verify Token Endpoint
app.post('/api/verify', (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(401).json({ valid: false });

    try {
        jwt.verify(token, SECRET_KEY);
        res.json({ valid: true });
    } catch (err) {
        res.json({ valid: false });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log("SERVER RESTARTED WITH FIX - READY TO LOGIN");
});
