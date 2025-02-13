import { useState } from "preact/hooks";

const apiUrl = "https://web-fit-pro-back-rose.vercel.app/api/pendingUsers";

/**
 * Provides state management and core functionality for:
 * - Fetching pending users
 * - Approving users
 * - Sorting pending users list
 */
export const usePendingUsersLogic = () => {
    /**
     * Key state variables:
     * - pendingUsers: Current list of pending users
     * - originalPendingUsers: Backup of initial user list for reverting sorting
     * - sortMode: Manages current sorting state ('by Creation' or 'alphabetical')
     * - loading: loading state during initial data fetching. 
     */
    const [pendingUsers, setPendingUsers] = useState([]);
    const [originalPendingUsers, setOriginalPendingUsers] = useState([]); // Save the original list
    const [sortMode, setSortMode] = useState('default');
    const [loading, setLoading] = useState(true);

    // Fetches pending users from the data base
    const fetchPendingUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch("https://web-fit-pro-back-rose.vercel.app/api/pendingUsers", {
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
        finally {
            setLoading(false);
        }
    };

    // Approves a pending user moving them to active status
    const approveUser = async (userName) => {
        try {
            const response = await fetch(apiUrl, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  username: userName,
                }),
            });
            if(response.ok){
                setPendingUsers((prevUsers) =>
                    prevUsers.filter((user) => user.userName !== userName)
                );
                setOriginalPendingUsers((prevOriginal) =>
                    prevOriginal.filter((user) => user.userName !== userName)
                );
            }
        } catch (error) {
            console.error("Error approving user:", error);
        }
    };

    const sortUsers = (usersToSort) => {
        return [...usersToSort].sort((a, b) =>
            a.userName.localeCompare(b.userName)
        );
    };

    // Sorts users alphabetically or by Creation (default)
    const sortUsersByName = () => {
        setSortMode(prevMode => {
            if (prevMode === 'default') {
                const sortedUsers = sortUsers(pendingUsers);
                setPendingUsers(sortedUsers);
                return 'alphabetical';
            } else {
                setPendingUsers([...originalPendingUsers]);
                return 'default';
            }
        });
    };

    return {
        pendingUsers,
        sortMode,
        loading,
        fetchPendingUsers,
        approveUser,
        sortUsersByName,
    };
};
