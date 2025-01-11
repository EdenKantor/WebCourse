import ActionButton from '../components/ActionButton';

const UsersTable = ({ users = [], onApprove }) => {
  if (users.length === 0) {
      return <div className="text-center p-4">No pending users found</div>;
  }

  const getStatusDisplay = (isRegistered) => {
      return isRegistered === "Y" 
          ? { text: "Active", classes: "bg-green-100 text-green-700" }
          : { text: "Pending", classes: "bg-yellow-100 text-yellow-700" };
  };

  return (
      <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white dark:bg-gray-800">
              <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-200">User Name</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-200">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-200">Action</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {users.map((user) => {
                      const status = getStatusDisplay(user.isRegistered);
                      return (
                          <tr key={user.userName} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                              <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">{user.userName}</td>
                              <td className="px-6 py-4 text-sm">
                                  <span className={`px-3 py-1 rounded-full ${status.classes}`}>
                                      {status.text}
                                  </span>
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
                  })}
              </tbody>
          </table>
      </div>
  );
};

export default UsersTable;