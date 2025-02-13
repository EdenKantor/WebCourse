import FormField from "../components/FormField";
import StatusBadge from "../components/StatusBadge";
import RowActions from "../components/RowActions";

/**
 * Row component for the Manage users table
 * Displays user information and admin actions
 */
const TableRow = ({ user, editData, onInputChange, onUpdate, onDeleteClick }) => {
    const isActive = user.isRegistered === "Y";
    const isPending = user.isRegistered === "N";
    const hasChanges = Object.keys(editData).length > 0;
  
    return (
      <tr className="text-center">
        <td className="px-6 py-4 truncate">{user.userName}</td>
        <td className="px-6 py-4">
          <StatusBadge isActive={isActive} />
        </td>
        <td className="px-6 py-4">
          <FormField
            type="text"
            value={editData.age ?? user.age}
            placeholder="Enter age"
            onChange={(e) => !isPending && onInputChange(user.userName, "age", e.target.value)}
            disabled={isPending}
            className="w-full"
          />
        </td>
        <td className="px-6 py-4">
          <FormField
            type="text"
            value={editData.height ?? user.height}
            placeholder="Enter height"
            onChange={(e) => !isPending && onInputChange(user.userName, "height", e.target.value)}
            disabled={isPending}
            className="w-full"
          />
        </td>
        <td className="px-6 py-4">
          <FormField
            type="text"
            value={editData.weight ?? user.weight}
            placeholder="Enter weight"
            onChange={(e) => !isPending && onInputChange(user.userName, "weight", e.target.value)}
            disabled={isPending}
            className="w-full"
          />
        </td>
        <td className="px-6 py-4">
          <RowActions
            isActive={isActive}
            isPending={isPending}
            hasChanges={hasChanges}
            onUpdate={() => onUpdate(user.userName, user)}
            onDelete={() => onDeleteClick && !isPending && onDeleteClick(user.userName)}
          />
        </td>
      </tr>
    );
  };

  export default TableRow;