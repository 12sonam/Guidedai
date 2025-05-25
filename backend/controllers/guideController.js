import GuideProfile from '../models/GuideProfile.js';
import User from '../models/User.js';
import Availability from '../models/Availability.js';
import mongoose from 'mongoose';

// Create guide profile
export const createOrUpdateGuideProfile = async (req, res) => {
    try {
      // Always set Content-Type header
      res.setHeader('Content-Type', 'application/json');
  
      const user = await User.findById(req.user.id);
      if (!user || user.role !== 'Guide') {
        return res.status(403).json({ 
          success: false, 
          message: 'Only guides can create/update profiles' 
        });
      }
    } catch (err) {
      console.error('Error saving guide profile:', err);
      // Ensure error response is JSON
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to save profile',
        error: err.message 
      });
    }
  };

// Get single guide profile
export const getGuideProfile = async (req, res) => {
  try {
    const profile = await GuideProfile.findById(req.params.id).populate('userId', 'username email');
    
    if (!profile) {
      return res.status(404).json({ 
        success: false, 
        message: 'Profile not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      data: profile 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch profile', 
      error: err.message 
    });
  }
};

// Get all guide profiles
export const getAllGuideProfiles = async (req, res) => {
  try {
    const profiles = await GuideProfile.find().populate('userId', 'username email');
    
    res.status(200).json({ 
      success: true, 
      count: profiles.length,
      data: profiles 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch profiles', 
      error: err.message 
    });
  }
};

// Update guide profile
export const updateGuideProfile = async (req, res) => {
    try {
      // Verify user exists
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      // Update or create profile
      const profile = await GuideProfile.findOneAndUpdate(
        { userId: user._id },
        { $set: req.body },
        { new: true, upsert: true }
      );
  
      res.json({
        success: true,
        data: profile
      });
  
    } catch (err) {
      console.error('Update error:', err);
      res.status(500).json({ 
        success: false,
        error: err.message 
      });
    }
  };

export const getGuideProfileByUser = async (req, res) => {
    try {
      const profile = await GuideProfile.findOne({ userId: req.user.id });
      if (!profile) {
        return res.status(404).json({ 
          success: false, 
          message: 'Profile not found' 
        });
      }
      res.status(200).json({ 
        success: true, 
        data: profile 
      });
    } catch (err) {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch profile',
        error: err.message 
      });
    }
  };

  // Create or update availability
export const manageAvailability = async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'Guide') {
      return res.status(403).json({ 
        success: false, 
        message: 'Only guides can manage availability' 
      });
    }

    const guideProfile = await GuideProfile.findOne({ userId: user._id });
    if (!guideProfile) {
      return res.status(404).json({ 
        success: false, 
        message: 'Guide profile not found' 
      });
    }

    const { startDate, endDate, status } = req.body;
    
    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
      return res.status(400).json({ 
        success: false, 
        message: 'Start date must be less than or equal to end date' 
      });
    }

    const availability = await Availability.findOneAndUpdate(
      { guideId: guideProfile._id, startDate: start },
      { 
        guideId: guideProfile._id,
        startDate: start,
        endDate: end,
        status 
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      data: availability
    });
  } catch (err) {
    console.error('Error in manageAvailability:', err.stack); // Detailed error logging
    res.status(500).json({ 
      success: false, 
      message: 'Failed to manage availability',
      error: err.message 
    });
  }
};

// Get availability for a guide
export const getAvailability = async (req, res) => {
  try {
    const profile = await GuideProfile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ 
        success: false, 
        message: 'Guide profile not found' 
      });
    }

    const availability = await Availability.find({ guideId: profile._id })
      .sort({ startDate: 1 });

    res.status(200).json({
      success: true,
      data: availability
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch availability',
      error: err.message 
    });
  }
};

// Get availability for current guide
export const getMyAvailability = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid or missing user token' 
      });
    }

    console.log(`req.user.id: ${req.user.id}`); // Debug
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(400).json({ 
        success: false, 
        message: `Invalid user ID format: ${req.user.id}` 
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    console.log(`user._id: ${user._id}`); // Debug
    const profile = await GuideProfile.findOne({ userId: user._id });
    if (!profile) {
      return res.status(404).json({ 
        success: false, 
        message: 'Guide profile not found for this user' 
      });
    }

    console.log(`Fetching availability for guideId: ${profile._id}, userId: ${user._id}`); // Debug
    const availability = await Availability.find({ guideId: profile._id })
      .sort({ startDate: 1 });

    console.log(`Availability query result: ${JSON.stringify(availability)}`); // Debug
    if (!availability || availability.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: 'No availability periods set yet'
      });
    }

    res.status(200).json({
      success: true,
      data: availability
    });
  } catch (err) {
    console.error('Error in getMyAvailability:', err.stack); // Detailed error logging
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch availability',
      error: err.message 
    });
  }
};

// Delete availability
export const deleteAvailability = async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');

    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'Guide') {
      return res.status(403).json({ 
        success: false, 
        message: 'Only guides can delete availability' 
      });
    }

    const guideProfile = await GuideProfile.findOne({ userId: user._id });
    if (!guideProfile) {
      return res.status(404).json({ 
        success: false, 
        message: 'Guide profile not found' 
      });
    }

    const availabilityId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(availabilityId)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid availability ID' 
      });
    }

    const deletedAvailability = await Availability.findOneAndDelete({
      _id: availabilityId,
      guideId: guideProfile._id
    });

    if (!deletedAvailability) {
      return res.status(404).json({ 
        success: false, 
        message: 'Availability period not found or unauthorized to delete' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Availability period deleted successfully'
    });
  } catch (err) {
    console.error('Error in deleteAvailability:', err.stack);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete availability',
      error: err.message 
    });
  }
};