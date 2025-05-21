// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/config";
// import "../styles/UpdateItinerary.css";

// const UpdateItinerary = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     tourName: "",
//     descriptionItinerary: "",
//     departureDate: "",
//     returnDate: "",
//     numberOfTravelers: 1,
//     budget: "",
//     currency: "USD",
//   });
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState(null);
//   const [itinerary, setItinerary] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [showUpdateDialog, setShowUpdateDialog] = useState(false);
//   const [updateSuccess, setUpdateSuccess] = useState(false);
//   const [updateLoading, setUpdateLoading] = useState(false);
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false); // New state for delete dialog
//   const [deleteLoading, setDeleteLoading] = useState(false); // New state for delete loading

//   useEffect(() => {
//     const fetchItinerary = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       setLoading(true);
//       try {
//         const res = await fetch(`${BASE_URL}/itineraries/${id}`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//         });

//         const result = await res.json();
//         if (res.ok && result.success) {
//           const itineraryData = result.itinerary;
//           setItinerary(itineraryData);
//           setUserId(itineraryData.userId);
//           setFormData({
//             tourName: itineraryData.tourName,
//             descriptionItinerary: itineraryData.descriptionItinerary,
//             departureDate: itineraryData.departureDate.split("T")[0],
//             returnDate: itineraryData.returnDate.split("T")[0],
//             numberOfTravelers: itineraryData.numberOfTravelers,
//             budget: itineraryData.budget,
//             currency: itineraryData.currency,
//           });
//         } else {
//           setError(result.message || "Failed to fetch itinerary");
//         }
//       } catch (err) {
//         setError(err.message || "Error fetching itinerary");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItinerary();
//   }, [id, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setShowUpdateDialog(true);
//   };

//   const confirmUpdate = async () => {
//     setUpdateLoading(true);
//     setError(null);
//     setUpdateSuccess(false);

//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch(`${BASE_URL}/itineraries/${id}`, {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//         credentials: "include",
//       });

//       const result = await res.json();
//       if (res.ok) {
//         setUpdateSuccess(true);
//         setSuccess(true);
//         setTimeout(() => {
//           setShowUpdateDialog(false);
//           navigate(`/TravelerProfile/${userId}`, { state: { activeTab: 2 } });
//         }, 1500);
//       } else {
//         setError(result.message || "Failed to update itinerary");
//       }
//     } catch (err) {
//       setError(err.message || "Error updating itinerary");
//     } finally {
//       setUpdateLoading(false);
//     }
//   };

//   const handleCloseUpdateDialog = () => {
//     setShowUpdateDialog(false);
//     setUpdateSuccess(false);
//   };

//   const handleDelete = () => {
//     setShowDeleteDialog(true); // Show the delete confirmation dialog
//   };

//   const confirmDelete = async () => {
//     setDeleteLoading(true);
//     setError(null);
//     setSuccess(false);

//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch(`${BASE_URL}/itineraries/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//       });

//       const result = await res.json();
//       if (res.ok) {
//         setSuccess(true);
//         setTimeout(() => {
//           setShowDeleteDialog(false);
//           navigate(`/TravelerProfile/${userId}`, { state: { activeTab: 2 } });
//         }, 1500);
//       } else {
//         setError(result.message || "Failed to delete itinerary");
//       }
//     } catch (err) {
//       setError(err.message || "Error deleting itinerary");
//     } finally {
//       setDeleteLoading(false);
//     }
//   };

