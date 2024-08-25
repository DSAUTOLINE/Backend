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
    allColorDelete: async (nid) => {
        const result = await sqlReview.allColorDelete(nid);
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
    },
    allOptionDelete: async (nid) => {
        const result = await sqlReview.allOptionDelete(nid);
        if(result){
            return {sc:200}
        }else{
            return {sc:400};
        }
    },   
    
    customerList: async (type,active) => { 
        
        if (type == 0 || type == 1 ){ //즉시출고 or 나머지 
            const result = await sqlReview.carInquiry(type,active);
            for (let i = 0; i < result.length; i++){
                let option = await sqlReview.carInquiryOption(result[i].order_num)
                result[i].option = option
            }
            return result
        }
        else if (type == 2){ //간편상담 신청 
            const result = await sqlReview.quickInquiry(type,active);
            return result
        }else if (type == 3){ //멘토  inquiry
            const result = await sqlReview.mentoInquiry(type,active);
            return result
        }else{
            return {sc:400}
        }
    },   
}
export default adminServices;