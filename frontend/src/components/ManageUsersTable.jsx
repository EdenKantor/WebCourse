import { useState, useEffect } from "preact/hooks";
import TableHeader from "../components/TableHeader";
import TableRow from "../components/TableRow";
import Pagination from "../components/Pagination";
import UserCard from "../components/UserCard";

/**
 * ManageUsersTable component displays and manages a list of users in both table and card views.
 *
 * Props:
 * - users: Array of user objects.
 * - onUpdate: Function to handle updates to user data.
 * - onDeleteClick: Function to handle deletion of a user.
 */
const ManageUsersTable = ({ users = [], onUpdate, onDeleteClick }) => {
  const [editableData, setEditableData] = useState({});
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const filteredUsers = users.filter((user) => user.userName !== "admin");

  useEffect(() => {
    if (currentCardIndex >= filteredUsers.length) {
      setCurrentCardIndex(Math.max(0, filteredUsers.length - 1));
    }
  }, [filteredUsers]);

  const handleInputChange = (userName, field, value) => {
    if (/^[1-9]\d*$/.test(value)) {
      setEditableData((prev) => ({
        ...prev,
        [userName]: { ...prev[userName], [field]: value },
      }));
    }
  };

  const handleUpdate = (userName, originalData) => {
    const updatedData = editableData[userName] || {};
    const mergedData = { ...originalData, ...updatedData };
    onUpdate(userName, mergedData, originalData.isRegistered === "Y");

    setEditableData((prev) => {
      const { [userName]: _, ...rest } = prev;
      return rest;
    });
  };

  if (!users || users.length === 0) {
    return <p>No users available</p>;
  }

  return (
    <div>
      {/* Desktop view */}
      <div className="hidden lg:block overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <TableHeader />
          <tbody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.userName}
                user={user}
                editData={editableData[user.userName] || {}}
                onInputChange={handleInputChange}
                onUpdate={handleUpdate}
                onDeleteClick={onDeleteClick}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="lg:hidden">
        {filteredUsers.length > 0 && currentCardIndex < filteredUsers.length && (
          <>
            <UserCard
              user={filteredUsers[currentCardIndex]}
              editData={editableData[filteredUsers[currentCardIndex].userName] || {}}
              isPending={filteredUsers[currentCardIndex].isRegistered === "N"}
              isActive={filteredUsers[currentCardIndex].isRegistered === "Y"}
              hasChanges={Object.keys(editableData[filteredUsers[currentCardIndex].userName] || {}).length > 0}
              onInputChange={handleInputChange}
              onUpdate={handleUpdate}
              onDelete={onDeleteClick}
            />
            <Pagination
              currentIndex={currentCardIndex}
              totalItems={filteredUsers.length}
              onNext={() => setCurrentCardIndex((prev) => prev < filteredUsers.length - 1 ? prev + 1 : prev)}
              onPrev={() => setCurrentCardIndex((prev) => prev > 0 ? prev - 1 : prev)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ManageUsersTable;
