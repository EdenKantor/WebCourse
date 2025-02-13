/**
 * Header component for the pending users table
 */
const PendingTableHeader = () => (
    <thead className="bg-gray-100 dark:bg-gray-700">
      <tr>
        <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-200">User Name</th>
        <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-200">Status</th>
        <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-200">Action</th>
      </tr>
    </thead>
  );
  
  export default PendingTableHeader;