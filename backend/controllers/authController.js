import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


//user registration
// export const register = async(req, res) => {
//     try {
//         const newUser = new User({
//             username: req.body.username,
//             email: req.body.email,
//             password: req.body.password,
//             role: req.body.role,
//             photo: req.body.photo
//         });

//         await newUser.save();

//         res.status(200).json({success:true, message:'Successfully created'});
//     } catch (err) {
//         res.status(500).json({success:false, message:'Failed to create. Try again'});
//     }
// }; 
export const register = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt); // Generate hashed password

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash, // Use the correct variable
            role: req.body.role, // Role: Admin, Guide, Traveler
            photo: req.body.photo,
        });

        await newUser.save();
        res.status(200).json({ success: true, message: 'User registered successfully!' });

    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ success: false, message: 'Registration failed. Try again.' });
    }
};

//user login
export const login = async(req, res) => {

    try {
        
    } catch (err) {
        
    }
}
