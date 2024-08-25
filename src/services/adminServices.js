import sqlReview from "../db/sqlReview.js";
const adminServices = {
    eventInsert: async (body) => {
        for (let i=0;i<body.length;i++){
            await sqlReview.eventInsert(body[i])
        }
        return {sc:200};

    }
}
export default adminServices;