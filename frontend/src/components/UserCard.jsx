import FormField from "../components/FormField";
import ActionButton from "../components/ActionButton";

// Displays user information in a card format with optional editing capabilities
const UserCard = ({ 
  user, 
  editData, 
  isPending, 
  isActive, 
  hasChanges,
  onInputChange,
  onUpdate,
  onDelete,
  hideDefaultActions = false,
  customActions = null,
  showFields = true
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{user.userName}</h3>
        <span className={`px-2 py-1 text-sm font-medium rounded-full ${
          isActive ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
        }`}>
          {isActive ? "Active" : "Pending"}
        </span>
      </div>
      
      {showFields && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <FormField
              type="text"
              value={editData.age ?? user.age}
              placeholder="Enter age"
              onChange={(e) => !isPending && onInputChange(user.userName, "age", e.target.value)}
              disabled={isPending}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Height</label>
            <FormField
              type="text"
              value={editData.height ?? user.height}
              placeholder="Enter height"
              onChange={(e) => !isPending && onInputChange(user.userName, "height", e.target.value)}
              disabled={isPending}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Weight</label>
            <FormField
              type="text"
              value={editData.weight ?? user.weight}
              placeholder="Enter weight"
              onChange={(e) => !isPending && onInputChange(user.userName, "weight", e.target.value)}
              disabled={isPending}
            />
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-2 mt-4">
        {customActions}
        
        {!hideDefaultActions && (
          <>
            <ActionButton
              label="Update"
              iconClass="fas fa-edit"
              onClick={() => onUpdate(user.userName, user)}
              className={`${!isActive || !hasChanges ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={!isActive || !hasChanges}
            />
            <ActionButton
              label="Delete"
              iconClass="fas fa-times"
              onClick={() => onDelete && !isPending && onDelete(user.userName)}
              className={`${
                isPending 
                  ? "opacity-50 cursor-not-allowed bg-gray-500 dark:bg-gray-500" 
                  : "bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
              }`}
              disabled={isPending}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default UserCard;
