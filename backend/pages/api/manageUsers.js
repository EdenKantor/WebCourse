import { getUsers, updateUserDetails, deleteUser } from '../../lib/UsersDB';
import { getURLsByUser , deleteFromUsersLike } from '../../lib/UsersLikeDB';
import { changeLikeCount} from '../../lib/VideosDB';
import { deleteFromUserSessions } from '../../lib/UserSessionsDB'

export default async function handler(req, res) {
    setCorsHeaders(res);

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        if (req.method === 'GET') {
            const users = await getUsers();
            return res.status(200).json({ users });
        }

        if (req.method === 'PUT') {
            const { username } = req.query;
            const updates = JSON.parse(req.body);

            await updateUserDetails(
                username, 
                updates.age, 
                updates.height,
                updates.weight
            );

            return res.status(200).json({ message: "Changed User Details Successfully" });
        }

        if (req.method === 'DELETE') {
            const { username } = req.query;
            console.log("here", username);
            try {
         // 2. Handle UsersLike deletion and video like count updates
          // Get all URLs liked by the user
                const userUrls = await getURLsByUser(username);
                console.log("UserURLS");
                // Update like count for each video
                for (const url of userUrls) {
                    await changeLikeCount(url, -1);
                }
                console.log("Users Like");
                const message1 = await deleteFromUserSessions(username);
                console.log(message1 , "1");
                const message2 = await deleteFromUsersLike(username);
                console.log(message2, "2");
                const message3 = await deleteUser(username);
                console.log(message3, "3");
                return res.status(200).json({ message: "Delete user completlly succesful" });
            } catch (error) {
                return res.status(500).json({ message: error });
            }
        }

        res.status(405).json({ error: "Method not allowed" });
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

function setCorsHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}