//   const handleCloseDeleteDialog = () => {
//     setShowDeleteDialog(false);
//   };

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const getCurrencySymbol = (currency) => {
//     return currency === "USD" ? "$" : "रु";
//   };

//   // Debug handlers to check for hover events
//   const handleMouseEnter = (buttonName) => {
//     console.log(`${buttonName} mouse enter`);
//   };

//   const handleMouseLeave = (buttonName) => {
//     console.log(`${buttonName} mouse leave`);
//   };

//   if (loading && !itinerary) {
//     return (
//       <div className="loading-container">
//         <div className="spinner">⏳</div>
//       </div>
//     );
//   }

//   if (!itinerary) {
//     return (
//       <div className="error-container">
//         <h3>Error</h3>
//         <p>{error || "Itinerary not found"}</p>
//         <button
//           className="back-button"
//           onClick={() => navigate(`/TravelerProfile/${userId}`, { state: { activeTab: 2 } })}
//         >
//           Back to Profile
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="update-itinerary-container">
//       <h1>Update Itinerary</h1>
//       <div className="divider"></div>

//       {error && <div className="alert error">{error}</div>}
//       {success && !showUpdateDialog && !showDeleteDialog && (
//         <div className="alert success">
//           ✅ Itinerary {itinerary.status === "deleted" ? "deleted" : "updated"} successfully! Redirecting...
//         </div>
//       )}

//       <div className="itinerary-details">
//         <h3>{itinerary.tourName}</h3>
//         <span className="itinerary-status" style={{ backgroundColor: getStatusColor(itinerary.status) }}>
//           {itinerary.status || "pending"}
//         </span>

//         <ul className="details-list">
//           <li className="detail-item">👤 <strong>Traveler</strong> <p>{itinerary.fullName}</p></li>
//           <li className="detail-item">📅 <strong>Departure Date</strong> <p>{formatDate(itinerary.departureDate)}</p></li>
//           <li className="detail-item">📅 <strong>Return Date</strong> <p>{formatDate(itinerary.returnDate)}</p></li>
//           <li className="detail-item">
//             💰 <strong>Budget</strong> <p>{getCurrencySymbol(itinerary.currency)}{itinerary.budget}</p>
//           </li>
//           <li className="detail-item">⭐ <strong>Travelers</strong> <p>{itinerary.numberOfTravelers}</p></li>
//         </ul>

//         <h4>Contact Information</h4>
//         <p>Email: {itinerary.email}</p>
//         <p>Phone: {itinerary.phone}</p>

//         <h4>Description and Itinerary</h4>
//         <p>{itinerary.descriptionItinerary}</p>

//         <h4>Interests</h4>
//         <p>
//           {Object.keys(itinerary.tripTypes)
//             .filter((key) => itinerary.tripTypes[key] && key !== "others")
//             .map((key) => key.replace(/([A-Z])/g, " $1").trim())
//             .join(", ")}
//           {itinerary.tripTypes.others ? `, ${itinerary.tripTypes.others}` : ""}
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="update-itinerary-form">
//         <div className="form-section">
//           <h4>Edit Itinerary Details</h4>
//           <div className="form-group">
//             <label htmlFor="tourName">Tour Name</label>
//             <input
//               type="text"
//               id="tourName"
//               name="tourName"
//               value={formData.tourName}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="descriptionItinerary">Description and Itinerary</label>
//             <textarea
//               id="descriptionItinerary"
//               name="descriptionItinerary"
//               value={formData.descriptionItinerary}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="departureDate">Departure Date</label>
//             <input
//               type="date"
//               id="departureDate"
//               name="departureDate"
//               value={formData.departureDate}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="returnDate">Return Date</label>
//             <input
//               type="date"
//               id="returnDate"
//               name="returnDate"
//               value={formData.returnDate}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="numberOfTravelers">Group Size</label>
//             <input
//               type="number"
//               id="numberOfTravelers"
//               name="numberOfTravelers"
//               value={formData.numberOfTravelers}
//               onChange={handleChange}
//               min="1"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="budget">Budget</label>
//             <div style={{ display: "flex", alignItems: "center" }}>
//               <select
//                 name="currency"
//                 value={formData.currency}
//                 onChange={handleChange}
//                 style={{ marginRight: "0.5rem" }}
//               >
//                 <option value="USD">USD</option>
//                 <option value="NRP">NRP</option>
//               </select>
//               <input
//                 type="number"
//                 id="budget"
//                 name="budget"
//                 value={formData.budget}
//                 onChange={handleChange}
//                 required
//                 step="0.01"
//                 min="0"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="form-actions">
//           <button
//             type="button"
//             className="cancel-button"
//             onClick={() => navigate(`/TravelerProfile/${userId}`, { state: { activeTab: 2 } })}
//             disabled={loading || updateLoading || deleteLoading}
//             onMouseEnter={() => handleMouseEnter("Cancel")}
//             onMouseLeave={() => handleMouseLeave("Cancel")}
//           >
//             Cancel
//           </button>
//           <button
//             type="button"
//             className="delete-button"
//             onClick={handleDelete}
//             disabled={loading || updateLoading || deleteLoading}
//             onMouseEnter={() => handleMouseEnter("Delete Itinerary")}
//             onMouseLeave={() => handleMouseLeave("Delete Itinerary")}
//           >
//             {deleteLoading ? <span className="spinner">🔄</span> : "Delete Itinerary"}
//           </button>
//           <button
//             type="submit"
//             className="submit-button"
//             disabled={loading || updateLoading || deleteLoading}
//             onMouseEnter={() => handleMouseEnter("Update Itinerary")}
//             onMouseLeave={() => handleMouseLeave("Update Itinerary")}
//           >
//             {updateLoading ? <span className="spinner">🔄</span> : "Update Itinerary"}
//           </button>
//         </div>
//       </form>

//       {showUpdateDialog && (
//         <div className="dialog-overlay">
//           <div className="dialog">
//             <div className="dialog-header">
//               <h3>Update Itinerary</h3>
//               <button className="close-button" onClick={handleCloseUpdateDialog}>❌</button>
//             </div>
//             <div className="dialog-content">
//               {updateSuccess ? (
//                 <div className="alert success">
//                   ✅ Itinerary updated successfully!
//                 </div>
//               ) : (
//                 <>
//                   <div className="alert warning">
//                     ⚠️ <strong>Warning:</strong> Are you sure you want to update this itinerary?
//                   </div>
//                   <p><strong>Tour:</strong> {formData.tourName}</p>
//                   <p><strong>Departure Date:</strong> {formatDate(formData.departureDate)}</p>
//                   <p>Changes will be saved and cannot be undone.</p>
//                 </>
//               )}
//             </div>
//             <div className="dialog-footer">
//               {!updateSuccess && (
//                 <>
//                   <button
//                     className="dialog-button cancel"
//                     onClick={handleCloseUpdateDialog}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     className="dialog-button confirm"
//                     onClick={confirmUpdate}
//                     disabled={updateLoading}
//                   >
//                     {updateLoading ? <span className="spinner">🔄</span> : "Confirm Update"}
//                   </button>
//                 </>
//               )}
//               {updateSuccess && (
//                 <button className="dialog-button confirm" onClick={handleCloseUpdateDialog}>
//                   Close
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {showDeleteDialog && (
//         <div className="dialog-overlay">
//           <div className="dialog">
//             <div className="dialog-header">
//               <h3>Delete Itinerary</h3>
//               <button className="close-button" onClick={handleCloseDeleteDialog}>❌</button>
//             </div>
//             <div className="dialog-content">
//               {success ? (
//                 <div className="alert success">
//                   ✅ Itinerary deleted successfully!
//                 </div>
//               ) : (
//                 <>
//                   <div className="alert warning">
//                     ⚠️ <strong>Warning:</strong> Are you sure you want to delete this itinerary?
//                   </div>
//                   <p><strong>Tour:</strong> {formData.tourName}</p>
//                   <p>This action cannot be undone.</p>
//                 </>
//               )}
//             </div>
//             <div className="dialog-footer">
//               {!success && (
//                 <>
//                   <button
//                     className="dialog-button cancel"
//                     onClick={handleCloseDeleteDialog}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     className="dialog-button delete"
//                     onClick={confirmDelete}
//                     disabled={deleteLoading}
//                   >
//                     {deleteLoading ? <span className="spinner">🔄</span> : "OK"}
//                   </button>
//                 </>
//               )}
//               {success && (
//                 <button className="dialog-button delete" onClick={handleCloseDeleteDialog}>
//                   Close
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const getStatusColor = (status) => {
//   switch (status?.toLowerCase()) {
//     case "confirmed":
//     case "accepted":
//       return "var(--success-color)";
//     case "pending":
//       return "var(--warning-color)";
//     case "cancelled":
//     case "declined":
//       return "var(--error-color)";
//     default:
//       return "var(--default-color)";
//   }
// };

// export default UpdateItinerary;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import "../styles/UpdateItinerary.css";

const UpdateItinerary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tourName: "",
    descriptionItinerary: "",
    departureDate: "",
    returnDate: "",
    numberOfTravelers: 1,
    budget: "",
    currency: "USD",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [itinerary, setItinerary] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchItinerary = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
  
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/itineraries/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
  
        const result = await res.json();
        if (res.ok && result.success) {
          const itineraryData = result.data; // Use result.data instead of result.itinerary
          setItinerary(itineraryData);
          setUserId(itineraryData.userId._id || itineraryData.userId); // Adjust based on response structure
          setFormData({
            tourName: itineraryData.tourName,
            descriptionItinerary: itineraryData.descriptionItinerary,
            departureDate: itineraryData.departureDate.split("T")[0],
            returnDate: itineraryData.returnDate.split("T")[0],
            numberOfTravelers: itineraryData.numberOfTravelers,
            budget: itineraryData.budget,
            currency: itineraryData.currency,
          });
        } else {
          if (res.status === 401) {
            localStorage.removeItem("token");
            navigate("/login", { state: { message: "Session expired. Please log in again." } });
          } else {
            setError(result.message || "Failed to fetch itinerary");
          }
        }
      } catch (err) {
        setError(err.message || "Error fetching itinerary");
      } finally {
        setLoading(false);
      }
    };
  
    fetchItinerary();
  }, [id, navigate]);

  // useEffect(() => {
  //   const fetchItinerary = async () => {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       navigate("/login");
  //       return;
  //     }

  //     setLoading(true);
  //     try {
  //       const res = await fetch(`${BASE_URL}/itineraries/${id}`, {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //         credentials: "include",
  //       });

  //       const result = await res.json();
  //       if (res.ok && result.success) {
  //         const itineraryData = result.itinerary;
  //         setItinerary(itineraryData);
  //         setUserId(itineraryData.userId);
  //         setFormData({
  //           tourName: itineraryData.tourName,
  //           descriptionItinerary: itineraryData.descriptionItinerary,
  //           departureDate: itineraryData.departureDate.split("T")[0],
  //           returnDate: itineraryData.returnDate.split("T")[0],
  //           numberOfTravelers: itineraryData.numberOfTravelers,
  //           budget: itineraryData.budget,
  //           currency: itineraryData.currency,
  //         });
  //       } else {
  //         if (res.status === 401) {
  //           localStorage.removeItem("token");
  //           navigate("/login", { state: { message: "Session expired. Please log in again." } });
  //         } else {
  //           setError(result.message || "Failed to fetch itinerary");
  //         }
  //       }
  //     } catch (err) {
  //       setError(err.message || "Error fetching itinerary");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchItinerary();
  // }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowUpdateDialog(true);
  };

  const confirmUpdate = async () => {
    setUpdateLoading(true);
    setError(null);
    setUpdateSuccess(false);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await fetch(`${BASE_URL}/itineraries/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const result = await res.json();
      if (res.ok) {
        setUpdateSuccess(true);
        setSuccess(true);
        setTimeout(() => {
          setShowUpdateDialog(false);
          navigate(`/TravelerProfile/${userId}`, { state: { activeTab: 2 } });
        }, 1500);
      } else {
        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login", { state: { message: "Session expired. Please log in again." } });
        } else {
          setError(result.message || "Failed to update itinerary");
        }
      }
    } catch (err) {
      setError(err.message || "Error updating itinerary");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleCloseUpdateDialog = () => {
    setShowUpdateDialog(false);
    setUpdateSuccess(false);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    setDeleteLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await fetch(`${BASE_URL}/itineraries/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await res.json();
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          setShowDeleteDialog(false);
          navigate(`/TravelerProfile/${userId}`, { state: { activeTab: 2 } });
        }, 1500);
      } else {
        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login", { state: { message: "Session expired. Please log in again." } });
        } else {
          setError(result.message || "Failed to delete itinerary");
        }
      }
    } catch (err) {
      setError(err.message || "Error deleting itinerary");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getCurrencySymbol = (currency) => {
    return currency === "USD" ? "$" : "रु";
  };

  const handleMouseEnter = (buttonName) => {
    console.log(`${buttonName} mouse enter`);
  };

  const handleMouseLeave = (buttonName) => {
    console.log(`${buttonName} mouse leave`);
  };

  if (loading && !itinerary) {
    return (
      <div className="loading-container">
        <div className="spinner">⏳</div>
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="error-container">
        <h3>Error</h3>
        <p>{error || "Itinerary not found"}</p>
        <button
          className="back-button"
          onClick={() => navigate(`/TravelerProfile/${userId || "default"}`, { state: { activeTab: 2 } })}
        >
          Back to Profile
        </button>
      </div>
    );
  }

  return (
    <div className="update-itinerary-container">
      <h1>Update Itinerary</h1>
      <div className="divider"></div>

      {error && <div className="alert error">{error}</div>}
      {success && !showUpdateDialog && !showDeleteDialog && (
        <div className="alert success">
          ✅ Itinerary {itinerary.status === "deleted" ? "deleted" : "updated"} successfully! Redirecting...
        </div>
      )}

      <div className="itinerary-details">
        <h3>{itinerary.tourName}</h3>
        <span className="itinerary-status" style={{ backgroundColor: getStatusColor(itinerary.status) }}>
          {itinerary.status || "pending"}
        </span>

        <ul className="details-list">
          <li className="detail-item">👤 <strong>Traveler</strong> <p>{itinerary.fullName}</p></li>
          <li className="detail-item">📅 <strong>Departure Date</strong> <p>{formatDate(itinerary.departureDate)}</p></li>
          <li className="detail-item">📅 <strong>Return Date</strong> <p>{formatDate(itinerary.returnDate)}</p></li>
          <li className="detail-item">
            💰 <strong>Budget</strong> <p>{getCurrencySymbol(itinerary.currency)}{itinerary.budget}</p>
          </li>
          <li className="detail-item">⭐ <strong>Travelers</strong> <p>{itinerary.numberOfTravelers}</p></li>
        </ul>

        <h4>Contact Information</h4>
        <p>Email: {itinerary.email}</p>
        <p>Phone: {itinerary.phone}</p>

        <h4>Description and Itinerary</h4>
        <p>{itinerary.descriptionItinerary}</p>

        <h4>Interests</h4>
        <p>
          {Object.keys(itinerary.tripTypes)
            .filter((key) => itinerary.tripTypes[key] && key !== "others")
            .map((key) => key.replace(/([A-Z])/g, " $1").trim())
            .join(", ")}
          {itinerary.tripTypes.others ? `, ${itinerary.tripTypes.others}` : ""}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="update-itinerary-form">
        <div className="form-section">
          <h4>Edit Itinerary Details</h4>
          <div className="form-group">
            <label htmlFor="tourName">Tour Name</label>
            <input
              type="text"
              id="tourName"
              name="tourName"
              value={formData.tourName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="descriptionItinerary">Description and Itinerary</label>
            <textarea
              id="descriptionItinerary"
              name="descriptionItinerary"
              value={formData.descriptionItinerary}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="departureDate">Departure Date</label>
            <input
              type="date"
              id="departureDate"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="returnDate">Return Date</label>
            <input
              type="date"
              id="returnDate"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="numberOfTravelers">Group Size</label>
            <input
              type="number"
              id="numberOfTravelers"
              name="numberOfTravelers"
              value={formData.numberOfTravelers}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="budget">Budget</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                style={{ marginRight: "0.5rem" }}
              >
                <option value="USD">USD</option>
                <option value="NRP">NRP</option>
              </select>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
              />
            </div>
          </div>
        </div>
        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate(`/TravelerProfile/${userId}`, { state: { activeTab: 2 } })}
            disabled={loading || updateLoading || deleteLoading}
            onMouseEnter={() => handleMouseEnter("Cancel")}
            onMouseLeave={() => handleMouseLeave("Cancel")}
          >
            Cancel
          </button>
          <button
            type="button"
            className="delete-button"
            onClick={handleDelete}
            disabled={loading || updateLoading || deleteLoading}
            onMouseEnter={() => handleMouseEnter("Delete Itinerary")}
            onMouseLeave={() => handleMouseLeave("Delete Itinerary")}
          >
            {deleteLoading ? <span className="spinner">🔄</span> : "Delete Itinerary"}
          </button>
          <button
            type="submit"
            className="submit-button"
            disabled={loading || updateLoading || deleteLoading}
            onMouseEnter={() => handleMouseEnter("Update Itinerary")}
            onMouseLeave={() => handleMouseLeave("Update Itinerary")}
          >
            {updateLoading ? <span className="spinner">🔄</span> : "Update Itinerary"}
          </button>
        </div>
      </form>

      {showUpdateDialog && (
        <div className="dialog-overlay">
          <div className="dialog">
            <div className="dialog-header">
              <h3>Update Itinerary</h3>
              <button className="close-button" onClick={handleCloseUpdateDialog}>❌</button>
            </div>
            <div className="dialog-content">
              {updateSuccess ? (
                <div className="alert success">
                  ✅ Itinerary updated successfully!
                </div>
              ) : (
                <>
                  <div className="alert warning">
                    ⚠️ <strong>Warning:</strong> Are you sure you want to update this itinerary?
                  </div>
                  <p><strong>Tour:</strong> {formData.tourName}</p>
                  <p><strong>Departure Date:</strong> {formatDate(formData.departureDate)}</p>
                  <p>Changes will be saved and cannot be undone.</p>
                </>
              )}
            </div>
            <div className="dialog-footer">
              {!updateSuccess && (
                <>
                  <button
                    className="dialog-button cancel"
                    onClick={handleCloseUpdateDialog}
                  >
                    Cancel
                  </button>
                  <button
                    className="dialog-button confirm"
                    onClick={confirmUpdate}
                    disabled={updateLoading}
                  >
                    {updateLoading ? <span className="spinner">🔄</span> : "Confirm Update"}
                  </button>
                </>
              )}
              {updateSuccess && (
                <button className="dialog-button confirm" onClick={handleCloseUpdateDialog}>
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {showDeleteDialog && (
        <div className="dialog-overlay">
          <div className="dialog">
            <div className="dialog-header">
              <h3>Delete Itinerary</h3>
              <button className="close-button" onClick={handleCloseDeleteDialog}>❌</button>
            </div>
            <div className="dialog-content">
              {success ? (
                <div className="alert success">
                  ✅ Itinerary deleted successfully!
                </div>
              ) : (
                <>
                  <div className="alert warning">
                    ⚠️ <strong>Warning:</strong> Are you sure you want to delete this itinerary?
                  </div>
                  <p><strong>Tour:</strong> {formData.tourName}</p>
                  <p>This action cannot be undone.</p>
                </>
              )}
            </div>
            <div className="dialog-footer">
              {!success && (
                <>
                  <button
                    className="dialog-button cancel"
                    onClick={handleCloseDeleteDialog}
                  >
                    Cancel
                  </button>
                  <button
                    className="dialog-button delete"
                    onClick={confirmDelete}
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? <span className="spinner">🔄</span> : "OK"}
                  </button>
                </>
              )}
              {success && (
                <button className="dialog-button delete" onClick={handleCloseDeleteDialog}>
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "confirmed":
    case "accepted":
      return "var(--success-color)";
    case "pending":
      return "var(--warning-color)";
    case "cancelled":
    case "declined":
      return "var(--error-color)";
    default:
      return "var(--default-color)";
  }
};

export default UpdateItinerary;