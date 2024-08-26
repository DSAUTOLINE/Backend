import { Sequelize,Op, where } from "sequelize";
import sequelize from "./models/index.js";
import moment from 'moment-timezone';
import { carColor } from "./models/carColor.js";
import { carDetail } from "./models/carDetail.js";
import { carList } from "./models/carList.js"
import { carOptionList } from "./models/carOptionList.js"
import { carTrim } from "./models/carTrim.js"
import { consultant } from "./models/consultant.js"
import { counselingList } from "./models/counselingList.js"
import { discountList } from "./models/discountList.js"
import { estimate } from "./models/estimate.js";
import { estimateOptions } from "./models/estimateOptions.js";
import { event } from "./models/event.js"
import { manufacturer } from "./models/manufacturer.js"
import { menu } from "./models/menu.js"
import { quickList } from "./models/quickList.js"
import { review } from "./models/review.js"
import { quickListOptions } from "./models/quickListOptions.js";
import { mentoring } from "./models/mentoring.js";
import { allColor } from "./models/allColor.js";
import { allOption } from "./models/allOption.js";
const sqlReview = {
    eventInsert: async (body) => {
        await event.create(body)
    }, 
    eventDelete: async (nid) => {
        const sql = await event.update({expired_at:Sequelize.literal("NOW()")},{where:{event_num:nid},raw:true})
        return sql;
    },
    reviewDelete: async (nid) => {
        const sql = await review.update({expired_at:Sequelize.literal("NOW()")},{where:{seq:nid},raw:true})
        return sql;
    },
    reviewChange: async (nid,allow) => {
        const change = allow=='Y'? 'N' : 'Y'
        const sql = await review.update({allow:change},{where:{seq:nid},raw:true})
        return sql;
    },

    allColor: async () => {
        const sql = await allColor.findAll({where:{expired_at:null},raw:true})
        return sql;
    },

    allColorInsert: async (body) => {
        const sql = await allColor.create(body)
        return sql;
    },

    allColorDelete: async (nid) => {
        const sql = await allColor.update({expired_at:Sequelize.literal("NOW()")},{where:{seq:nid},raw:true})
        return sql;
    },

    allOption: async () => {
        const sql = await allOption.findAll({where:{expired_at:null},raw:true})
        return sql;
    },

    allOptionInsert: async (body) => {
        const sql = await allOption.create(body)
        return sql;
    },

    allOptionDelete: async (nid) => {
        const sql = await allOption.update({expired_at:Sequelize.literal("NOW()")},{where:{seq:nid},raw:true})
        return sql;
    },

    carInquiry: async (type,active) => {
        const condition1 = type == 0 
        ? { type: '즉시 출고' } 
        : { type: { [Op.ne]: '즉시 출고' } };
        if (active == 0) {
            const condition2 = { 
                ...condition1,
                allow:'Y',
                expired_at:null
            };
            const sql = await estimate.findAll({where:condition2,order:[["created_at","DESC"]],raw:true})
            return sql
        } else if (active == 1) {
            
            const condition2 = { 
                ...condition1,
                allow:'N',
                expired_at:null
            };
            const sql = await estimate.findAll({where:condition2,order:[["created_at","DESC"]],raw:true})
            return sql
        }
        return 0
    },
    carInquiryOption: async (nid) =>{
        const sql = await estimateOptions.findAll({attributes:['name'],where:{order_num:nid},order:[["created_at","DESC"]],raw:true})
        return sql;
    },

    counselingInquiry: async (type,active) => {
        if (active == 0) { 
            const condition = { 
                allow:'Y',
                expired_at:null
            };
            const sql = await counselingList.findAll({where:condition,order:[["created_at","DESC"]],raw:true})
            return sql
        } else if (active == 1) {
            
            const condition = { 
                allow:'N',
                expired_at:null
            };
            const sql = await counselingList.findAll({where:condition,order:[["created_at","DESC"]],raw:true})
            return sql
        }
        return 0
    },

    mentoInquiry: async (type,active) => {
        if (active == 0) {
            const condition = { 
                allow:'Y',
                expired_at:null
            };
            const sql = await mentoring.findAll({where:condition,order:[["created_at","DESC"]],raw:true})
            return sql
        } else if (active == 1) {
            
            const condition = { 
                allow:'N',
                expired_at:null
            };
            const sql = await mentoring.findAll({where:condition,order:[["created_at","DESC"]],raw:true})
            return sql
        }
        return 0
    },

    currentSituation: async () => {
        const sql1 = await mentoring.findAll({
            attributes: [
                [Sequelize.literal(`SUM(CASE WHEN allow = 'Y' THEN 1 ELSE 0 END)`), 'mento_y'],
                [Sequelize.literal(`SUM(CASE WHEN allow = 'N' THEN 1 ELSE 0 END)`), 'mento_n']
            ],
            where:{expired_at:null},
            raw: true
        });
        const sql2 = await counselingList.findAll({
            attributes: [
                [Sequelize.literal(`SUM(CASE WHEN allow = 'Y' THEN 1 ELSE 0 END)`), 'counsel_y'],
                [Sequelize.literal(`SUM(CASE WHEN allow = 'N' THEN 1 ELSE 0 END)`), 'counsel_n']
            ],
            where:{expired_at:null},
            raw: true
        });

        const sql3 = await estimate.findAll({
            attributes: [
                [Sequelize.literal(`SUM(CASE WHEN allow = 'Y' THEN 1 ELSE 0 END)`), 'estimate_y'],
                [Sequelize.literal(`SUM(CASE WHEN allow = 'N' THEN 1 ELSE 0 END)`), 'estimate_n']
            ],
            where:{expired_at:null,type: { [Op.ne]: '즉시 출고' }},
            raw: true
        });

        const sql4 = await estimate.findAll({
            attributes: [
                [Sequelize.literal(`SUM(CASE WHEN allow = 'Y' THEN 1 ELSE 0 END)`), 'quick_y'],
                [Sequelize.literal(`SUM(CASE WHEN allow = 'N' THEN 1 ELSE 0 END)`), 'quick_n']
            ],
            where:{expired_at:null,type: '즉시 출고' },
            raw: true
        });
        return {...sql1[0], ...sql2[0], ...sql3[0], ...sql4[0]}
    },
    
    carInquiryDelete: async (nid) => {
        const sql = await estimate.update({expired_at:Sequelize.literal("NOW()")},{where:{order_num:nid},raw:true})
        const sql2 = await estimateOptions.update({expired_at:Sequelize.literal("NOW()")},{where:{order_num:nid},raw:true})
        return sql;
    },
    carInquiryChange: async (nid,allow) => {
        const change = allow=='Y'? 'N' : 'Y'
        const sql = await estimate.update({allow:change},{where:{order_num:nid},raw:true})
        return sql;
    },

    counselingInquiryDelete: async (nid) => {
        const sql = await counselingList.update({expired_at:Sequelize.literal("NOW()")},{where:{seq:nid},raw:true})
        return sql;
    },
    counselingInquiryChange: async (nid,allow) => {  
        const change = allow=='Y'? 'N' : 'Y'
        const sql = await counselingList.update({allow:change},{where:{seq:nid},raw:true})
        return sql;
    },

    mentoInquiryDelete: async (nid) => {
        const sql = await mentoring.update({expired_at:Sequelize.literal("NOW()")},{where:{seq:nid},raw:true})
        return sql;
    },
    mentoInquiryChange: async (nid,allow) => {
        const change = allow=='Y'? 'N' : 'Y'
        const sql = await mentoring.update({allow:change},{where:{seq:nid},raw:true})
        return sql;
    },

    maxCarCode: async () => {
        const sql = await carList.findOne({
            attributes: [[Sequelize.literal('MAX(car_code)'), 'maxCarCode']]
        ,raw:true});
        return sql;
    },

    enterCode: async (entry,enter) => {
        const sql = await manufacturer.findOne({
            attributes: ["enter_code"],
            where:{entry:entry,enter:enter}
        ,raw:true});
        return sql;
    }, 
    carInsert: async (newCode,name,info,img,category,enter) => {
        const sql = await carList.create({
            car_code:newCode,
            name:name,
            info:info,
            img:img,
            category:category,
            enter_code:enter
        })
        return sql;
    },

    carDetailInsert: async (data) => {
        const sql = await carDetail.create(data)
        return sql;
    },

    carColorInsert: async (nid,color) => {
        console.log(color)
        for (let i = 0;i<color.length;i++){
            color[i].car_code = nid 
            await carColor.create(color[i])
        }
        
        return 1;
    },

    carOptionInsert: async (nid,option) => {
        for (let i = 0;i<color.length;i++){
            option[i].car_code = nid 
            await carOptionList.create(option[i])
        }
        
        return 1;
    },

    carTrimInsert: async (nid,trim) => {
        for (let i = 0;i<color.length;i++){
            trim[i].car_code = nid 
            await carTrim.create(trim[i])
        }
        
        return 1;
    },
    // #차량 등록 
}

export default sqlReview;