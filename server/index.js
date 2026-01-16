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
app.post('/api/login', async (req, res) => {
    console.log('Login attempt:', req.body);
    const { username, password } = req.body;

    try {
        const users = getUsers();
        console.log(`Loaded ${users.length} users.`);

        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            console.log('User found, generating token...');

            let profile = { ...user.profile };

            // Special handling for SPV user - fetch external token
            if (user.username === 'SPV') {
                try {
                    console.log('Fetching external token for SPV...');
                    const externalRes = await fetch('https://api-fashion-ai.blacksky-cb6688f2.southindia.azurecontainerapps.io/auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'accept': 'application/json'
                        },
                        body: JSON.stringify({
                            email: "SPV",
                            password: "SPV"
                        })
                    });

                    if (externalRes.ok) {
                        const data = await externalRes.json();
                        if (data.access_token) {
                            console.log('External token retrieved successfully');
                            profile.apiToken = data.access_token;
                        }
                    } else {
                        console.error('External auth failed:', externalRes.status, externalRes.statusText);
                    }
                } catch (extError) {
                    console.error('Error fetching external token:', extError);
                }
            }

            // Explicitly define token
            const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
            res.json({ success: true, token: token, profile: profile });
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
app.post('/api/verify', async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(401).json({ valid: false });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const users = getUsers();
        const user = users.find(u => u.id === decoded.id);

        if (user) {
            let profile = { ...user.profile };

            // Re-fetch external token for SPV if verifying session
            if (user.username === 'SPV') {
                try {
                    console.log('Refreshing external token for SPV during verify...');
                    const externalRes = await fetch('https://api-fashion-ai.blacksky-cb6688f2.southindia.azurecontainerapps.io/auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'accept': 'application/json'
                        },
                        body: JSON.stringify({
                            email: "SPV",
                            password: "SPV"
                        })
                    });

                    if (externalRes.ok) {
                        const data = await externalRes.json();
                        if (data.access_token) {
                            profile.apiToken = data.access_token;
                        }
                    }
                } catch (extError) {
                    console.error('Error refreshing external token:', extError);
                }
            }

            res.json({ valid: true, profile: profile });
        } else {
            res.json({ valid: false });
        }
    } catch (err) {
        res.json({ valid: false });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log("SERVER RESTARTED WITH FIX - READY TO LOGIN");
});
