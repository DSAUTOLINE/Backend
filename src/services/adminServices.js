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
            const result = await sqlReview.counselingInquiry(type,active);
            return result
        }else if (type == 3){ //멘토  inquiry
            const result = await sqlReview.mentoInquiry(type,active);
            return result
        }else{
            return {sc:400}
        }
    },   

    CurrentSituation: async () => {
        const result = await sqlReview.currentSituation();
        if(result){
            result.sc = 200
            return result;
        }else{
            return {sc:400};
        }
    },

    
    carInquiryDelete: async (nid) => {  
        const result = await sqlReview.carInquiryDelete(nid);
        if(result){
            return {sc:200}
        }else{
            return {sc:400};
        }
    },
    carInquiryChange: async (body) => {
        const result = await sqlReview.carInquiryChange(body.seq,body.allow);
        if(result){
            return {sc:200}
        }else{
            return {sc:400};
        }
    },

    counselingInquiryDelete: async (nid) => {
        const result = await sqlReview.counselingInquiryDelete(nid);
        if(result){
            return {sc:200}
        }else{
            return {sc:400};
        }
    },
    counselingInquiryChange: async (body) => {
        const result = await sqlReview.counselingInquiryChange(body.seq,body.allow);
        if(result){
            return {sc:200}
        }else{
            return {sc:400};
        }
    },

    mentoInquiryDelete: async (nid) => {
        const result = await sqlReview.mentoInquiryDelete(nid);
        if(result){
            return {sc:200}
        }else{
            return {sc:400};
        }
    },
    mentoInquiryChange: async (body) => {
        const result = await sqlReview.mentoInquiryChange(body.seq,body.allow);
        if(result){
            return {sc:200}
        }else{
            return {sc:400};
        }
    },

    carInsert: async (body) => {
        return {sc:200}
    }
}
export default adminServices;