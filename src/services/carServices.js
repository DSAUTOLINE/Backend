import sqlCar from "../db/sqlCar.js";

const carServices = {
    home: async () => {
        
    },
    quickFaq: async (entry,enter,category) => {//카테고리랑 브랜드 검색 
        
        const result = await sqlCar.quickFaq(entry,enter,category)
        if(result){
            return result;
        }else{
            return {sc:400};
        }
    },

    hotDeal: async () => { 
        const result = await sqlCar.hotDeal()
        if(result){

            return result;
        }else{
            return {sc:400};
        }
    },

    estimate: async (nid) => {  //파라미터 넘겨받기  req.query.파람이름  or req.params.nid
        const result = await sqlCar.estimate(nid)
        if(result){
            return result;
        }else{
            return {sc:400};
        }
    },

    estimateInsert: async (body) => {
        const result = await sqlCar.estimateInsert(body)
        if(result){
            return {sc:200};
        }else{
            return {sc:400};
        }
    },

    quickDeal: async (entry,enter,category) => { //카테고리랑 브랜드 검색 
        const result = await sqlCar.quickDeal(entry,enter,category)
        if(result){
            for (let i=0; i< result.length ; i++){
                const option = await sqlCar.quickOption(result[i].seq)
                result[i].option = option
            }
            return result;
        }else{
            return {sc:400};
        }
    },

    event: async (type) => { //offset 0 or 1 로 진행중 종료된 나오게 
        const result = await sqlCar.event(type);
        if(result){
            return result;
        }else{
            return {sc:400};
        }
    },

    eventDetail: async (nid) => {  //파라미터 넘겨받기 
        const result = await sqlCar.eventDetail(nid);
        if(result){
            result.sc=200;
            return result;
        }else{
            return {sc:400};
        }
    },

    review: async () => {
        const result = await sqlCar.review();
        if(result){
            return result;
        }else{
            return {sc:400};
        }
    },

    reviewDetail: async (nid) => { //파라미터 넘겨받기 
        const result = await sqlCar.reviewDetail(nid);
        if(result){
            result.sc=200;
            const orderReview = await sqlCar.reviewRendom(result.seq,result.enter)
            result.order = orderReview;
            return result;
        }else{
            return {sc:400};
        }
    },

    reviewInsert: async (body) => {
        const result = await sqlCar.reviewInsert(body);
        if(result){
            return {sc:200};
        }else{
            return {Sc:400};
        };
    },

    reviewSelect: async () => {
        const result = await sqlCar.reviewSelect();
        if (result){
            result.sc = 200
            return result
        }else{
            return result
        }
    },

    counseling: async (body) => {
        const result = await sqlCar.counseling(body);
        if(result){
            return {sc:200};
        }else{
            return {sc:400};
        };
    },

    optionList: async (nid) => {
        const result = await sqlCar.optionList(nid);
        if(result){
            result.sc=200;
            return result;
        }else{
            return {sc:400};
        };
    },

    ranking: async () => {
        const result = await sqlCar.ranking();
        if(result){
            return result;
        }else{
            return {sc:400};
        };
    },

    quickEstimate: async (nid) => {
        const result = await sqlCar.quickEstimate(nid);
        if(result){
            return result;
        }else{
            return {sc:400};
        };
    },

    mentoring: async (body) => {
        const result = await sqlCar.mentoring(body);
        if(result){
            return {sc:200};
        }else{
            return {sc:400};
        };
    },

}
export default carServices;