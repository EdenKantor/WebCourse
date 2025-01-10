import { useEffect } from 'preact/hooks';
import { useManageUsersLogic } from '../utils/ManageUsersLogic';
import ManageUsersTable from '../components/ManageUsersTable';
import ActionButton from '../components/ActionButton';
import Title from '../components/Title';
import Popup from '../components/Popup';

const ManageUsers = () => {
    const {
        users,
        updateUser,
        sortUsersByName,
        fetchUsers,
        deleteUser,
        handleDeleteClick,
        handleClosePopup,
        showPopup,
        userToDelete,
        showUpdatePopup,
        updatedUserName,
        handleCloseUpdatePopup
    } = useManageUsersLogic();

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="min-h-screen p-6 bg-white text-black transition-all duration-300 dark:bg-gray-900 dark:text-white">
            <div className="max-w-6xl mx-auto">
                <Title text="Manage Users" />
                <div className="flex justify-end mb-4">
                    <ActionButton
                        label="Sort by name"
                        iconClass="fas fa-sort-alpha-down"
                        onClick={sortUsersByName}
                    />
                </div>
                <ManageUsersTable 
                    users={users}
                    onUpdate={updateUser}
                    onDeleteClick={handleDeleteClick}
                />
                
                {/* Delete Popup */}
                <Popup
                    isOpen={showPopup}
                    onClose={handleClosePopup}
                    onConfirm={() => deleteUser(userToDelete)}
                    message={`Are you sure you want to delete "${userToDelete}" user?`}
                    showSuccess={false}
                    isError={false}
                />

                {/* Update Success Popup */}
                <Popup
                    isOpen={showUpdatePopup}
                    onClose={handleCloseUpdatePopup}
                    message={`"${updatedUserName}" user updated successfully`}
                    showSuccess={true}
                    isError={true}
                />
            </div>
        </div>
    );
};

export default ManageUsers;