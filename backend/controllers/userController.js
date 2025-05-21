import User from '../models/User.js'
import bcrypt from 'bcryptjs';

//create new User 
export const createUser = async (req,res) => {
    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save();

        res.status(200).json({success:true, message:"Successfully created", data:savedUser});

    } catch (err) {
        res.status(500).json({success:false, message:"Failed to create. Try again"});
    }
};

// update User
// export const updateUser = async (req,res) => {

//     const id = req.params.id

//     try {

//         const updatedUser = await User.findByIdAndUpdate(id, {
//             $set: req.body
//         }, {new:true});

//         res.status(200).json({success:true, message:"Successfully updated", data: updatedUser});
        
//     } catch (err) {
//         res.status(500).json({success:false, message:"Failed to update",});
//     }
// };
// export const updateUser = async (req, res) => {
//     const id = req.params.id;
  
//     const updateData = {
//       ...req.body,
//       ...(req.file && { photo: req.file.filename }) // Only include photo if uploaded
//     };
  
//     try {
//       const updatedUser = await User.findByIdAndUpdate(id, {
//         $set: updateData
//       }, { new: true });
  
//       res.status(200).json({ success: true, message: "Successfully updated", data: updatedUser });
//     } catch (err) {
//       res.status(500).json({ success: false, message: "Failed to update" });
//     }
//   };

export const updateUser = async (req, res) => {
    const id = req.params.id;
  
    try {
      const currentUser = await User.findById(id);
  
      // Only allow travelers to update
      if (!currentUser || currentUser.role !== "Traveler") {
        return res.status(403).json({ success: false, message: "Only travelers can update their profile" });
      }
  
      let updateData = {};
  
      // Allow username update
      if (req.body.username) updateData.username = req.body.username;
  
      // Allow password update (with hashing)
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(req.body.password, salt);
      }
  
      // Allow photo update
      if (req.file) {
        updateData.photo = req.file.filename;
      }
  
      const updatedUser = await User.findByIdAndUpdate(id, { $set: updateData }, { new: true });
  
      res.status(200).json({ success: true, message: "Successfully updated", data: updatedUser });
    } catch (err) {
      res.status(500).json({ success: false, message: "Failed to update" });
    }
  };

// delete User
export const deleteUser = async (req, res) => {
    const id = req.params.id

    try {

        await User.findByIdAndDelete(id);

        res.status(200).json({success:true, message:"Successfully deleted",});
        
    } catch (err) {
        res.status(500).json({success:false, message:"Failed to delete",});
    }
};

// getSingle User
export const getSingleUser = async (req, res) => {
    const id = req.params.id

    try {

        const user = await User.findById(id);

        res.status(200).json({success:true, message:"Successful", data: user});
        
    } catch (err) {
        res.status(404).json({success:false, message:"not found",});
    }
};

// getAll User
export const getAllUser = async (req, res) => {
 
    try {
        const users = await User.find({});
        res.status(200).json({success:true, message:"Successful", data: users,});

    } catch (err) {
        res.status(404).json({success:false, message:"not found",});
    }
};

// import User from '../models/User.js';
// import ApiFeatures from '../utils/apiFeatures.js';

// // Create new user (Admin only)
// export const createUser = async (req, res) => {
//     try {
//         const { username, email, password, role } = req.body;

//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: "User with this email already exists" 
//             });
//         }

//         // Hash password
//         const salt = bcrypt.genSaltSync(10);
//         const hash = bcrypt.hashSync(password, salt);

//         const newUser = new User({
//             username,
//             email,
//             password: hash,
//             role: role || 'Traveler',
//             photo: req.body.photo || '',
//             status: req.body.status || 'Active'
//         });

//         const savedUser = await newUser.save();

//         // Remove password from response
//         savedUser.password = undefined;

//         res.status(201).json({
//             success: true,
//             message: "User created successfully",
//             data: savedUser
//         });

//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to create user",
//             error: err.message
//         });
//     }
// };

// // Update user (Admin or the user themselves)
// export const updateUser = async (req, res) => {
//     const id = req.params.id;

//     try {
//         // Check if user exists
//         const user = await User.findById(id);
//         if (!user) {
//             return res.status(404).json({ 
//                 success: false, 
//                 message: "User not found" 
//             });
//         }

//         // Prepare update data
//         const updateData = { ...req.body };

//         // If password is being updated, hash it
//         if (updateData.password) {
//             const salt = bcrypt.genSaltSync(10);
//             updateData.password = bcrypt.hashSync(updateData.password, salt);
//         }

//         const updatedUser = await User.findByIdAndUpdate(id, updateData, {
//             new: true,
//             runValidators: true
//         });

//         // Remove password from response
//         updatedUser.password = undefined;

//         res.status(200).json({
//             success: true,
//             message: "User updated successfully",
//             data: updatedUser
//         });

//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to update user",
//             error: err.message
//         });
//     }
// };

// // Delete user (Admin only)
// export const deleteUser = async (req, res) => {
//     const id = req.params.id;

//     try {
//         const user = await User.findById(id);
//         if (!user) {
//             return res.status(404).json({ 
//                 success: false, 
//                 message: "User not found" 
//             });
//         }

//         // Prevent deleting own admin account
//         if (user._id.toString() === req.user.id && user.role === 'Admin') {
//             return res.status(403).json({
//                 success: false,
//                 message: "You cannot delete your own admin account"
//             });
//         }

//         await User.findByIdAndDelete(id);

//         res.status(200).json({
//             success: true,
//             message: "User deleted successfully"
//         });

//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to delete user",
//             error: err.message
//         });
//     }
// };

// // Get single user
// export const getSingleUser = async (req, res) => {
//     const id = req.params.id;

//     try {
//         const user = await User.findById(id).select('-password');

//         if (!user) {
//             return res.status(404).json({ 
//                 success: false, 
//                 message: "User not found" 
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "User retrieved successfully",
//             data: user
//         });

//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to retrieve user",
//             error: err.message
//         });
//     }
// };

// // Get all users (with filtering, sorting, pagination)
// export const getAllUser = async (req, res) => {
//     try {
//         // Advanced filtering, sorting, pagination
//         const features = new ApiFeatures(User.find(), req.query)
//             .filter()
//             .sort()
//             .limitFields()
//             .paginate();

//         const users = await features.query.select('-password');

//         res.status(200).json({
//             success: true,
//             count: users.length,
//             message: "Users retrieved successfully",
//             data: users
//         });

//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to retrieve users",
//             error: err.message
//         });
//     }
// };

// // Get user stats (count by role, status, etc.)
// export const getUserStats = async (req, res) => {
//     try {
//         const stats = await User.aggregate([
//             {
//                 $group: {
//                     _id: '$role',
//                     count: { $sum: 1 },
//                     active: {
//                         $sum: { $cond: [{ $eq: ['$status', 'Active'] }, 1, 0] }
//                     },
//                     inactive: {
//                         $sum: { $cond: [{ $eq: ['$status', 'Inactive'] }, 1, 0] }
//                     }
//                 }
//             },
//             {
//                 $project: {
//                     role: '$_id',
//                     count: 1,
//                     active: 1,
//                     inactive: 1,
//                     _id: 0
//                 }
//             }
//         ]);

//         res.status(200).json({
//             success: true,
//             message: "User statistics retrieved",
//             data: stats
//         });

//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to get user statistics",
//             error: err.message
//         });
//     }
// };