import ActionButton from "../components/ActionButton";
import FormField from "../components/FormField";
import { useState } from "preact/hooks";

const ManageUsersTable = ({ users = [], onUpdate, onDeleteClick }) => {
  if (!users || users.length === 0) {
    return <p>No users available</p>;
  }

  const [editableData, setEditableData] = useState({});

  const handleInputChange = (userName, field, value) => {
    // Allow only positive numbers
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
    onUpdate(userName, mergedData);

    // Clear the editable data for this user after update
    setEditableData((prev) => {
      const { [userName]: _, ...rest } = prev;
      return rest;
    });
  };

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-center">User Name</th>
            <th className="px-6 py-3 text-center">Status</th>
            <th className="px-6 py-3 text-center">Age</th>
            <th className="px-6 py-3 text-center">Height</th>
            <th className="px-6 py-3 text-center">Weight</th>
            <th className="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
        {users
            .filter((user) => user.userName !== "admin") // Exclude admin
            .map((user) => {
            const isActive = user.isRegistered === "Y";
            const isPending = user.isRegistered === "N"; // Check if user is pending
            const editData = editableData[user.userName] || {};
            const hasChanges = Object.keys(editData).length > 0;

            return (
              <tr key={user.userName} className="text-center">
                <td>{user.userName}</td>
                <td>
                  <span
                    className={`px-2 py-1 text-sm font-medium rounded-full ${
                      isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {isActive ? "Active" : "Pending"}
                  </span>
                </td>
                <td>
                  <FormField
                    type="text"
                    label=""
                    value={editData.age ?? user.age}
                    placeholder="Enter age"
                    onChange={(e) =>
                      !isPending &&
                      handleInputChange(user.userName, "age", e.target.value)
                    }
                    disabled={isPending} // Disable if user is pending
                  />
                </td>
                <td>
                  <FormField
                    type="text"
                    label=""
                    value={editData.height ?? user.height}
                    placeholder="Enter height"
                    onChange={(e) =>
                      !isPending &&
                      handleInputChange(user.userName, "height", e.target.value)
                    }
                    disabled={isPending} // Disable if user is pending
                  />
                </td>
                <td>
                  <FormField
                    type="text"
                    label=""
                    value={editData.weight ?? user.weight}
                    placeholder="Enter weight"
                    onChange={(e) =>
                      !isPending &&
                      handleInputChange(user.userName, "weight", e.target.value)
                    }
                    disabled={isPending} // Disable if user is pending
                  />
                </td>
                <td className="flex justify-center space-x-2">
                  <ActionButton
                    label="Update"
                    iconClass="fas fa-edit"
                    onClick={() => handleUpdate(user.userName, user)}
                    className={`mr-2 ${
                      !isActive || !hasChanges ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!isActive || !hasChanges}
                  />
                    <ActionButton
                    label="Delete"
                    iconClass="fas fa-times"
                    onClick={() => onDeleteClick && !isPending && onDeleteClick(user.userName)}
                    className={`${
                        isPending 
                        ? "opacity-50 cursor-not-allowed bg-gray-500 dark:bg-gray-500" 
                        : "bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
                    }`}
                    disabled={isPending}
                    />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsersTable;
