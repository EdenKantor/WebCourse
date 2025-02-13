/**
 * Header component for the Manage users table
 */
const TableHeader = () => (
    <thead className="bg-gray-100 dark:bg-gray-700">
      <tr>
        <th className="w-1/6 px-6 py-3 text-center">User Name</th>
        <th className="w-1/6 px-6 py-3 text-center">Status</th>
        <th className="w-1/6 px-6 py-3 text-center">Age</th>
        <th className="w-1/6 px-6 py-3 text-center">Height</th>
        <th className="w-1/6 px-6 py-3 text-center">Weight</th>
        <th className="w-1/6 px-6 py-3 text-center">Action</th>
      </tr>
    </thead>
  );

  export default TableHeader;