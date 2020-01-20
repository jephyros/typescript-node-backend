import {Router,Request,Response, response} from 'express';

export const router:Router = Router();

router.get('',(req:Request,res:Response)=>{
    res.status(200).json({
        resultcode:200,
        resultdata: "EquipmentLists"
        
    });
});