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
import { quickListOptions } from "./models/quickListOptions.js";
import { mentoring } from "./models/mentoring.js";
import { quickCounseling } from "./models/quickCounseling.js";
const sqlCar = {
    updateFcm: async (uid,token,pid) => {
        const user = 1
        return user;
    },
    home: async () => {
        
    },
    quickFaq: async (entry,enter,category) => {//카테고리랑 브랜드 검색 
        const sqlQuery = `
            SELECT a.car_code, a.name, a.info, a.img,a.category,a.price, b.enter,b.logo_img,c.*
            FROM db.ds_car_list a 
            inner JOIN db.manufacturer b ON a.enter_code = b.enter_code 
            inner JOIN db.ds_car_detail c ON a.car_code = c.car_code  
            WHERE b.entry LIKE "%${entry}%" AND b.enter LIKE "%${enter}%" AND a.category LIKE "%${category}%" AND a.expired_at IS NULL
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
            SELECT a.car_code, a.name, a.img,a.info,a.category,a.price, b.year,b.month,b.size,b.gasoline,b.diesel,b.lpg,b.hybrid,b.electric,b.h2,b.min_cc,b.max_cc,b.min_fuel_efficiency,b.max_fuel_efficiency, c.*, d.enter,d.logo_img
            FROM db.ds_car_list a 
            inner JOIN db.ds_car_detail b ON a.car_code = b.car_code 
            inner JOIN db.ds_discount_list c ON a.car_code = c.car_code 
            inner JOIN db.manufacturer d ON a.enter_code = d.enter_code
            WHERE a.expired_at IS NULL and c.expired_at IS NULL
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
        const colors = await carColor.findAll({attributes:['name','rgb','type'],where:{car_code:nid},raw:true})
        const trims = await carTrim.findAll({attributes:['seq','car_code','trim1','trim2','price'],where:{car_code:nid},raw:true})
        for ( let i = 0 ; i< trims.length ; i++ ){
            let options = await carOptionList.findAll({attributes:['name','img','price'],where:{trim_num:trims[i].seq,car_code:trims[i].car_code},raw:true})
            trims[i].option = options
        }
        
        sql[0].color = colors 
        sql[0].trim = trims 

        return sql[0];
    },

    estimateInsert: async (body) => {
        const options = body.options 
        delete body.options
        const sql = await estimate.create(body)
        for(let i = 0; i<options.length;i++){
            await estimateOptions.create({order_num:sql.order_num,name:options[i]})
        }
        return sql;
    },

    quickDeal: async (entry,enter,category) => { //카테고리랑 브랜드 검색 
        const sqlQuery = `
            SELECT a.car_code, a.name, a.info, a.img,a.category, b.enter,b.logo_img,c.*
            FROM db.ds_car_list a 
            inner JOIN db.manufacturer b ON a.enter_code = b.enter_code 
            inner JOIN db.ds_quick_list c on a.car_code = c.car_code
            WHERE b.entry LIKE "%${entry}%" AND b.enter LIKE "%${enter}%" AND a.category LIKE "%${category}%" AND c.expired_at IS NULL and a.expired_at IS NULL
            order by a.created_at DESC;
        `;
        const sql = await sequelize.query(sqlQuery, {
            type: Sequelize.QueryTypes.SELECT
        });
        return sql;
    },

    ranking: async () => { //카테고리랑 브랜드 검색 
        // const sqlQuery = `
        //     select a.car_code, a.name,a.info,a.img,a.price, b.rental_price, b.lease_price, c.logo_img
        //     from db.ds_car_list a inner join db.ds_car_detail b on a.car_code = b.car_code inner JOIN db.manufacturer c ON a.enter_code = c.enter_code 
        //     where a.car_code in 
        //     (SELECT car_code FROM db.ds_estimate group by car_code order by count(car_code) desc ) 
        //     ;
        // `;
        const sqlQuery1 = `SELECT car_code FROM db.ds_estimate group by car_code order by count(car_code) desc limit 4`;
        const sql1 = await sequelize.query(sqlQuery1, {
            type: Sequelize.QueryTypes.SELECT
        });
        const inClause = sql1.map(item => `'${item.car_code}'`).join(',');
        const sqlQuery2 = `select a.car_code, a.name,a.info,a.img,a.price, b.rental_price, b.lease_price, c.logo_img
        from db.ds_car_list a inner join db.ds_car_detail b on a.car_code = b.car_code inner JOIN db.manufacturer c ON a.enter_code = c.enter_code 
        where a.car_code in (${inClause})`;
        const sql2 = await sequelize.query(sqlQuery2, {
            type: Sequelize.QueryTypes.SELECT
        });
        console.log(sql2)
        return sql2;
    },

    event: async (type,active) => { //offset 0 or 1 로 진행중 종료된 나오게 
        const seoulTime = moment.tz("Asia/Seoul").format('YYYY-MM-DD');
        console.log(seoulTime)
        let condition;
        console.log(type,active)
        if (active == 0) {
            condition = { 
                end_date: { 
                    [Op.gte]: seoulTime 
                },
                type: {
                    [Op.like]: `%${type}%` // SQL의 LIKE '%%'와 동일
                },
                start_date: {
                    [Op.lte]: seoulTime // start_date <= seoulTime
                },
                state:'out',
                expired_at:null
            };
            const sql = await event.findAll({where:condition,order:[["created_at","DESC"]],raw:true})
            return sql
        } else if (active == 1) {
            
            condition = { 
                end_date: { 
                    [Op.lt]: seoulTime 
                },
                start_date: {
                    [Op.lte]: seoulTime // start_date <= seoulTime
                },
                type: {
                    [Op.like]: `%${type}%` // SQL의 LIKE '%%'와 동일
                },
                state:'out',
                expired_at:null
            };
            const sql = await event.findAll({where:condition,order:[["created_at","DESC"]],raw:true})
            return sql
        }
        return 0
    },

    eventDetail: async (nid) => {  //파라미터 넘겨받기 
        const sql = await event.findOne({where:{event_num:nid,expired_at:null,state:"in"},raw:true});
        return sql;
    },

    review: async (type) => {
        if (type == 0){
            const sql = await review.findAll({where:{expired_at:null,allow:`Y`},order:[["created_at","DESC"]],raw:true});
            return sql;
        }else if (type == 1){
            const sql = await review.findAll({where:{expired_at:null,allow:`N`},order:[["created_at","DESC"]],raw:true});
            return sql;
        }
    },

    reviewDetail: async (nid) => { //파라미터 넘겨받기 
        const sql = await review.findOne({where:{seq:nid,expired_at:null},raw:true});
        return sql;
    },

    reviewInsert: async (body) => {
        const sql = await review.create(body);
        return sql;
    },

    reviewRendom: async (nid,enter) => {
        const sql = await review.findAll({where:{expired_at:null,allow:`Y`,enter:enter,seq: { [Op.ne] : nid }},order:sequelize.random(),limit:10,raw:true});
        return sql;
    },

    reviewSelect: async () => {
        const sqlQuery = `
            SELECT a.name, b.enter 
            FROM db.ds_car_list a 
            LEFT JOIN db.manufacturer b ON a.enter_code = b.enter_code 
            WHERE a.expired_at IS NULL
            GROUP BY a.name, b.enter;
        `;
        const sql = await sequelize.query(sqlQuery, {
            type: Sequelize.QueryTypes.SELECT
        });
        return sql;
        return sql;
    },

    counseling: async (body) => {
        const sql = await counselingList.create(body);
        console.log(sql.seq)
        return sql;
    },


    //d 
    optionList: async (nid) => {
        const sql = await carOptionList.findAll({attributes:['name','img','price'],where:{car_code:nid},raw:true})
        return sql
    },

    colorList: async (nid) => {
        const sql = await carColor.findAll({attributes:['name','rgb','type'],where:{car_code:nid},raw:true})
        return sql;
    },

    // optionList: async (nid) => {
    //     const sql = {}
    //     const colors = await carColor.findAll({attributes:['name','rgb','type'],where:{car_code:nid},raw:true})
    //     const trims = await carTrim.findAll({attributes:['trim1','trim2','price'],where:{car_code:nid},raw:true})
    //     const options = await carOptionList.findAll({attributes:['name','img','price'],where:{car_code:nid},raw:true})
    //     sql.color = colors 
    //     sql.trim = trims 
    //     sql.option = options
    //     return sql;
    // },

    quickEstimate: async (nid) => {
        const sqlQuery =`SELECT a.car_code, a.name, a.info, a.img, d.price,  a.category, b.*, c.enter, c.entry,c.logo_img, d.in_color,d.out_color,d.rgb,d.trim1, d.trim2 
        FROM db.ds_car_list a left join db.ds_car_detail b on a.car_code = b.car_code 
        LEFT JOIN db.manufacturer c ON a.enter_code = c.enter_code  LEFT JOIN db.ds_quick_list d on a.car_code = d.car_code
        where a.car_code = "${nid}" and a.expired_at is null;`
        const sql = await sequelize.query(sqlQuery, {
            type: Sequelize.QueryTypes.SELECT
        });
        const options = await quickListOptions.findAll({attributes:['name','img','price'],where:{quick_num:sql[0].seq,expired_at:null},raw:true})
        sql[0].option = options
        return sql[0]
    },

    quickOption: async (nid) => {
        const sql = await quickListOptions.findAll({attributes:['name','img','price'],where:{quick_num:nid,expired_at:null},raw:true})
        return sql
    },

    mentoring: async (body) => {
        const sql = await mentoring.create(body);
        return sql;
    },

    enter: async () => {
        const sql = await manufacturer.findAll({where:{expired_at:null},raw:true});
        return sql;
    },

    faqFilter: async () => {//카테고리랑 브랜드 검색 
        const sqlQuery = `
            SELECT a.car_code, a.name, a.info, a.img,a.category,a.price, b.enter,b.logo_img,c.*
            FROM db.ds_car_list a 
            inner JOIN db.manufacturer b ON a.enter_code = b.enter_code 
            inner JOIN db.ds_car_detail c ON a.car_code = c.car_code  
            WHERE a.expired_at IS NULL and a.car_code not in (select car_code from db.ds_discount_list WHERE car_code IS NOT NULL)
            order by a.created_at DESC;
        `;
        const sql = await sequelize.query(sqlQuery, {
            type: Sequelize.QueryTypes.SELECT
        });
        console.log(sql)
        return sql;
    },

    quickCounselingInsert: async (body) => {
        const sql = await quickCounseling.create(body)
        return sql
    },
    
};

export default sqlCar;