// import React from 'react';
// import { Plus, Edit, Trash2 } from 'lucide-react';
// import ReusableTable from './ReusableTable';
// import Modal from './Modal';

// const PackageManagementTab = ({
//   tours,
//   loading,
//   newTour,
//   setNewTour,
//   currentTour,
//   setCurrentTour,
//   handleAddTour,
//   handleUpdateTour,
//   handleDeleteTour,
//   showAddTourModal,
//   showEditTourModal,
//   toggleModal,
// }) => {
//   const tourColumns = [
//     {
//       header: 'Tour Name',
//       accessor: 'title',
//       render: (value, row) => (
//         <div className="flex items-center">
//           <img src={row.photo} alt={value} className="h-10 w-10 rounded mr-3 object-cover" />
//           <span>{value}</span>
//         </div>
//       ),
//     },
//     { header: 'City', accessor: 'city' },
//     { header: 'Price', accessor: 'price', render: (value) => `$${value}` },
//     {
//       header: 'Featured',
//       accessor: 'featured',
//       render: (value) => (
//         <span
//           className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//             value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//           }`}
//         >
//           {value ? 'Yes' : 'No'}
//         </span>
//       ),
//     },
//     {
//       header: 'Actions',
//       accessor: '_id',
//       render: (value) => (
//         <div className="flex space-x-2">
//           <button
//             onClick={() => {
//               setCurrentTour(tours.find((t) => t._id === value));
//               toggleModal('showEditTour', true);
//             }}
//             className="text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded flex items-center text-sm"
//           >
//             <Edit size={14} className="mr-1" />
//             Edit
//           </button>
//           <button
//             onClick={() => handleDeleteTour(value)}
//             className="text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded flex items-center text-sm"
//           >
//             <Trash2 size={14} className="mr-1" />
//             Delete
//           </button>
//         </div>
//       ),
//     },
//   ];

//   const handlePhotoChange = (e, setTour) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setTour((prev) => ({ ...prev, photo: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const tourFormContent = (tour, setTour, isEdit = false) => (
//     <div className="p-6 space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Title</label>
//         <input
//           type="text"
//           className="mt-1 w-full p-2 border rounded"
//           value={tour.title}
//           onChange={(e) => setTour({ ...tour, title: e.target.value })}
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">City</label>
//         <input
//           type="text"
//           className="mt-1 w-full p-2 border rounded"
//           value={tour.city}
//           onChange={(e) => setTour({ ...tour, city: e.target.value })}
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Address</label>
//         <input
//           type="text"
//           className="mt-1 w-full p-2 border rounded"
//           value={tour.address}
//           onChange={(e) => setTour({ ...tour, address: e.target.value })}
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Distance (km)</label>
//         <input
//           type="number"
//           className="mt-1 w-full p-2 border rounded"
//           value={tour.distance}
//           onChange={(e) => setTour({ ...tour, distance: e.target.value })}
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Photo</label>
//         <input
//           type="file"
//           accept="image/*"
//           className="mt-1 w-full p-2 border rounded"
//           onChange={(e) => handlePhotoChange(e, setTour)}
//         />
//         {tour.photo && (
//           <img src={tour.photo} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded" />
//         )}
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Description</label>
//         <textarea
//           className="mt-1 w-full p-2 border rounded"
//           value={tour.desc}
//           onChange={(e) => setTour({ ...tour, desc: e.target.value })}
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Price ($)</label>
//         <input
//           type="number"
//           className="mt-1 w-full p-2 border rounded"
//           value={tour.price}
//           onChange={(e) => setTour({ ...tour, price: e.target.value })}
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Max Group Size</label>
//         <input
//           type="number"
//           className="mt-1 w-full p-2 border rounded"
//           value={tour.maxGroupSize}
//           onChange={(e) => setTour({ ...tour, maxGroupSize: e.target.value })}
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Featured</label>
//         <input
//           type="checkbox"
//           className="mt-1"
//           checked={tour.featured}
//           onChange={(e) => setTour({ ...tour, featured: e.target.checked })}
//         />
//       </div>
//     </div>
//   );

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold">Package Management</h2>
//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center text-sm hover:bg-blue-700 transition"
//           onClick={() => toggleModal('showAddTour', true)}
//         >
//           <Plus size={16} className="mr-2" />
//           Add New Package
//         </button>
//       </div>
//       <ReusableTable columns={tourColumns} data={tours} loading={loading} />
//       <Modal
//         isOpen={showAddTourModal}
//         onClose={() => toggleModal('showAddTour', false)}
//         title="Add New Tour"
//         actions={[
//           { label: 'Cancel', onClick: () => toggleModal('showAddTour', false), className: 'border-gray-300 text-gray-700' },
//           {
//             label: 'Add Tour',
//             onClick: handleAddTour,
//             className: 'bg-blue-600 text-white hover:bg-blue-700',
//             disabled: !newTour.title || !newTour.city || !newTour.price,
//           },
//         ]}
//       >
//         {tourFormContent(newTour, setNewTour)}
//       </Modal>
//       <Modal
//         isOpen={showEditTourModal}
//         onClose={() => {
//           toggleModal('showEditTour', false);
//           setCurrentTour(null);
//         }}
//         title="Edit Tour"
//         actions={[
//           {
//             label: 'Cancel',
//             onClick: () => {
//               toggleModal('showEditTour', false);
//               setCurrentTour(null);
//             },
//             className: 'border-gray-300 text-gray-700',
//           },
//           {
//             label: 'Update Tour',
//             onClick: handleUpdateTour,
//             className: 'bg-blue-600 text-white hover:bg-blue-700',
//             disabled: !currentTour?.title || !currentTour?.city || !currentTour?.price,
//           },
//         ]}
//       >
//         {currentTour && tourFormContent(currentTour, setCurrentTour, true)}
//       </Modal>
//     </div>
//   );
// };

