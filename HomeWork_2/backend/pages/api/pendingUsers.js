import { getPendingUsers, registerUser } from '../../lib/UsersDB';

export default async function handler(req, res) {
    setCorsHeaders(res);

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        if (req.method === 'GET') {
            const users = await getPendingUsers();
            return res.status(200).json({ users });
        }
        
        if (req.method === 'PUT') {
            const { username } = req.query;
            if (!username) {
                return res.status(400).json({ message: 'Username is required' });
            }

            await registerUser(username);
            return res.status(200).json({ message: "Changed Status isRegistered Succesfully" });
        }

        return res.status(405).json({ message: 'Method not allowed' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

function setCorsHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}