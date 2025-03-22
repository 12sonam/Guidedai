import express from 'express';
const router = express.Router();

// Sample data
const notifications = [
    { id: 1, message: "New booking request #1245", time: "5 minutes ago", read: false },
    { id: 2, message: "Payment confirmed for booking #1242", time: "30 minutes ago", read: false },
    { id: 3, message: "New guide application submitted", time: "2 hours ago", read: true },
];

const recentBookings = [
    { id: '#1248', customer: 'Emma Wilson', destination: 'Paris, France', date: '15 Mar 2025', status: 'Confirmed', amount: '$1,200' },
    { id: '#1247', customer: 'John Smith', destination: 'Tokyo, Japan', date: '14 Mar 2025', status: 'Pending', amount: '$2,300' },
    { id: '#1246', customer: 'Sarah Johnson', destination: 'Rome, Italy', date: '12 Mar 2025', status: 'Confirmed', amount: '$950' },
    { id: '#1245', customer: 'Michael Brown', destination: 'Bali, Indonesia', date: '10 Mar 2025', status: 'Completed', amount: '$1,750' },
];

const users = [
    { id: 1, name: 'John Smith', email: 'john@guidedai.com', role: 'Admin', status: 'Active', lastLogin: '18 Mar 2025, 10:23 AM' },
    { id: 2, name: 'Emma Wilson', email: 'emma@guidedai.com', role: 'Guide', status: 'Active', lastLogin: '17 Mar 2025, 2:45 PM' },
    { id: 3, name: 'Sarah Johnson', email: 'sarah@guidedai.com', role: 'Traveler', status: 'Active', lastLogin: '16 Mar 2025, 9:15 AM' },
    { id: 4, name: 'Michael Brown', email: 'michael@guidedai.com', role: 'Guide', status: 'Inactive', lastLogin: '10 Mar 2025, 4:30 PM' },
];

// Notifications API
router.get('/notifications', (req, res) => {
    res.json(notifications);
});

router.post('/notifications/mark-all-read', (req, res) => {
    notifications.forEach(notif => (notif.read = true));
    res.json({ message: 'All notifications marked as read' });
});

// Recent Bookings API
router.get('/bookings', (req, res) => {
    res.json(recentBookings);
});

// User Management API
router.get('/users', (req, res) => {
    res.json(users);
});

export default router;