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
export const login = async (req, res) => {
    const { email, password, role } = req.body; // Extract email, password, and role from the request body

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // If the user doesn't exist
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // If the role doesn't match
        if (user.role !== role) {
            return res.status(403).json({ success: false, message: `Access denied for role: ${role}` });
        }

        // Compare the entered password with the hashed password
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);

        // If the password is incorrect
        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, message: 'Incorrect email or password' });
        }

        // Destructure sensitive data and exclude it from the response
        const { password: userPassword, ...rest } = user._doc;

        // Create JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '15d' }
        );

        // Set the token in browser cookies and send the response
        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'strict',
            maxAge: 15 * 24 * 60 * 60 * 1000 // 15 days
        }).status(200).json({
            success: true,
            message: 'Successfully logged in',
            data: { ...rest }
        });

    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ success: false, message: 'Failed to login' });
    }
};
