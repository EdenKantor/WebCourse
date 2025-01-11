import { useState } from "preact/hooks";

export const usePendingUsersLogic = () => {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [originalPendingUsers, setOriginalPendingUsers] = useState([]); // Save the original list
    const [isSorted, setIsSorted] = useState(false); // Whether the table is currently sorted

    const fetchPendingUsers = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/pendingUsers", {
                method: "GET",
            });
            const data = await response.json();
            setPendingUsers(data.users || []);
            setOriginalPendingUsers(data.users || []); // Save the original list
        } catch (error) {
            console.error("Error fetching pending users:", error);
            setPendingUsers([]);
            setOriginalPendingUsers([]);
        }
    };

    const approveUser = async (userName) => {
        try {
            await fetch(`http://localhost:3000/api/pendingUsers?username=${userName}`, {
                method: "PUT",
            });
            setPendingUsers((prevUsers) =>
                prevUsers.filter((user) => user.userName !== userName)
            );
            setOriginalPendingUsers((prevOriginal) =>
                prevOriginal.filter((user) => user.userName !== userName)
            );
            return true;
        } catch (error) {
            console.error("Error approving user:", error);
            return false;
        }
    };

    const sortUsers = (usersToSort) => {
        return [...usersToSort].sort((a, b) =>
            a.userName.localeCompare(b.userName)
        );
    };

    const sortUsersByName = () => {
        if (isSorted) {
            setPendingUsers([...originalPendingUsers]); // Reset to the unsorted state
            setIsSorted(false);
        } else {
            const sortedUsers = sortUsers(pendingUsers); // Sort in ascending order
            setPendingUsers(sortedUsers);
            setIsSorted(true);
        }
    };

    return {
        pendingUsers,
        fetchPendingUsers,
        approveUser,
        sortUsersByName,
    };
};
