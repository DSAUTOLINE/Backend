import sequelize from "./index.js";
import { DataTypes, Model, Sequelize } from "sequelize";

export class estimate extends Model{
    //buffer에 저장하면 binary 형태로 저장이 되기 때문에 json type으로 다시 변환시켜주기 위함
    toJSON(){
        return super.toJSON();
    }

}

estimate.init(
    {
        order_num : {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey : true
        },

        car_code : {
            type: DataTypes.STRING(45),
            allowNull : true
        },

        out_color : {
            type: DataTypes.STRING(45),
            allowNull : true
        },

        trim1 : {
            type: DataTypes.STRING(45),
            allowNull:true
        },

        trim2 : {
            type: DataTypes.STRING(45),
            allowNull:true
        },

        method : {
            type: DataTypes.STRING(45),
            allowNull:true
        },

        period : {
            type: DataTypes.STRING(45),
            allowNull:true
        },

        deposit : {
            type: DataTypes.STRING(45),
            allowNull:true
        },

        deposit_price : {
            type: DataTypes.INTEGER,
            allowNull:true
        },

        payment_price : {
            type: DataTypes.STRING(45),
            allowNull:true
        },

        age : {
            type: DataTypes.STRING(45),
            allowNull:true
        },

        annual_mileage : {
            type: DataTypes.STRING(45),
            allowNull:true
        },

        name : {
            type: DataTypes.STRING(45),
            allowNull:true
        },

        phone : {
            type: DataTypes.STRING(45),
            allowNull:true
        },

        created_at : {
            type : 'TIMESTAMP',
            defaultValue : Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull : false
        },

        expired_at : {
            type : 'TIMESTAMP',
            allowNull : true
        }
    },

    {
        sequelize,
        modelName : "estimate",
        tableName : "ds_estimate",
        timestamps : false
    }
)