// export default PackageManagementTab;

// import React from 'react';
// import { Plus, Edit, Trash2 } from 'lucide-react';
// import ReusableTable from './ReusableTable';
// import Modal from './Modal';

// const PackageManagementTab = ({
//   tours,
//   loading,
//   newTour,
//   setNewTour,
//   currentTour,
//   setCurrentTour,
//   handleAddTour,
//   handleUpdateTour,
//   handleDeleteTour,
//   showAddTourModal,
//   showEditTourModal,
//   toggleModal,
// }) => {
//   const tourColumns = [
//     {
//       header: 'Tour Name',
//       accessor: 'title',
//       render: (value, row) => (
//         <div className="flex items-center">
//           <img src={row.photo} alt={value} className="h-10 w-10 rounded mr-3 object-cover" />
//           <span>{value}</span>
//         </div>
//       ),
//     },
//     { header: 'City', accessor: 'city' },
//     { header: 'Price', accessor: 'price', render: (value) => `$${value}` },
//     {
//       header: 'Featured',
//       accessor: 'featured',
//       render: (value) => (
//         <span
//           className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//             value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//           }`}
//         >
//           {value ? 'Yes' : 'No'}
//         </span>
//       ),
//     },
//     {
//       header: 'Actions',
//       accessor: '_id',
//       render: (value) => (
//         <div className="flex space-x-2">
//           <button
//             onClick={() => {
//               setCurrentTour(tours.find((t) => t._id === value));
//               toggleModal('showEditTour', true);
//             }}
//             className="text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded flex items-center text-sm"
//           >
//             <Edit size={14} className="mr-1" />
//             Edit
//           </button>
//           <button
//             onClick={() => handleDeleteTour(value)}
//             className="text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded flex items-center text-sm"
//           >
//             <Trash2 size={14} className="mr-1" />
//             Delete
//           </button>
//         </div>
//       ),
//     },
//   ];

//   const handlePhotoChange = (e, setTour) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Set the file object directly for the API request
//       setTour((prev) => ({ ...prev, photo: file }));
//     }
//   };

//   const getPhotoPreview = (photo) => {
//     if (!photo) return null;
//     if (typeof photo === 'string') {
//       // If photo is a URL (e.g., when editing an existing tour)
//       return photo;
//     }
//     // If photo is a file object (e.g., when adding a new tour or updating with a new photo)
//     return URL.createObjectURL(photo);
//   };

