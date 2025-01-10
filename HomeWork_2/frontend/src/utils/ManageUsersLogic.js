import { useState } from 'preact/hooks';

export const useManageUsersLogic = () => {
   // State variables
   // Current users array displayed in the table
   const [users, setUsers] = useState([]);
   // Original users array - used to revert to initial state after sorting
   const [originalUsers, setOriginalUsers] = useState([]);
   // Whether the table is currently sorted
   const [isSorted, setIsSorted] = useState(false);
   // Sort direction (ascending or descending)
   const [sortDirection, setSortDirection] = useState("asc");
   // Whether to show delete popup
   const [showPopup, setShowPopup] = useState(false);
   // Username selected for deletion
   const [userToDelete, setUserToDelete] = useState(null);
   // Whether to show update success popup
   const [showUpdatePopup, setShowUpdatePopup] = useState(false);
   // Username that was successfully updated
   const [updatedUserName, setUpdatedUserName] = useState(null);

   // Function to load users from server
   const fetchUsers = async () => {
       try {
           const response = await fetch('http://localhost:3000/api/manageUsers', {
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
   };
   
   // Function to update user
   const updateUser = async (userName, updates) => {
       try {
           // Send update request to server
           await fetch(`http://localhost:3000/api/manageUsers?username=${userName}`, {
               method: 'PUT',
               body: JSON.stringify(updates),
           });

           // Update current users array
           setUsers((prevUsers) => {
               // Map over existing array and update specific user
               const updatedUsers = prevUsers.map((user) =>
                   user.userName === userName ? { ...user, ...updates } : user
               );
               // If table is sorted - maintain sorting
               return isSorted 
                   ? sortUsers(updatedUsers, sortDirection) 
                   : updatedUsers;
           });

           // Update original users array
           setOriginalUsers((prevOriginal) =>
               prevOriginal.map((user) =>
                   user.userName === userName ? { ...user, ...updates } : user
               )
           );
           
           // Show success popup
           setUpdatedUserName(userName);
           setShowUpdatePopup(true);
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
           const response =  await fetch(`http://localhost:3000/api/manageUsers?username=${userName}`, {
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
   const sortUsers = (usersToSort, direction) => {
       return [...usersToSort].sort((a, b) =>
           direction === "asc"
               ? a.userName.localeCompare(b.userName)
               : b.userName.localeCompare(a.userName)
       );
   };

   // Function to sort table
   const sortUsersByName = () => {
       if (isSorted) {
           // If already sorted - return to original state
           setUsers([...originalUsers]);
           setIsSorted(false);
       } else {
           // Sort users in ascending order
           setUsers(sortUsers(users, "asc"));
           setSortDirection("asc");
           setIsSorted(true);
       }
   };

   // Return all required functions and State variables
   return {
       users,
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