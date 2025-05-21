import React, { useState } from 'react';
import { UserPlus, Edit, Trash2 } from 'lucide-react';
import ReusableTable from './ReusableTable';
import Modal from './Modal';

const UserManagementTab = ({
  users,
  loading,
  error,
  newUser,
  setNewUser,
  currentUser,
  setCurrentUser,
  handleAddUser,
  handleUpdateUser,
  handleDeleteUser,
  showAddUserModal,
  showEditUserModal,
  toggleModal,
}) => {
  // State to store validation errors for both modals
  const [addUserErrors, setAddUserErrors] = useState({});
  const [editUserErrors, setEditUserErrors] = useState({});

  // Validation function for email
  const validateEmail = (email) => {
    if (!email) return "Email is required";
    if (!email.includes('@') || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address containing '@' and a domain";
    }
    return "";
  };

  // Validation function for password
  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/[0-9]/.test(password)) return "Password must contain at least one number";
    return "";
  };

  // Validate "Create New User" form
  const validateAddUser = () => {
    const errors = {};
    if (!newUser.username) errors.username = "Username is required";
    errors.email = validateEmail(newUser.email);
    errors.password = validatePassword(newUser.password);
    if (!newUser.role) errors.role = "User role is required";
    return errors;
  };

  // Validate "Edit User Profile" form
  const validateEditUser = () => {
    const errors = {};
    if (!currentUser?.username) errors.username = "Username is required";
    errors.email = validateEmail(currentUser?.email);
    if (!currentUser?.role) errors.role = "User role is required";
    if (currentUser?.newPassword) {
      errors.newPassword = validatePassword(currentUser.newPassword);
      if (!currentUser.confirmPassword) {
        errors.confirmPassword = "Please confirm the new password";
      } else if (currentUser.newPassword !== currentUser.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
    }
    return errors;
  };

  // Handle "Create New User" submission with validation
  const handleAddUserWithValidation = () => {
    const errors = validateAddUser();
    setAddUserErrors(errors);
    if (Object.values(errors).some((error) => error)) {
      return; // Stop submission if there are errors
    }
    handleAddUser(); // Proceed with submission if no errors
  };

  // Handle "Edit User Profile" submission with validation
  const handleUpdateUserWithValidation = () => {
    const errors = validateEditUser();
    setEditUserErrors(errors);
    if (Object.values(errors).some((error) => error)) {
      return; // Stop submission if there are errors
    }
    handleUpdateUser(); // Proceed with submission if no errors
  };

  const userColumns = [
    {
      header: 'Name',
      accessor: 'username',
      render: (value, row) => (
        <div className="flex items-center">
          <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-600">
            {value.charAt(0).toUpperCase()}
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-gray-900">{value}</div>
          </div>
        </div>
      ),
    },
    { header: 'Email', accessor: 'email' },
    {
      header: 'Role',
      accessor: 'role',
      render: (value) => (
        <span
          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
            value === 'Admin'
              ? 'bg-purple-100 text-purple-800'
              : value === 'Guide'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: '_id',
      render: (value) => (
        <div className="flex space-x-3">
          <button
            onClick={() => {
              setCurrentUser(users.find((u) => u._id === value));
              toggleModal('showEditUser', true);
            }}
            className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md text-sm flex items-center transition-colors btn-hover-scale smooth-transition"
          >
            <Edit size={14} className="mr-1" />
            Edit
          </button>
          <button
            onClick={() => handleDeleteUser(value)}
            className="text-white delete-btn px-3 py-1 rounded-md text-sm flex items-center transition-colors btn-hover-scale smooth-transition"
          >
            <Trash2 size={14} className="mr-1" />
            Delete
          </button>
        </div>
      ),
    },
  ];

  const addUserModalContent = (
    <div className="p-6 overflow-y-auto max-h-[70vh] bg-gray-50">
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg border-2 border-blue-200 shadow-sm">
          <label className="block text-sm font-bold text-gray-800 mb-2">Username</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-300 rounded-lg input-focus-effect"
              placeholder="Enter username"
              value={newUser.username}
              onChange={(e) => {
                setNewUser({ ...newUser, username: e.target.value });
                setAddUserErrors({ ...addUserErrors, username: e.target.value ? "" : "Username is required" });
              }}
              required
            />
          </div>
          {addUserErrors.username && (
            <p className="mt-1 text-sm text-red-600">{addUserErrors.username}</p>
          )}
        </div>
        <div className="bg-white p-4 rounded-lg border-2 border-blue-200 shadow-sm">
          <label className="block text-sm font-bold text-gray-800 mb-2">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <input
              type="email"
              className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-300 rounded-lg input-focus-effect"
              placeholder="email@example.com"
              value={newUser.email}
              onChange={(e) => {
                setNewUser({ ...newUser, email: e.target.value });
                setAddUserErrors({ ...addUserErrors, email: validateEmail(e.target.value) });
              }}
              required
            />
          </div>
          {addUserErrors.email && (
            <p className="mt-1 text-sm text-red-600">{addUserErrors.email}</p>
          )}
        </div>
        <div className="bg-white p-4 rounded-lg border-2 border-blue-200 shadow-sm">
          <label className="block text-sm font-bold text-gray-800 mb-2">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="password"
              className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-300 rounded-lg input-focus-effect"
              placeholder="••••••••"
              value={newUser.password}
              onChange={(e) => {
                setNewUser({ ...newUser, password: e.target.value });
                setAddUserErrors({ ...addUserErrors, password: validatePassword(e.target.value) });
              }}
              required
            />
          </div>
          {addUserErrors.password && (
            <p className="mt-1 text-sm text-red-600">{addUserErrors.password}</p>
          )}
        </div>
        <div className="bg-white p-4 rounded-lg border-2 border-blue-200 shadow-sm">
          <label className="block text-sm font-bold text-gray-800 mb-2">User Role</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <select
              className="w-full pl-10 pr-10 py-3 bg-white border-2 border-gray-300 rounded-lg input-focus-effect"
              value={newUser.role}
              onChange={(e) => {
                setNewUser({ ...newUser, role: e.target.value });
                setAddUserErrors({ ...addUserErrors, role: e.target.value ? "" : "User role is required" });
              }}
              required
            >
              <option value="">Select role</option>
              <option value="Traveler">Traveler</option>
              <option value="Guide">Guide</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          {addUserErrors.role && (
            <p className="mt-1 text-sm text-red-600">{addUserErrors.role}</p>
          )}
        </div>
      </div>
    </div>
  );

  const editUserModalContent = currentUser && (
    <div className="p-6 overflow-y-auto max-h-[70vh] bg-gray-50">
      {error && (
        <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md text-sm flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </div>
      )}
      <div className="space-y-6">
        <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border-2 border-blue-200 shadow-sm">
          <div className="relative">
            <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-2xl font-bold text-black float-animation">
              {currentUser.username.charAt(0).toUpperCase()}
            </div>
            <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{currentUser.username}</h4>
            <p className="text-sm text-gray-700">{currentUser.email}</p>
            <span
              className={`mt-2 inline-block px-2 py-1 text-xs font-bold rounded-full ${
                currentUser.role === 'Admin'
                  ? 'bg-purple-600 text-white'
                  : currentUser.role === 'Guide'
                  ? 'bg-blue-600 text-white'
                  : 'bg-green-600 text-black'
              }`}
            >
              {currentUser.role}
            </span>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-300 rounded-lg input-focus-effect"
                value={currentUser.username}
                onChange={(e) => {
                  setCurrentUser({ ...currentUser, username: e.target.value });
                  setEditUserErrors({ ...editUserErrors, username: e.target.value ? "" : "Username is required" });
                }}
                required
              />
            </div>
            {editUserErrors.username && (
              <p className="mt-1 text-sm text-red-600">{editUserErrors.username}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                type="email"
                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-300 rounded-lg input-focus-effect"
                value={currentUser.email}
                onChange={(e) => {
                  setCurrentUser({ ...currentUser, email: e.target.value });
                  setEditUserErrors({ ...editUserErrors, email: validateEmail(e.target.value) });
                }}
                required
              />
            </div>
            {editUserErrors.email && (
              <p className="mt-1 text-sm text-red-600">{editUserErrors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">User Role</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <select
                className="w-full pl-10 pr-10 py-3 bg-white border-2 border-gray-300 rounded-lg input-focus-effect"
                value={currentUser.role}
                onChange={(e) => {
                  setCurrentUser({ ...currentUser, role: e.target.value });
                  setEditUserErrors({ ...editUserErrors, role: e.target.value ? "" : "User role is required" });
                }}
                required
              >
                <option value="Traveler">Traveler</option>
                <option value="Guide">Guide</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            {editUserErrors.role && (
              <p className="mt-1 text-sm text-red-600">{editUserErrors.role}</p>
            )}
          </div>
          <div className="pt-4 border-t-2 border-gray-300">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-gray-800 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-blue-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Password Settings
              </h4>
              {currentUser.newPassword && (
                <span className="text-xs font-bold text-green-800 bg-green-200 px-2 py-1 rounded-full">
                  New password set
                </span>
              )}
            </div>
            <div className="space-y-4 bg-white p-4 rounded-lg border-2 border-blue-200 shadow-sm">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">New Password</label>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg input-focus-effect"
                    placeholder="••••••••"
                    onChange={(e) => {
                      setCurrentUser({ ...currentUser, newPassword: e.target.value });
                      setEditUserErrors({ ...editUserErrors, newPassword: validatePassword(e.target.value) });
                    }}
                  />
                </div>
                {editUserErrors.newPassword && (
                  <p className="mt-1 text-sm text-red-600">{editUserErrors.newPassword}</p>
                )}
              </div>
              {currentUser.newPassword && (
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">Confirm Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg input-focus-effect"
                      placeholder="••••••••"
                      onChange={(e) => {
                        setCurrentUser({ ...currentUser, confirmPassword: e.target.value });
                        setEditUserErrors({
                          ...editUserErrors,
                          confirmPassword:
                            e.target.value === currentUser.newPassword
                              ? ""
                              : "Passwords do not match",
                        });
                      }}
                      required
                    />
                  </div>
                  {editUserErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{editUserErrors.confirmPassword}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center text-sm hover:bg-blue-700 transition btn-hover-scale smooth-transition"
          onClick={() => toggleModal('showAddUser', true)}
        >
          <UserPlus size={16} className="mr-2" />
          Add New User
        </button>
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
      )}
      <ReusableTable columns={userColumns} data={users} loading={loading} />
      <Modal
        isOpen={showAddUserModal}
        onClose={() => {
          toggleModal('showAddUser', false);
          setAddUserErrors({});
        }}
        title="Create New User"
        actions={[
          {
            label: 'Cancel',
            onClick: () => {
              toggleModal('showAddUser', false);
              setAddUserErrors({});
            },
            className: 'border-gray-300 text-gray-700 btn-hover-scale smooth-transition',
          },
          {
            label: 'Create User',
            onClick: handleAddUserWithValidation,
            className: 'bg-blue-600 text-white hover:bg-blue-700 btn-hover-scale smooth-transition',
          },
        ]}
      >
        {addUserModalContent}
      </Modal>
      <Modal
        isOpen={showEditUserModal}
        onClose={() => {
          toggleModal('showEditUser', false);
          setCurrentUser(null);
          setEditUserErrors({});
        }}
        title="Edit User Profile"
        actions={[
          {
            label: 'Discard Changes',
            onClick: () => {
              toggleModal('showEditUser', false);
              setCurrentUser(null);
              setEditUserErrors({});
            },
            className: 'border-gray-400 text-gray-700 btn-hover-scale smooth-transition',
          },
          {
            label: 'Save Changes',
            onClick: handleUpdateUserWithValidation,
            className: 'bg-blue-600 text-white hover:bg-blue-700 btn-hover-scale smooth-transition',
          },
        ]}
      >
        {editUserModalContent}
      </Modal>
    </div>
  );
};

export default UserManagementTab;