//   const tourFormContent = (tour, setTour, isEdit = false) => (
//     <div className="p-6 space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Title</label>
//         <input
//           type="text"
//           className="mt-1 w-full p-2 border rounded"
//           value={tour.title}
//           onChange={(e) => setTour({ ...tour, title: e.target.value })}
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">City</label>
//         <input
//           type="text"
//           className="mt-1 w-full p-2 border rounded"
//           value={tour.city}
//           onChange={(e) => setTour({ ...tour, city: e.target.value })}
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Address</label>
//         <input
//           type="text"
//           className="mt-1 w-full p-2 border rounded"
//           value={tour.address}
//           onChange={(e) => setTour({ ...tour, address: e.target.value })}
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Distance (km)</label>
//         <input
//           type="number"
//           className="mt-1 w-full p-2 border rounded"
//           value={tour.distance}
//           onChange={(e) => setTour({ ...tour, distance: e.target.value })}
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Photo</label>
//         <input
//           type="file"
//           accept="image/*"
//           className="mt-1 w-full p-2 border rounded"
//           onChange={(e) => handlePhotoChange(e, setTour)}
//         />
//         {tour.photo && (
//           <img src={getPhotoPreview(tour.photo)} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded" />
//         )}
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Description</label>
//         <textarea
//           className="mt-1 w-full p-2 border rounded"
//           value={tour.desc}
//           onChange={(e) => setTour({ ...tour, desc: e.target.value })}
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Price ($)</label>
//         <input
//           type="number"
//           className="mt-1 w-full p-2 border rounded"
//           value={tour.price}
//           onChange={(e) => setTour({ ...tour, price: e.target.value })}
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Max Group Size</label>
//         <input
//           type="number"
//           className="mt-1 w-full p-2 border rounded"
//           value={tour.maxGroupSize}
//           onChange={(e) => setTour({ ...tour, maxGroupSize: e.target.value })}
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Featured</label>
//         <input
//           type="checkbox"
//           className="mt-1"
//           checked={tour.featured}
//           onChange={(e) => setTour({ ...tour, featured: e.target.checked })}
//         />
//       </div>
//     </div>
//   );

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold">Package Management</h2>
//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center text-sm hover:bg-blue-700 transition"
//           onClick={() => toggleModal('showAddTour', true)}
//         >
//           <Plus size={16} className="mr-2" />
//           Add New Package
//         </button>
//       </div>
//       <ReusableTable columns={tourColumns} data={tours} loading={loading} />
//       <Modal
//         isOpen={showAddTourModal}
//         onClose={() => toggleModal('showAddTour', false)}
//         title="Add New Tour"
//         actions={[
//           { label: 'Cancel', onClick: () => toggleModal('showAddTour', false), className: 'border-gray-300 text-gray-700' },
//           {
//             label: 'Add Tour',
//             onClick: handleAddTour,
//             className: 'bg-blue-600 text-white hover:bg-blue-700',
//             disabled: !newTour.title || !newTour.city || !newTour.price || !newTour.photo,
//           },
//         ]}
//       >
//         {tourFormContent(newTour, setNewTour)}
//       </Modal>
//       <Modal
//         isOpen={showEditTourModal}
//         onClose={() => {
//           toggleModal('showEditTour', false);
//           setCurrentTour(null);
//         }}
//         title="Edit Tour"
//         actions={[
//           {
//             label: 'Cancel',
//             onClick: () => {
//               toggleModal('showEditTour', false);
//               setCurrentTour(null);
//             },
//             className: 'border-gray-300 text-gray-700',
//           },
//           {
//             label: 'Update Tour',
//             onClick: handleUpdateTour,
//             className: 'bg-blue-600 text-white hover:bg-blue-700',
//             disabled: !currentTour?.title || !currentTour?.city || !currentTour?.price,
//           },
//         ]}
//       >
//         {currentTour && tourFormContent(currentTour, setCurrentTour, true)}
//       </Modal>
//     </div>
//   );
// };

// export default PackageManagementTab;

import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import ReusableTable from './ReusableTable';
import Modal from './Modal';

