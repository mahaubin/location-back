import Tenant from "../models/Tenant.js";
import Belongings from "../models/Belongings.js";

// create Tenant
export const createTenant = async (req,res,next)=>{
const belongsId=req.body.belongingsid;
    const newTenant = new Tenant({
        userId:req.user.id,
        lastName:req.body.lastName,
        firstName:req.body.firstName,
        email:req.body.email,
        address:req.body.address,
        telephone:req.body.telephone,
        belongingsId:belongsId
    });
    try {
        const savedTenant = await newTenant.save(); 
            try {
                await Belongings.findByIdAndUpdate(belongsId,{$set:{isBusy:true}},{new:true});
            } catch (error) {
                next(error);
            }
        res.status(200).json(savedTenant);
      } catch (err) {
          next(err);
      }
}

// update tenant
export const updateTenant = async (req,res,next)=>{
	const belongsId=req.body.belongingsid;
    try {
        const updatedTenant = await Tenant.findByIdAndUpdate(req.params.id,
            {$set:req.body},
            {new:true}
        );
        try {
            await Belongings.findByIdAndUpdate(belongsId,{$set:{isBusy:true}},{new:true});
        } catch (error) {
            next(error);
        }
        
        res.status(200).json(updatedTenant);
    } catch (error) {
        next(error)
    }
};


// delete tenant
export const deleteTenant = async (req,res,next)=>{
	const belongsId=req.params.idbien;
    try {
        const deletedTenant = await Tenant.findByIdAndDelete(req.params.id);
        const belong=deletedTenant.belongingsId;
        try {
            await Belongings.findByIdAndUpdate(belong,{$set:{isBusy:false}},{new:true});
          } catch (err) {
            next(err);
          }
        res.status(200).json("Tenant deleted with success");
    } catch (error) {
        next(error)
    }
};

// get one Tenant
export const getTenant = async (req,res,next)=>{
    try {
        const tenant = await Tenant.findById(req.params.id);
        res.status(200).json(tenant);
    } catch (error) {
        next(error)
    }
};

// get  Tenant from User 
export const getTenantUser = async (req,res,next)=>{
    
    const userId = req.user.id;
    try {
        const tenant = await Tenant.find({userId});
        res.status(200).json(tenant);
    } catch (error) {
        next(error)
    }
};


// get all Tenant
export const getAllTenant = async (req,res,next)=>{
    try {
        const tenants = await Tenant.find();
        res.status(200).json(tenants);
    } catch (error) {
        next(error)
    }
};
