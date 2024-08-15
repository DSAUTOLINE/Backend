import { Sequelize,Op } from "sequelize";
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


const sqlCar = {
    updateFcm: async (uid,token,pid) => {
        const user = 1
        return user;
    },
    home: async () => {
        
    },
    quickFaq: async (entry,enter,category) => {//카테고리랑 브랜드 검색 
        const sqlQuery = `
            SELECT a.car_code, a.name, a.info, a.img, c.rental_price, c.lease_price 
            FROM db.ds_car_list a 
            LEFT JOIN db.manufacturer b ON a.enter_code = b.enter_code 
            LEFT JOIN db.ds_car_detail c ON a.car_code = c.car_code  
            WHERE b.enter LIKE "%${enter}%" AND a.category LIKE "%${category}%" AND a.expired_at IS NULL
            order by a.created_at DESC;
        `;
        const sql = await sequelize.query(sqlQuery, {
            type: Sequelize.QueryTypes.SELECT
        });
        console.log(sql)
        return sql;
    },

    hotDeal: async () => { 
        const sqlQuery = `
            SELECT a.car_code, a.name, a.img, b.rental_price, b.lease_price, c.rental_percent, c.lease_percent 
            FROM db.ds_car_list a 
            LEFT JOIN db.ds_car_detail b ON a.car_code = b.car_code 
            LEFT JOIN db.ds_discount_list c ON a.car_code = c.car_code 
            WHERE a.expired_at IS NULL
            order by a.created_at DESC;
        `;
        const sql = await sequelize.query(sqlQuery, {
            type: Sequelize.QueryTypes.SELECT
        });
        return sql 
    },

    estimate: async (nid) => {  //파라미터 넘겨받기  req.query.파람이름  or req.params.nid
        const sqlQuery =`SELECT * FROM db.ds_car_list a left join db.ds_car_detail b on a.car_code = b.car_code 
        LEFT JOIN db.manufacturer c ON a.enter_code = c.enter_code 
        where a.car_code = "${nid}";`
        const sql = await sequelize.query(sqlQuery, {
            type: Sequelize.QueryTypes.SELECT
        });
        const colors = await carColor.findAll({attributes:['name','rgb'],where:{car_code:nid},raw:true})
        const trims = await carTrim.findAll({attributes:['trim1','trim2','price'],where:{car_code:nid},raw:true})
        const options = await carOptionList.findAll({attributes:['name','img','price'],where:{car_code:nid},raw:true})
        sql[0].color = colors 
        sql[0].trim = trims 
        sql[0].option = options

        return sql[0];
    },

    estimateInsert: async (body) => {

    },

    quickDeal: async (entry,enter,category) => { //카테고리랑 브랜드 검색 
        const sqlQuery = `
            SELECT a.car_code, a.name, a.info, a.img,a.in_color,a.out_color, c.rental_price, c.lease_price 
            FROM db.ds_car_list a 
            LEFT JOIN db.manufacturer b ON a.enter_code = b.enter_code 
            LEFT JOIN db.ds_car_detail c ON a.car_code = c.car_code  
            LEFT JOIN db.ds_quick_list d on a.car_code = d.car_code
            WHERE b.enter LIKE "%${enter}%" AND a.category LIKE "%${category}%" AND a.expired_at IS NULL
            order by a.created_at DESC;
        `;
        const sql = await sequelize.query(sqlQuery, {
            type: Sequelize.QueryTypes.SELECT
        });
        console.log(sql)
        return sql;
    },

    event: async (type) => { //offset 0 or 1 로 진행중 종료된 나오게 
        const seoulTime = moment.tz("Asia/Seoul").format('YYYY-MM-DD');
        console.log(seoulTime)
        let condition;

        if (type == 0) {
            condition = { 
                end_date: { 
                    [Op.gte]: seoulTime 
                },
                expired_at:null
            };
        } else if (type == 1) {
            
            condition = { 
                end_date: { 
                    [Op.lt]: seoulTime 
                },
                expired_at:null
            };
        }
        const sql = await event.findAll({where:condition,raw:true})
        return sql
    },

    eventDetail: async (nid) => {  //파라미터 넘겨받기 
        const sql = await event.findOne({where:{seq:nid,expired_at:null},raw:true});
        return sql;
    },

    review: async (offset) => {
        const sql = await review.findAll({where:{expired_at:null},order:[["created_at","DESC"]],offset:(offset-1)*8,limit:8,raw:true});
        return sql;
    },

    reviewDetail: async (nid) => { //파라미터 넘겨받기 
        const sql = await review.findOne({where:{seq:nid,expired_at:null},raw:true});
        return sql;
    },

    reviewInsert: async (body) => {
        const sql = await review.create(body);
        return sql;
    },

    counseling: async (body) => {
        const sql = await counselingList.create(body);
        return sql;
    }
};

export default sqlCar;