// Displays a colored badge indicating the user's status (Active/Pending)
const StatusBadge = ({ isActive }) => (
    <span className={`px-2 py-1 text-sm font-medium rounded-full ${
      isActive ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
    }`}>
      {isActive ? "Active" : "Pending"}
    </span>
  );

  export default StatusBadge;