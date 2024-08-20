import sequelize from "./index.js";
import { DataTypes, Model, Sequelize } from "sequelize";

export class carDetail extends Model{
    //buffer에 저장하면 binary 형태로 저장이 되기 때문에 json type으로 다시 변환시켜주기 위함
    toJSON(){
        return super.toJSON();
    }

}

carDetail.init(
    {
        seq : {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey : true
        },

        car_code : {
            type: DataTypes.STRING(45),
            allowNull : true
        },

        rental_price : {
            type: DataTypes.STRING(45),
            allowNull : true
        },

        lease_price : {
            type: DataTypes.STRING(45),
            allowNull : true
        },


        year : {
            type: DataTypes.STRING(45),
            allowNull:true
        },

        month : {
            type: DataTypes.STRING(45),
            allowNull:true
        },

        size : {
            type: DataTypes.STRING(45),
            allowNull:true
        },

        gasoline : {
            type: DataTypes.STRING(45),
            allowNull:true
        },

        diesel : {
            type: DataTypes.STRING(45),
            allowNull:true
        },

        lpg : {
            type: DataTypes.STRING(45),
            allowNull:true
        },

        hybrid : {
            type: DataTypes.STRING(45),
            allowNull:true
        },

        min_cc : {
            type: DataTypes.STRING(45),
            allowNull:true
        },

        max_cc : {
            type: DataTypes.STRING(45),
            allowNull:true
        },

        min_fuel_efficiency : {
            type: DataTypes.STRING(45),
            allowNull:true
        },

        max_fuel_efficiency : {
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
        modelName : "carDetail",
        tableName : "ds_car_detail",
        timestamps : false
    }
)