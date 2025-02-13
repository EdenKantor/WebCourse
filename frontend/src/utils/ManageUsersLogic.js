import { useState } from 'preact/hooks';

/**
* This custom hook provides state management and core functionality for 
 * handling user operations in an admin dashboard:
 * - Fetching users from the server
 * - Updating user information
 * - Deleting users
 * - Managing sorting and display states
 */
export const useManageUsersLogic = () => {
   /**
    * State Management for User Operations
    * 
    * Key state variables:
    * - users: Current list of users displayed in the table
    * - originalUsers: Backup of initial user list for reverting sorting
    * - sortMode: Manages current sorting state ('By Creation' or 'alphabetical')
    * - showPopup: Controls visibility of delete confirmation popup
    * - userToDelete: Stores username selected for deletion
    * - showUpdatePopup: Controls visibility of user update success popup
    * - loading: loading state during initial data fetching. 
    */
   const [users, setUsers] = useState([]);
   const [originalUsers, setOriginalUsers] = useState([]);
   const [sortMode, setSortMode] = useState('default');
   const [showPopup, setShowPopup] = useState(false);
   const [userToDelete, setUserToDelete] = useState(null);
   const [showUpdatePopup, setShowUpdatePopup] = useState(false);
   const [updatedUserName, setUpdatedUserName] = useState(null);
   const [loading, setLoading] = useState(true);

   // Function to load users from server
   const fetchUsers = async () => {
       try {
           setLoading(true);
           const response = await fetch('https://web-fit-pro-back-rose.vercel.app/api/manageUsers', {
               method: 'GET' 
           });
           const data = await response.json();
           // Update both arrays - current and original
           setUsers(data.users || []);
           setOriginalUsers(data.users || []);
       } catch (error) {
           console.error("Failed to fetch users:", error);
           // In case of error - reset arrays
           setUsers([]);
           setOriginalUsers([]);
       }
       finally {
            setLoading(false);
    }
   };
   
   // Function to update user
   const updateUser = async (userName, updates, isActive) => {
       try {
           // Send update request to server
           await fetch(`https://web-fit-pro-back-rose.vercel.app/api/manageUsers?username=${userName}`, {
               method: 'PATCH',
               body: JSON.stringify(updates),
           });

           // Update current users array
           setUsers((prevUsers) => {
               // Map over existing array and update specific user
               const updatedUsers = prevUsers.map((user) =>
                   user.userName === userName ? { ...user, ...updates } : user
               );
               // If table is sorted - maintain sorting
               return sortMode === 'alphabetical' 
                   ? sortUsers(updatedUsers) 
                   : updatedUsers;
           });

           // Update original users array
           setOriginalUsers((prevOriginal) =>
               prevOriginal.map((user) =>
                   user.userName === userName ? { ...user, ...updates } : user
               )
           );
           
           // Only show popup if user is Active (isRegistered === "Y")
           if (isActive) {
            setUpdatedUserName(userName);
            setShowUpdatePopup(true);
        }
       } catch (error) {
           console.error("Failed to update user:", error);
       }
   };

   // Function to close update popup
   const handleCloseUpdatePopup = () => {
       setShowUpdatePopup(false);
       setUpdatedUserName(null);
   };

   // Function to delete user
   const deleteUser = async (userName) => {
       try {
           // Send delete request to server
           const response =  await fetch(`https://web-fit-pro-back-rose.vercel.app/api/manageUsers?username=${userName}`, {
               method: 'DELETE',
           });

           if (response.ok) {
            // Remove user from both arrays
           setUsers((prevUsers) => prevUsers.filter(user => user.userName !== userName));
           setOriginalUsers((prevUsers) => prevUsers.filter(user => user.userName !== userName));
           
           // Close delete popup
           setShowPopup(false);
           setUserToDelete(null);
           }
           else{
            console.error("Delete User Process Failed");
           }

       } catch (error) {
           console.error("Failed to delete user:", error);
       }
   };

   // Function to show delete popup
   const handleDeleteClick = (userName) => {
       setUserToDelete(userName);
       setShowPopup(true);
   };

   // Function to close delete popup
   const handleClosePopup = () => {
       setShowPopup(false);
       setUserToDelete(null);
   };

    // Helper function to sort users by name
    const sortUsers = (usersToSort, direction = "asc") => {
        return [...usersToSort].sort((a, b) =>
            direction === "asc"
                ? a.userName.localeCompare(b.userName)
                : b.userName.localeCompare(a.userName)
        );
    };

    // Function to sort table
    const sortUsersByName = () => {
        if (sortMode === 'default') {
            // Sort users alphabetically
            const sortedUsers = sortUsers(users);
            setUsers(sortedUsers);
            setSortMode('alphabetical');
        } else {
            // Return to original list
            setUsers([...originalUsers]);
            setSortMode('default');
        }
    };

   // Return all required functions and State variables
   return {
       users,
       loading,
       sortMode,
       updateUser,
       sortUsersByName,
       fetchUsers,
       deleteUser,
       handleDeleteClick,
       handleClosePopup,
       showPopup,
       userToDelete,
       showUpdatePopup,
       updatedUserName,
       handleCloseUpdatePopup,
   };
};
