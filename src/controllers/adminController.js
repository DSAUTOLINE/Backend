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

    CurrentSituation: async (req,res) => {
        try{
            const response = await adminServices.CurrentSituation()
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },

    quickInquiryDelete: async (req,res) => {
        try{
            const response = await adminServices.quickInquiryDelete(req.params.nid)
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },
    quickInquiryChange: async (req,res) => {
        try{
            const response = await adminServices.quickInquiryChange(req.body)
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },

    carInquiryDelete: async (req,res) => {
        try{
            const response = await adminServices.carInquiryDelete(req.params.nid)
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },
    carInquiryChange: async (req,res) => {
        try{
            const response = await adminServices.carInquiryChange(req.body)
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },

    counselingInquiryDelete: async (req,res) => {
        try{
            const response = await adminServices.counselingInquiryDelete(req.params.nid)
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },
    counselingInquiryChange: async (req,res) => {
        try{
            const response = await adminServices.counselingInquiryChange(req.body)
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },

    mentoInquiryDelete: async (req,res) => {
        try{
            const response = await adminServices.mentoInquiryDelete(req.params.nid)
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },
    mentoInquiryChange: async (req,res) => {
        try{
            const response = await adminServices.mentoInquiryChange(req.body)
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },

    carInsert: async (req,res) => {
        try{
            console.log(req.body)
            const response = await adminServices.carInsert(req.body)
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },

    quickInsert: async (req,res) => {
        try{
            console.log(req.body)
            const response = await adminServices.quickInsert(req.body)
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },

    hotDealInsert: async (req,res) => {
        try{
            console.log(req.body)
            const response = await adminServices.hotDealInsert(req.body)
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },
    
}
export default adminController;