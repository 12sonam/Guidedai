import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import "./../styles/TravelerProfile.css";

const TravelerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.activeTab ?? 0);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    photo: null,
  });
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelSuccess, setCancelSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [itineraries, setItineraries] = useState([]);
  const [itineraryToDelete, setItineraryToDelete] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      setLoading(true);
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const userRes = await fetch(`${BASE_URL}/users/${id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        });
        const userData = await userRes.json();
        if (userRes.ok && userData.success) {
          setFormData({ username: userData.data.username, password: "", photo: null });
          if (userData.data.photo) {
            setPreview(`${BASE_URL}/uploads/${userData.data.photo}`);
          }
        } else {
          setError(userData.message || "Failed to fetch user data");
        }

        const bookingsRes = await fetch(`${BASE_URL}/booking/user/${id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        });
        const bookingsData = await bookingsRes.json();
        if (bookingsRes.ok && bookingsData.success) {
          setBookings(bookingsData.data);
        } else {
          setError(bookingsData.message || "Failed to fetch bookings");
        }

        const itinerariesRes = await fetch(`${BASE_URL}/itineraries?userId=${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!itinerariesRes.ok) {
          const errorText = await itinerariesRes.text();
          console.error("Itineraries API response:", errorText);
          throw new Error(`Failed to fetch itineraries: ${itinerariesRes.status} ${itinerariesRes.statusText}`);
        }

        const itinerariesData = await itinerariesRes.json();
        console.log('Itineraries Response:', itinerariesData); // Debug log
        if (itinerariesData.success) {
          setItineraries(itinerariesData.itineraries || itinerariesData.data || []);
        } else {
          setError(itinerariesData.message || "Failed to fetch itineraries");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setFormData({ ...formData, photo: e.target.files[0] });
      setPreview(URL.createObjectURL(e.target.files[0]));
    } else if (e.target.name === "password") {
      const newPassword = e.target.value;
      setFormData({ ...formData, password: newPassword });

      if (!newPassword) {
        setPasswordError("");
        return;
      }

      const hasUppercase = /[A-Z]/.test(newPassword);
      const hasNumber = /[0-9]/.test(newPassword);

      if (!hasUppercase || !hasNumber) {
        setPasswordError("Password must contain at least one capital letter and one number");
      } else {
        setPasswordError("");
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const role = localStorage.getItem("userRole");
    if (role !== "Traveler") {
      setError("Unauthorized access");
      return;
    }

    if (formData.password) {
      const hasUppercase = /[A-Z]/.test(formData.password);
      const hasNumber = /[0-9]/.test(formData.password);

      if (!hasUppercase || !hasNumber) {
        setError("Password must contain at least one capital letter and one number");
        return;
      }
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    const form = new FormData();
    form.append("username", formData.username);
    if (formData.password) form.append("password", formData.password);
    if (formData.photo) form.append("photo", formData.photo);

    try {
      const res = await fetch(`${BASE_URL}/users/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: form,
      });

      const result = await res.json();
      if (res.ok) {
        setSuccess(true);
        localStorage.setItem("user", JSON.stringify(result.data));
        setTimeout(() => window.location.reload(), 1500);
      } else {
        setError(result.message || "Update failed");
      }
    } catch (err) {
      setError(err.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    if (!bookingToCancel) return;

    setCancelLoading(true);
    setCancelSuccess(false);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/booking/cancel/${bookingToCancel._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await res.json();

      if (res.ok) {
        setCancelSuccess(true);
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingToCancel._id ? { ...booking, payment: "cancelled" } : booking
          )
        );
        setTimeout(() => {
          setShowCancelDialog(false);
          setBookingToCancel(null);
        }, 1500);
      } else {
        setError(result.message || "Failed to cancel booking");
      }
    } catch (err) {
      setError(err.message || "Error canceling booking");
    } finally {
      setCancelLoading(false);
    }
  };

  const openCancelConfirmation = (booking) => {
    setBookingToCancel(booking);
    setShowCancelDialog(true);
  };

  const handleDeleteItinerary = async () => {
    if (!itineraryToDelete) return;

    setDeleteLoading(true);
    setDeleteSuccess(false);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/itineraries/${itineraryToDelete._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await res.json();
      if (res.ok) {
        setDeleteSuccess(true);
        setItineraries((prevItineraries) =>
          prevItineraries.filter((itinerary) => itinerary._id !== itineraryToDelete._id)
        );
        setTimeout(() => {
          setShowDeleteDialog(false);
          setItineraryToDelete(null);
        }, 1500);
      } else {
        setError(result.message || "Failed to delete itinerary");
      }
    } catch (err) {
      setError(err.message || "Error deleting itinerary");
    } finally {
      setDeleteLoading(false);
    }
  };

  const openDeleteConfirmation = (itinerary) => {
    setItineraryToDelete(itinerary);
    setShowDeleteDialog(true);
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (e) => e.preventDefault();
  const handleTabChange = (newValue) => setActiveTab(newValue);
  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => setOpenDialog(false);
  const handleCloseCancelDialog = () => {
    setShowCancelDialog(false);
    setBookingToCancel(null);
    setCancelSuccess(false);
  };
  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
    setItineraryToDelete(null);
    setDeleteSuccess(false);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
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

  const getCurrencySymbol = (currency) => {
    return currency === "USD" ? "$" : "रु";
  };

  const formatNumber = (number) => {
    return number.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="container">
      <div className="profile-paper">
        <div className="profile-container">
          <div className="profile-sidebar">
            <div className="profile-avatar-container">
              <div className="avatar-badge">
                <label htmlFor="photo-upload" className="avatar-upload-label">
                  <input
                    accept="image/*"
                    id="photo-upload"
                    type="file"
                    name="photo"
                    className="avatar-upload-input"
                    onChange={handleChange}
                  />
                  <div className="avatar-upload-button">📸</div>
                </label>
                <div className="avatar-wrapper">
                  {preview ? (
                    <img src={preview} alt="Profile" className="avatar-image" />
                  ) : (
                    <div className="avatar-fallback">👤</div>
                  )}
                </div>
              </div>
              <h3 className="username">{formData.username}</h3>
              <span className="traveler-chip">Traveler</span>
            </div>

            <div className="tabs-container">
              <button className={`tab-button ${activeTab === 0 ? "active" : ""}`} onClick={() => handleTabChange(0)}>
                👤 <span>Profile</span>
              </button>
              <button className={`tab-button ${activeTab === 1 ? "active" : ""}`} onClick={() => handleTabChange(1)}>
                📄 <span>Bookings</span>
              </button>
              <button className={`tab-button ${activeTab === 2 ? "active" : ""}`} onClick={() => handleTabChange(2)}>
                🗺️ <span>Itineraries</span>
              </button>
            </div>
          </div>

          <div className="profile-content">
            {error && <div className="alert error">{error}</div>}
            {success && <div className="alert success">✅ Profile updated successfully! Refreshing...</div>}

            {activeTab === 0 && (
              <form onSubmit={handleSubmit} className="profile-form">
                <h2>Edit Profile</h2>
                <div className="divider"></div>

                <div className="form-grid">
                  <div className="form-group">
                    <div className="input-with-icon">
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                      />
                    </div>
                    <div
                      className="password-requirements"
                      style={{ fontSize: "0.75rem", marginTop: "0.25rem", color: "var(--text-secondary)" }}
                    >
                      Username
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-with-icon">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      />
                    </div>
                    {passwordError && (
                      <div
                        className="password-error"
                        style={{ color: "var(--error-color)", fontSize: "0.75rem", marginTop: "0.25rem" }}
                      >
                        {passwordError}
                      </div>
                    )}
                    <div
                      className="password-requirements"
                      style={{ fontSize: "0.75rem", marginTop: "0.25rem", color: "var(--text-secondary)" }}
                    >
                      Password (leave blank to keep current)
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={loading || (formData.password && passwordError)}
                  >
                    {loading ? <span className="spinner">🔄</span> : "Update Profile"}
                  </button>
                </div>
              </form>
            )}

            {activeTab === 1 && (
              <div className="bookings-container">
                <h2>Booking History</h2>
                <div className="divider"></div>

                {loading ? (
                  <div className="loading-container">
                    <div className="spinner">⏳</div>
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">📅</div>
                    <h3>No bookings found</h3>
                    <p>You haven't made any bookings yet.</p>
                  </div>
                ) : (
                  <div className="bookings-grid">
                    {bookings.map((booking) => (
                      <div className="booking-card" key={booking._id}>
                        <div className="booking-content">
                          <div className="booking-info">
                            <h3>{booking.tourName}</h3>
                            <div className="booking-chips">
                              <span className="chip" style={{ backgroundColor: getStatusColor(booking.payment) }}>
                                {booking.payment}
                              </span>
                              <span className="chip outline">{booking.guestSize} guest(s)</span>
                            </div>
                            <div className="booking-date">📅 {formatDate(booking.bookAt)}</div>
                          </div>
                          <div className="booking-actions">
                          <div className="booking-price">
                            {booking.originalPrice && booking.originalCurrency
                              ? `${getCurrencySymbol(booking.originalCurrency)} ${formatNumber(booking.originalPrice)}`
                              : `${getCurrencySymbol('NPR')} ${formatNumber(booking.price)}`}
                          </div>
                            <div className="booking-buttons">
                              <button className="view-button" onClick={() => handleViewBooking(booking)}>
                                View Details
                              </button>
                              {booking.payment !== "cancelled" && (
                                <button
                                  className="cancel-button"
                                  onClick={() => openCancelConfirmation(booking)}
                                  style={{
                                    background: "none",
                                    border: "1px solid var(--error-color)",
                                    color: "var(--error-color)",
                                    borderRadius: "4px",
                                    padding: "0.375rem 0.75rem",
                                    fontSize: "0.875rem",
                                    cursor: "pointer",
                                    marginLeft: "0.5rem",
                                    transition: "background-color 0.3s",
                                  }}
                                >
                                  Cancel
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 2 && (
              <div className="itineraries-container">
                <h2>Itinerary History</h2>
                <div className="divider"></div>

                {loading ? (
                  <div className="loading-container">
                    <div className="spinner">⏳</div>
                  </div>
                ) : itineraries.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">🗺️</div>
                    <h3>No itineraries found</h3>
                    <p>You haven't submitted any itineraries yet.</p>
                  </div>
                ) : (
                  <div className="itineraries-grid">
                    {itineraries.map((itinerary) => (
                      <div className="itinerary-card" key={itinerary._id}>
                        <div className="itinerary-content">
                          <div className="itinerary-info">
                            <h3>{itinerary.tourName}</h3>
                            <div className="itinerary-chips">
                              <span className="chip" style={{ backgroundColor: getStatusColor(itinerary.status) }}>
                                {itinerary.status || "pending"}
                              </span>
                              <span className="chip outline">{itinerary.numberOfTravelers} traveler(s)</span>
                            </div>
                            <div className="itinerary-date">📅 {formatDate(itinerary.departureDate)}</div>
                          </div>
                          <div className="itinerary-actions">
                            <div className="itinerary-price">
                              {itinerary.originalBudget && itinerary.originalCurrency
                                ? `${getCurrencySymbol(itinerary.originalCurrency)} ${formatNumber(itinerary.originalBudget)}`
                                : `${getCurrencySymbol(itinerary.currency)} ${formatNumber(itinerary.budget)}`}
                            </div>
                            <div className="itinerary-buttons">
                              <Link
                                to={`/update-itinerary/${itinerary._id}`}
                                className="view-button"
                                style={{
                                  background: "var(--primary-color)",
                                  border: "none",
                                  color: "white",
                                  padding: "0.375rem 0.75rem",
                                  borderRadius: "4px",
                                  fontSize: "0.875rem",
                                  textDecoration: "none",
                                  textAlign: "center",
                                  display: "inline-block",
                                  cursor: "pointer",
                                  transition: "background-color 0.3s",
                                }}
                              >
                                View and Update
                              </Link>
                              <button
                                className="delete-button"
                                onClick={() => openDeleteConfirmation(itinerary)}
                                style={{
                                  background: "none",
                                  border: "1px solid var(--error-color)",
                                  color: "var(--error-color)",
                                  borderRadius: "4px",
                                  padding: "0.375rem 0.75rem",
                                  fontSize: "0.875rem",
                                  cursor: "pointer",
                                  marginLeft: "0.5rem",
                                  transition: "background-color 0.3s",
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {openDialog && selectedBooking && (
        <div className="dialog-overlay">
          <div className="dialog">
            <div className="dialog-header">
              <h3>Booking Details</h3>
              <button className="close-button" onClick={handleCloseDialog}>❌</button>
            </div>
            <div className="dialog-content">
              <div className="booking-details">
                <h3>{selectedBooking.tourName}</h3>
                <span className="booking-status" style={{ backgroundColor: getStatusColor(selectedBooking.payment) }}>
                  {selectedBooking.payment}
                </span>

                <ul className="details-list">
                  <li className="detail-item">👤 <strong>Booked By</strong> <p>{selectedBooking.fullName}</p></li>
                  <li className="detail-item">📅 <strong>Booking Date</strong> <p>{formatDate(selectedBooking.bookAt)}</p></li>
                  <li className="detail-item">💰 <strong>Total Amount</strong> <p>
                      {selectedBooking.originalPrice && selectedBooking.originalCurrency
                        ? `${getCurrencySymbol(selectedBooking.originalCurrency)} ${formatNumber(selectedBooking.originalPrice)}`
                        : `${getCurrencySymbol('NPR')} ${formatNumber(selectedBooking.price)}`}
                    </p>
                  </li>
                  <li className="detail-item">⭐ <strong>Guests</strong> <p>{selectedBooking.guestSize}</p></li>
                </ul>

                <h4>Contact Information</h4>
                <p>Email: {selectedBooking.userEmail}</p>
                <p>Phone: {selectedBooking.phone}</p>
              </div>
            </div>
            <div className="dialog-footer">
              <button className="close-dialog-button" onClick={handleCloseDialog}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showCancelDialog && bookingToCancel && (
        <div className="dialog-overlay">
          <div className="dialog" style={{ maxWidth: "400px" }}>
            <div className="dialog-header">
              <h3>Cancel Booking</h3>
              <button className="close-button" onClick={handleCloseCancelDialog}>❌</button>
            </div>
            <div className="dialog-content">
              {cancelSuccess ? (
                <div className="alert success" style={{ marginBottom: "1rem" }}>
                  ✅ Booking cancelled successfully!
                </div>
              ) : (
                <>
                  <div
                    className="alert"
                    style={{
                      backgroundColor: "#fff3e0",
                      color: "#e65100",
                      padding: "1rem",
                      marginBottom: "1rem",
                      borderRadius: "4px",
                    }}
                  >
                    ⚠️ <strong>Warning:</strong> Are you sure you want to cancel this booking?
                  </div>
                  <p>Tour: <strong>{bookingToCancel.tourName}</strong></p>
                  <p>Date: <strong>{formatDate(bookingToCancel.bookAt)}</strong></p>
                  <p>This action cannot be undone. Refund policies may apply.</p>
                </>
              )}
            </div>
            <div className="dialog-footer" style={{ display: "flex", justifyContent: "space-between" }}>
              {!cancelSuccess && (
                <>
                  <button
                    className="close-dialog-button"
                    style={{
                      background: "none",
                      border: "1px solid var(--divider-color)",
                      color: "var(--text-secondary)",
                    }}
                    onClick={handleCloseCancelDialog}
                  >
                    No, Keep Booking
                  </button>
                  <button
                    className="close-dialog-button"
                    style={{ backgroundColor: "var(--error-color)" }}
                    onClick={handleCancelBooking}
                    disabled={cancelLoading}
                  >
                    {cancelLoading ? <span className="spinner">🔄</span> : "Yes, Cancel Booking"}
                  </button>
                </>
              )}
              {cancelSuccess && (
                <button className="close-dialog-button" onClick={handleCloseCancelDialog}>Close</button>
              )}
            </div>
          </div>
        </div>
      )}

      {showDeleteDialog && itineraryToDelete && (
        <div className="dialog-overlay">
          <div className="dialog" style={{ maxWidth: "400px" }}>
            <div className="dialog-header">
              <h3>Delete Itinerary</h3>
              <button className="close-button" onClick={handleCloseDeleteDialog}>❌</button>
            </div>
            <div className="dialog-content">
              {deleteSuccess ? (
                <div className="alert success" style={{ marginBottom: "1rem" }}>
                  ✅ Itinerary deleted successfully!
                </div>
              ) : (
                <>
                  <div
                    className="alert"
                    style={{
                      backgroundColor: "#fff3e0",
                      color: "#e65100",
                      padding: "1rem",
                      marginBottom: "1rem",
                      borderRadius: "4px",
                    }}
                  >
                    ⚠️ <strong>Warning:</strong> Are you sure you want to delete this itinerary?
                  </div>
                  <p>Tour: <strong>{itineraryToDelete.tourName}</strong></p>
                  <p>Departure Date: <strong>{formatDate(itineraryToDelete.departureDate)}</strong></p>
                  <p>This action cannot be undone.</p>
                </>
              )}
            </div>
            <div className="dialog-footer" style={{ display: "flex", justifyContent: "space-between" }}>
              {!deleteSuccess && (
                <>
                  <button
                    className="close-dialog-button"
                    style={{
                      background: "none",
                      border: "1px solid var(--divider-color)",
                      color: "var(--text-secondary)",
                    }}
                    onClick={handleCloseDeleteDialog}
                  >
                    No, Keep Itinerary
                  </button>
                  <button
                    className="close-dialog-button"
                    style={{ backgroundColor: "var(--error-color)" }}
                    onClick={handleDeleteItinerary}
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? <span className="spinner">🔄</span> : "Yes, Delete Itinerary"}
                  </button>
                </>
              )}
              {deleteSuccess && (
                <button className="close-dialog-button" onClick={handleCloseDeleteDialog}>Close</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelerProfile;