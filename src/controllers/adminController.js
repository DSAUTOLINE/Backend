import adminServices from "../services/adminServices.js";

const adminController = {
    eventInsert: async (req,res) => {
        try{
            console.log(req.body)
            const response = await adminServices.eventInsert(req.body)
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },
}
export default adminController;