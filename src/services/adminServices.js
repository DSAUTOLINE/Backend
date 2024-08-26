import { allOption } from "../db/models/allOption.js";
import sqlReview from "../db/sqlReview.js";
import { generateNewKey } from "../public/newCarCode.js";
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
        const code = await sqlReview.maxCarCode();
        const newCode = generateNewKey(code.maxCarCode)
        const enter = await sqlReview.enterCode(body.entry,body.enter)
        const filterData = {
            car_code: newCode,
            rental_price: body.rental_price,
            lease_price: body.lease_price,
            year: body.year,
            month: body.month,
            gasoline: body.gasoline,
            diesel: body.diesel,
            lpg: body.lpg,
            hybrid: body.hybrid,
            h2: body.h2,
            electric: body.electric,
            min_cc: body.min_cc,
            max_cc: body.max_cc,
            min_fuel_efficiency: body.min_fuel_efficiency,
            max_fuel_efficiency: body.max_fuel_efficiency
        }
        // # 차 등록하기 
        const car = await sqlReview.carInsert(newCode,body.car_name,body.info,body.img,body.category,enter.enter_code)

        // # 차상세내용 등록하기 
        const carDetail = await sqlReview.carDetailInsert(filterData)

        // # 컬러 등록하기 
        const color = await sqlReview.carColorInsert(newCode,body.color)

        // # 옵션 등록하기 
        const option = await sqlReview.carOptionInsert(newCode,body.option)

        // # 트림 등록하기 
        const trim = await sqlReview.carTrimInsert(newCode,body.trim)
        
        return {sc:200};
    }
}
export default adminServices;