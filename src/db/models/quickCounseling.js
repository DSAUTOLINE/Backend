import sequelize from "./index.js";
import { DataTypes, Model, Sequelize } from "sequelize";

export class quickCounseling extends Model{
    //buffer에 저장하면 binary 형태로 저장이 되기 때문에 json type으로 다시 변환시켜주기 위함
    toJSON(){
        return super.toJSON();
    }

}

quickCounseling.init(
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

        name : {
            type: DataTypes.STRING(45),
            allowNull : true
        },

        phone : {
            type: DataTypes.STRING(45),
            allowNull:true
        },

        type : {
            type: DataTypes.STRING(45),
            allowNull:true
        },

        allow : {
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
        modelName : "quickCounseling",
        tableName : "ds_quick_counseling",
        timestamps : false
    }
)