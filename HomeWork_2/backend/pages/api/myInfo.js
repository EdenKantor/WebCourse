import { getUserByUsername, updateUserDetails } from '../../lib/UsersDB';

export default async function handler(req, res) {
    setCorsHeaders(res);

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        return handleGetRequest(req, res);
    }

    if (req.method === 'PATCH') {
        return handlePatchRequest(req, res);
    }

    return res.status(405).json({ message: 'Method not allowed' });
}

// Handle GET request to fetch a user by username
async function handleGetRequest(req, res) {
    const { userName } = req.query;
    if (!userName) {
        return res.status(400).json({ message: 'Username is required' });
    }

    try {
        const user = await getUserByUsername(userName);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ user });
    } catch (error) {
        return handleError(error, res);
    }
}

// Handle PATCH request to update user details
async function handlePatchRequest(req, res) {
    const { userName, age, height, weight } = req.body;
    if (!userName || age == null || height == null || weight == null) {
        return res.status(400).json({ message: 'Username, age, height, and weight are required' });
    }

    try {
        const result = await updateUserDetails(userName, age, height, weight);
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User details updated successfully' });
    } catch (error) {
        return handleError(error, res);
    }
}

// Function to set CORS headers
function setCorsHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}


// Function to handle errors
function handleError(error, res) {
    console.error('Internal server error:', error);
    return res.status(500).json({ message: 'Internal server error', error });
}