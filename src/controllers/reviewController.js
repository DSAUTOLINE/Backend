import reviewServices from "../services/reviewServices.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const reviewController = {
    msgsender: async (req,res) => {
        try{
            
            return res.json({sc:200});
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },
    msglog: async (req,res) => {
        try{
            return res.json({sc:200});
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },
}
export default reviewController;