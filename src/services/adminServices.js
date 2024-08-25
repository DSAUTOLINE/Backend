import { allOption } from "../db/models/allOption.js";
import sqlReview from "../db/sqlReview.js";
const adminServices = {
    eventInsert: async (body) => {
        for (let i=0;i<body.length;i++){
            await sqlReview.eventInsert(body[i])
        }
        return {sc:200};
        
    },
    eventDelete: async (nid) => {
        const result = await sqlReview.eventDelete(nid);
        if(result){
            return {sc:200}
        }else{
            return {sc:400};
        } 
    },
    reviewDelete: async (nid) => {
        const result = await sqlReview.reviewDelete(nid);
        if(result){
            return {sc:200}
        }else{
            return {sc:400};
        }
    },
    reviewChange: async (body) => {
        const result = await sqlReview.reviewChange(body.seq,body.allow);
        if(result){
            return {sc:200}
        }else{
            return {sc:400};
        }
    },
    allColor: async () => {
        const result = await sqlReview.allColor();
        if(result){
            return result;
        }else{
            return {sc:400};
        }
    },
    allColorInsert: async (body) => {
        const result = await sqlReview.allColorInsert(body);
        if(result){
            return {sc:200}
        }else{
            return {sc:400};
        }
    },
    allOption: async () => {
        const result = await sqlReview.allOption();
        if(result){
            return result;
        }else{
            return {sc:400};
        }
    },
    allOptionInsert: async (body) => {
        const result = await sqlReview.allOptionInsert(body);
        if(result){
            return {sc:200}
        }else{
            return {sc:400};
        }
    }                       
}
export default adminServices;