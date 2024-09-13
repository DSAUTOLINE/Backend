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
import { quickCounseling } from "./models/quickCounseling.js";
import { admin } from "./models/admin.js";
const sqlReview = {
    admin: async (id) => {
        const sql = await admin.findOne({where:{id:id,expired_at:null},raw:true})
        return sql; 
    },
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
    quickInquiry: async (type,active) => {
        if (active == 0) { 
            const sqlQuery = `
            SELECT a.name as car_name,a.info,b.*,c.in_color,c.out_color,c.price,c.year,c.month,c.month_use,c.month_price,c.payment,c.deposit,d.logo_img,d.enter
            FROM db.ds_car_list a
            inner join db.ds_quick_counseling b on a.car_code = b.car_code
            inner join db.ds_quick_list c on a.car_code = c.car_code
            inner join db.manufacturer d on a.enter_code = d.enter_code
            where b.expired_at is null and b.allow = 'Y' 
            order by b.created_at DESC;
            `
            const sql = await sequelize.query(sqlQuery, {
                type: Sequelize.QueryTypes.SELECT
            });
            return sql;
        } else if (active == 1) {
            const sqlQuery = `
            SELECT a.name as car_name,a.info,b.*,c.in_color,c.out_color,c.price,c.year,c.month,c.month_use,c.month_price,c.payment,c.deposit,d.logo_img,d.enter
            FROM db.ds_car_list a
            inner join db.ds_quick_counseling b on a.car_code = b.car_code
            inner join db.ds_quick_list c on a.car_code = c.car_code
            inner join db.manufacturer d on a.enter_code = d.enter_code
            where b.expired_at is null and b.allow = 'N' 
            order by b.created_at DESC;
            `
            const sql = await sequelize.query(sqlQuery, {
                type: Sequelize.QueryTypes.SELECT
            });
            return sql;
        }
        return 0

    },

    quickInquiryOption: async (nid) => {
        const sql = await quickListOptions.findAll({attributes:['name'],where:{quick_num:nid},order:[["created_at","DESC"]],raw:true})
        return sql;
    },
    carInquiry: async (type,active) => {
        if (active == 0) {
            const condition2 = { 
                allow:'Y',
                expired_at:null
            };
            const sql = await estimate.findAll({where:condition2,order:[["created_at","DESC"]],raw:true})
            return sql
        } else if (active == 1) {
            
            const condition2 = { 
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
                expired_at:null,
                type:'간편상담'
            };
            const sql = await counselingList.findAll({where:condition,order:[["created_at","DESC"]],raw:true})
            return sql
        } else if (active == 1) {
            
            const condition = { 
                allow:'N',
                expired_at:null,
                type:'간편상담'
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

    eventInquiry: async (type,active) => {
        if (active == 0) { 
            const condition = { 
                allow:'Y',
                expired_at:null,
                type:'이벤트'
            };
            const sql = await counselingList.findAll({where:condition,order:[["created_at","DESC"]],raw:true})
            return sql
        } else if (active == 1) {
            
            const condition = { 
                allow:'N',
                expired_at:null,
                type:'이벤트'
            };
            const sql = await counselingList.findAll({where:condition,order:[["created_at","DESC"]],raw:true})
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
            where:{expired_at:null,type:'간편상담'},
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

        const sql4 = await quickCounseling.findAll({
            attributes: [
                [Sequelize.literal(`SUM(CASE WHEN allow = 'Y' THEN 1 ELSE 0 END)`), 'quick_y'],
                [Sequelize.literal(`SUM(CASE WHEN allow = 'N' THEN 1 ELSE 0 END)`), 'quick_n']
            ],
            where:{expired_at:null},
            raw: true
        });

        const sql5 = await counselingList.findAll({
            attributes: [
                [Sequelize.literal(`SUM(CASE WHEN allow = 'Y' THEN 1 ELSE 0 END)`), 'event_y'],
                [Sequelize.literal(`SUM(CASE WHEN allow = 'N' THEN 1 ELSE 0 END)`), 'event_n']
            ],
            where:{expired_at:null,type:'이벤트'},
            raw: true
        });
        return {...sql1[0], ...sql2[0], ...sql3[0], ...sql4[0], ...sql5[0]}
    },
    
    qucikInquiryDelete: async (nid) => {
        console.log(nid)
        const sql = await quickCounseling.update({expired_at:Sequelize.literal("NOW()")},{where:{seq:nid},raw:true})
        return sql;
    },
    qucikInquiryChange: async (nid,allow) => {
        const change = allow=='Y'? 'N' : 'Y'
        const sql = await quickCounseling.update({allow:change},{where:{seq:nid},raw:true})
        return sql;
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
    carInsert: async (newCode,name,info,img,price,category,enter) => {
        const sql = await carList.create({
            car_code:newCode,
            name:name,
            info:info,
            img:img,
            price:price,
            category:category,
            enter_code:enter
        })
        return sql;
    },

    carDetailInsert: async (data) => {
        const sql = await carDetail.create(data)
        return sql;
    },

    quickInsert:async (data) => {
        const sql = await quickList.create(data)
        return sql;
    },

    quickOptionInsert: async (nid,option) => {
        for (let i = 0;i<option.length;i++){
            option[i].quick_num = nid 
            await quickListOptions.create(option[i])
        }
        
        return 1;
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
        for (let i = 0;i<option.length;i++){
            option[i].car_code = nid 
            await carOptionList.create(option[i])
        }
        
        return 1;
    },

    carTrimInsert: async (nid,trim) => {
        for (let i = 0;i<trim.length;i++){
            trim[i].car_code = nid 
            let option = trim[i].option
            
            delete trim[i].option
            console.log(trim[i],option)
            const sql = await carTrim.create(trim[i])
            
            for (let j = 0 ; j< option.length ; j++){
                option[j].car_code = nid
                option[j].trim_num = sql.seq
                await carOptionList.create(option[j])
            }
        }
        
        return 1;
    },

    hotDealInsert: async (body) => {
        const sql = await discountList.create(body)
        return sql
    },

    carFaqDelete: async (nid) => {
        const sql = await carList.update({expired_at:Sequelize.literal("NOW()")},{where:{car_code:nid},raw:true})
        return sql;
    }, 
    hotDealDelete: async (nid) => {
        const sql = await discountList.update({expired_at:Sequelize.literal("NOW()")},{where:{seq:nid},raw:true})
        return sql;
    }, 
    quickDealDelete: async (nid) => {
        const sql = await quickList.update({expired_at:Sequelize.literal("NOW()")},{where:{seq:nid},raw:true})
        const sql2 = await quickListOptions.update({expired_at:Sequelize.literal("NOW()")},{where:{quick_num:nid},raw:true})
        return sql;
    }, 
    
}

export default sqlReview;