import ActionButton from "../components/ActionButton";

// component for row actions that can show multiple actions for the admin users management
const RowActions = ({ isActive, isPending, hasChanges, onUpdate, onDelete }) => (
    <div className="flex justify-center space-x-2">
      <ActionButton
        label="Update"
        iconClass="fas fa-edit"
        onClick={onUpdate}
        className={`${!isActive || !hasChanges ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={!isActive || !hasChanges}
      />
      <ActionButton
        label="Delete"
        iconClass="fas fa-times"
        onClick={onDelete}
        className={`${
          isPending 
            ? "opacity-50 cursor-not-allowed bg-gray-500 dark:bg-gray-500" 
            : "bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
        }`}
        disabled={isPending}
      />
    </div>
  );

  export default RowActions;