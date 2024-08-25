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

    allOption: async () => {
        const sql = await allOption.findAll({where:{expired_at:null},raw:true})
        return sql;
    },

    allOptionInsert: async (body) => {
        const sql = await allOption.create(body)
        return sql;
    },

}

export default sqlReview;