const PackageManagementTab = ({
  tours,
  loading,
  newTour,
  setNewTour,
  currentTour,
  setCurrentTour,
  handleAddTour,
  handleUpdateTour,
  handleDeleteTour,
  showAddTourModal,
  showEditTourModal,
  toggleModal,
}) => {
  const [imageError, setImageError] = useState({});

  const tourColumns = [
    {
      header: 'Tour Name',
      accessor: 'title',
      render: (value, row) => (
        <div className="flex items-center space-x-2">
          {row.photo && !imageError[row._id] ? (
            <img
              src={row.photo}
              alt={value}
              className="h-10 w-10 rounded object-cover"
              style={{ height: '40px', width: '40px' }} // Fallback inline style
              onError={() => setImageError((prev) => ({ ...prev, [row._id]: true }))}
            />
          ) : (
            <img
              src="https://via.placeholder.com/40"
              alt="Fallback"
              className="h-10 w-10 rounded object-cover"
              style={{ height: '40px', width: '40px' }} // Fallback inline style
            />
          )}
          <span className="truncate max-w-xs">{value}</span>
        </div>
      ),
    },
    { header: 'City', accessor: 'city', render: (value) => <span className="truncate max-w-xs">{value}</span> },
    { header: 'Price', accessor: 'price', render: (value) => `$${value}` },
    {
      header: 'Featured',
      accessor: 'featured',
      render: (value) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}
        >
          {value ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: '_id',
      render: (value) => (
        <div className="flex space-x-4"> 
          <button
            onClick={() => {
              setCurrentTour(tours.find((t) => t._id === value));
              toggleModal('showEditTour', true);
            }}
            className="text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded flex items-center text-sm"
          >
            <Edit size={14} className="mr-1" />
            Edit
          </button>
          <button
            onClick={() => handleDeleteTour(value)}
            className="text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded flex items-center text-sm"
          >
            <Trash2 size={14} className="mr-1" />
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handlePhotoChange = (e, setTour) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTour((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const tourFormContent = (tour, setTour, isEdit = false) => (
    <div className="p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          className="mt-1 w-full p-2 border rounded"
          value={tour.title}
          onChange={(e) => setTour({ ...tour, title: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          className="mt-1 w-full p-2 border rounded"
          value={tour.city}
          onChange={(e) => setTour({ ...tour, city: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          className="mt-1 w-full p-2 border rounded"
          value={tour.address}
          onChange={(e) => setTour({ ...tour, address: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Distance (km)</label>
        <input
          type="number"
          className="mt-1 w-full p-2 border rounded"
          value={tour.distance}
          onChange={(e) => setTour({ ...tour, distance: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Photo</label>
        <input
          type="file"
          accept="image/*"
          className="mt-1 w-full p-2 border rounded"
          onChange={(e) => handlePhotoChange(e, setTour)}
        />
        {tour.photo && (
          <img src={tour.photo} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded" />
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          className="mt-1 w-full p-2 border rounded"
          value={tour.desc}
          onChange={(e) => setTour({ ...tour, desc: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Price ($)</label>
        <input
          type="number"
          className="mt-1 w-full p-2 border rounded"
          value={tour.price}
          onChange={(e) => setTour({ ...tour, price: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Max Group Size</label>
        <input
          type="number"
          className="mt-1 w-full p-2 border rounded"
          value={tour.maxGroupSize}
          onChange={(e) => setTour({ ...tour, maxGroupSize: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Featured</label>
        <input
          type="checkbox"
          className="mt-1"
          checked={tour.featured}
          onChange={(e) => setTour({ ...tour, featured: e.target.checked })}
        />
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Package Management</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center text-sm hover:bg-blue-700 transition"
          onClick={() => toggleModal('showAddTour', true)}
        >
          <Plus size={16} className="mr-2" />
          Add New Package
        </button>
      </div>
      <ReusableTable columns={tourColumns} data={tours} loading={loading} />
      <Modal
        isOpen={showAddTourModal}
        onClose={() => toggleModal('showAddTour', false)}
        title="Add New Tour"
        actions={[
          { label: 'Cancel', onClick: () => toggleModal('showAddTour', false), className: 'border-gray-300 text-gray-700' },
          {
            label: 'Add Tour',
            onClick: handleAddTour,
            className: 'bg-blue-600 text-white hover:bg-blue-700',
            disabled: !newTour.title || !newTour.city || !newTour.price,
          },
        ]}
      >
        {tourFormContent(newTour, setNewTour)}
      </Modal>
      <Modal
        isOpen={showEditTourModal}
        onClose={() => {
          toggleModal('showEditTour', false);
          setCurrentTour(null);
        }}
        title="Edit Tour"
        actions={[
          {
            label: 'Cancel',
            onClick: () => {
              toggleModal('showEditTour', false);
              setCurrentTour(null);
            },
            className: 'border-gray-300 text-gray-700',
          },
          {
            label: 'Update Tour',
            onClick: handleUpdateTour,
            className: 'bg-blue-600 text-white hover:bg-blue-700',
            disabled: !currentTour?.title || !currentTour?.city || !currentTour?.price,
          },
        ]}
      >
        {currentTour && tourFormContent(currentTour, setCurrentTour, true)}
      </Modal>
    </div>
  );
};

export default PackageManagementTab;