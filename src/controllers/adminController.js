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
    eventDelete: async (req,res) => {
        try{
            const response = await adminServices.eventDelete(req.params.nid)
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },    
    reviewDelete: async (req,res) => {
        try{
            const response = await adminServices.reviewDelete(req.params.nid)
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },
    reviewChange: async (req,res) => {
        try{
            const response = await adminServices.reviewChange(req.body)
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },

    allColor: async (req,res) => {
        try{
            const response = await adminServices.allColor(req.body)
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },

    allColorInsert: async (req,res) => {
        try{
            const response = await adminServices.allColorInsert(req.body)
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },
    allColorDelete: async (req,res) => {
        try{
            const response = await adminServices.allColorDelete(req.params.nid)
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },
    allOption: async (req,res) => {
        try{
            const response = await adminServices.allOption()
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },

    allOptionInsert: async (req,res) => {
        try{
            const response = await adminServices.allOptionInsert(req.body)
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },
    allOptionDelete: async (req,res) => {
        try{
            const response = await adminServices.allOptionDelete(req.params.nid)
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },

    customerList: async (req,res) => {
        try{
            const response = await adminServices.customerList(req.query.type,req.query.active)
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },
    
}
export default adminController;