import {useEffect } from 'preact/hooks';
import { usePendingUsersLogic } from '../utils/PendingUsersLogic';
import UsersTable from '../components/UsersTable';
import ActionButton from '../components/ActionButton';
import Title from '../components/Title';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Provides an interface for admin to:
 * - View pending users
 * - Approve individual users
 * - Sort pending users list
 */
const PendingUsers = () => {
    // Initializes pending users logic and state
    const { pendingUsers, fetchPendingUsers, approveUser, sortUsersByName, loading, sortMode, } = usePendingUsersLogic();

    useEffect(() => {
        fetchPendingUsers();
    }, []);

    const handleApprove = async (userName) => {
        await approveUser(userName);
    };

    // Display a loading spinner while data is being fetched
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 bg-white text-black transition-all duration-300 dark:bg-gray-900 dark:text-white">
            <div className="max-w-6xl mx-auto">
                <Title text="Pending Users" className="mb-4 sm:mb-0"/>
                <div className="flex justify-end mb-4">
                    <ActionButton
                        label={sortMode === 'default' ? "Sort by Name" : "Sort by Creation Date"}
                        iconClass={sortMode === 'default' ? "fas fa-sort-alpha-down" : "fas fa-clock"}
                        onClick={sortUsersByName}
                        className="text-xs sm:text-sm px-3 py-2  mt-3 sm:mt-0"
                    />
                </div>
                <UsersTable 
                    users={pendingUsers}
                    onApprove={handleApprove}
                />
            </div>
        </div>
    );
};

export default PendingUsers;
