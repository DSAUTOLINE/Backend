import adminServices from "../services/adminServices.js";

const adminController = {
    ansimi: async (req,res) => {
        try{
            console.log(req.body)
            // const response = await ansimiService.ansimi(req.body)
            // return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },
}
export default adminController;