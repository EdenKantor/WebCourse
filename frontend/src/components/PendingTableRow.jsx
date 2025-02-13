/**
 * Row component for the pending users table
 * Displays user information and approval action
 */
import ActionButton from './ActionButton';
import StatusBadge from './StatusBadge';

const PendingTableRow = ({ user, onApprove }) => {
  const status = user.isRegistered === "Y" 
    ? { text: "Active", classes: "bg-green-100 text-green-700" }
    : { text: "Pending", classes: "bg-yellow-100 text-yellow-700" };

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
      <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
        {user.userName}
      </td>
      <td className="px-6 py-4 text-sm">
        <StatusBadge isActive={user.isRegistered === "Y"} />
      </td>
      <td className="px-6 py-4">
        <ActionButton
          label="Approve"
          iconClass="fas fa-check"
          onClick={() => onApprove(user.userName)}
          className="py-2 px-4 text-sm"
        />
      </td>
    </tr>
  );
};

export default PendingTableRow;