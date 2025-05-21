import GuideProfile from '../models/GuideProfile.js';
import User from '../models/User.js';
import Availability from '../models/Availability.js';

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
  
      // ... rest of your existing code ...
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
    
    const availability = await Availability.findOneAndUpdate(
      { guideId: guideProfile._id, startDate },
      { 
        guideId: guideProfile._id,
        startDate,
        endDate,
        status 
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      data: availability
    });
  } catch (err) {
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
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const profile = await GuideProfile.findOne({ userId: user._id });
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