import { useState, useEffect } from 'preact/hooks';
import ActionButton from '../components/ActionButton';
import UserCard from './UserCard';
import PendingTableHeader from './PendingTableHeader';
import PendingTableRow from './PendingTableRow';
import Pagination from './Pagination';

/**
 * Main component for displaying pending users
 * Provides both desktop (table) and mobile (card) views
 * Allows admin to approve pending users
 */
const UsersTable = ({ users = [], onApprove }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  if (users.length === 0) {
    return <div className="text-center p-4">No pending users found</div>;
  }

  useEffect(() => {
    if (currentCardIndex >= users.length) {
      setCurrentCardIndex(Math.max(0, users.length - 1));
    }
  }, [users]);

  const handleNextCard = () => {
    setCurrentCardIndex((prev) => 
      prev < users.length - 1 ? prev + 1 : prev
    );
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prev) => prev > 0 ? prev - 1 : prev);
  };

  // Custom action buttons for UserCard
  const renderCustomActions = (user) => (
    <ActionButton
      label="Approve"
      iconClass="fas fa-check"
      onClick={() => onApprove(user.userName)}
      className="py-2 px-4 text-sm"
    />
  );

  return (
    <div>
      {/* Desktop view - table */}
      <div className="hidden lg:block overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <PendingTableHeader />
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user) => (
              <PendingTableRow 
                key={user.userName}
                user={user}
                onApprove={onApprove}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet view - cards */}
      <div className="lg:hidden">
        {users.length > 0 && currentCardIndex < users.length && (
          <>
            <UserCard
              user={users[currentCardIndex]}
              editData={{}}
              isPending={users[currentCardIndex].isRegistered === "N"}
              isActive={users[currentCardIndex].isRegistered === "Y"}
              hasChanges={false}
              onInputChange={() => {}}
              onUpdate={() => {}}
              onDelete={() => {}}
              hideDefaultActions={true}
              customActions={renderCustomActions(users[currentCardIndex])}
              showFields={false}
            />
            <Pagination
              currentIndex={currentCardIndex}
              totalItems={users.length}
              onNext={handleNextCard}
              onPrev={handlePrevCard}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default UsersTable;
