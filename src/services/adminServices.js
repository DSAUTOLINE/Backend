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
    }           
}
export default adminServices;