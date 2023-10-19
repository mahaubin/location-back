import Belongings from "../models/Belongings.js";

// create belongings
export const createBelongings = async (req,res,next)=>{
    const newBelongings = new Belongings({
        userId : req.user.id,
        type: req.body.type,
        rent: req.body.rent,
        surface:req.body.surface,
        address:req.body.address
    });
    try {
        const savedBelongings = await newBelongings.save();
        res.status(201).json(savedBelongings);
    } catch (error) {
        next(error)
    }
}

// update belongings selon la propriété
export const updateBelongings = async (req,res,next)=>{
    try {
        const updatedBelongings = await Belongings.findByIdAndUpdate(req.params.id,
            {$set:req.body},
            {new:true}
        );
        res.status(200).json(updatedBelongings);
    } catch (error) {
        next(error)
    }
};


// delete belongings
export const deleteBelongings = async (req,res,next)=>{
    try {
        const deletedBelongings = await Belongings.findByIdAndDelete(req.params.id);
        res.status(200).json("Belongings deleted with success");
    } catch (error) {
        next(error)
    }
};

// get one belongings
export const getBelongings = async (req,res,next)=>{
    try {
        const belongings = await Belongings.findById(req.params.id);
        res.status(200).json(belongings);
    } catch (error) {
        next(error)
    }
};


// get  belongings from User 
export const getBelongingsUser = async (req,res,next)=>{
    try {
        const belongings = await Belongings.find({userId:req.user.id});
        res.status(200).json(belongings);
    } catch (error) {
        next(error)
    }
};

// get  belongings from User 
export const getBelongingsUserStatus = async (req,res,next)=>{
    try {
        const belongings = await Belongings.find({userId:req.user.id,isBusy:false});
        res.status(200).json(belongings);
    } catch (error) {
        next(error)
    }
};

// get all Belongings
export const getAllBelongings = async (req,res,next)=>{
    try {
        const belongings = await Belongings.find();
        res.status(200).json(belongings);
    } catch (error) {
        next(error)
    }
};
