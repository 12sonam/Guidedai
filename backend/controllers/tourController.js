import Tour from '../models/Tour.js'
import mongoose from 'mongoose';

//create new tour 
export const createTour = async (req, res) => {
    try {
        const { title, city, address, distance, photo, desc, price, maxGroupSize, featured } = req.body;
        
        // Validate required fields
        if (!title || !city || !address || !distance || !photo || !desc || !price || !maxGroupSize) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const newTour = new Tour({
            title,
            city,
            address,
            distance,
            photo,
            desc,
            price,
            maxGroupSize,
            featured: featured || false
        });

        const savedTour = await newTour.save();

        res.status(201).json({
            success: true,
            message: "Tour created successfully",
            data: savedTour
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to create tour",
            error: err.message
        });
    }
};

// export const createTour = async (req,res) => {
//     const newTour = new Tour(req.body);

//     try {
//         const savedTour = await newTour.save();

//         res.status(200).json({success:true, message:"Successfully created", data:savedTour});

//     } catch (err) {
//         res.status(500).json({success:false, message:"Failed to create. Try again"});
//     }
// };

// update tour

export const updateTour = async (req, res) => {
    const { id } = req.params;
    
    try {
        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid tour ID"
            });
        }

        const updatedTour = await Tour.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedTour) {
            return res.status(404).json({
                success: false,
                message: "Tour not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Tour updated successfully",
            data: updatedTour
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to update tour",
            error: err.message
        });
    }
};
// export const updateTour = async (req,res) => {

//     const id = req.params.id

//     try {

//         const updatedTour = await Tour.findByIdAndUpdate(id, {
//             $set: req.body
//         }, {new:true});

//         res.status(200).json({success:true, message:"Successfully updated", data: updatedTour});
        
//     } catch (err) {
//         res.status(500).json({success:false, message:"Failed to update",});
//     }
// };

// delete tour
export const deleteTour = async (req, res) => {
    const id = req.params.id

    try {

        await Tour.findByIdAndDelete(id);

        res.status(200).json({success:true, message:"Successfully deleted",});
        
    } catch (err) {
        res.status(500).json({success:false, message:"Failed to delete",});
    }
};

// getSingle tour
export const getSingleTour = async (req, res) => {
    const id = req.params.id

    try {

        const tour = await Tour.findById(id).populate("reviews");

        res.status(200).json({success:true, message:"Successful", data: tour});
        
    } catch (err) {
        res.status(404).json({success:false, message:"not found",});
    }
};

// getAll tour
export const getAllTour = async (req, res) => {

    // for pagination
    const page = parseInt(req.query.page);
 
    try {
        const tours = await Tour.find({}).populate("reviews").skip(page * 8). limit(8);
        res.status(200).json({success:true, count:tours.length, message:"Successful", data: tours,});

    } catch (err) {
        res.status(404).json({success:false, message:"not found",});
    }
};

//get tour by search 
export const getTourBySearch = async (req,res)=> {
    // here 'i' means cas sensetive
    const city = new RegExp(req.query.city, 'i');
    const price = parseInt(req.query.price);
    const maxGroupSize = parseInt(req.query.maxGroupSize)

    try {
        
        //gte means greater then equal 
        const tours = await Tour.find({ city, price:{$gte:price}, maxGroupSize:{$gte:maxGroupSize} }).populate("reviews");

        res.status(200).json({success:true, message:"Successful", data: tours,});

    } catch (err) {
        res.status(404).json({success:false, message:"not found",});
    }

}


// get recommendation tour
export const getRecommendationTour = async (req, res) => {

 
    try {
        const tours = await Tour.find({featured:true}).populate("reviews").limit(8);
        res.status(200).json({success:true, message:"Successful", data: tours,});

    } catch (err) {
        res.status(404).json({success:false, message:"not found",});
    }
};


//get tour counts
export const getTourCount = async(req,res)=>{
    try {
        const tourCount = await Tour.estimatedDocumentCount();

        res.status(200).json({success:true, data:tourCount});
    } catch (err) {
        res.status(500).json({success:false, message:'failed to fetch'});
    }
};