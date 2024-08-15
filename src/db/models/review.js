import sequelize from "./index.js";
import { DataTypes, Model, Sequelize } from "sequelize";

export class review extends Model{
    //buffer에 저장하면 binary 형태로 저장이 되기 때문에 json type으로 다시 변환시켜주기 위함
    toJSON(){
        return super.toJSON();
    }

}

review.init(
    {
        seq : {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey : true
        },

        car_name : {
            type: DataTypes.STRING(45),
            allowNull : true
        },

        enter : {
            type: DataTypes.STRING(45),
            allowNull : true
        },

        name : {
            type: DataTypes.STRING(45),
            allowNull : true
        },

        img : {
            type: DataTypes.STRING(45),
            allowNull:true
        },

        star : {
            type: DataTypes.STRING(45),
            allowNull:true
        },

        comment : {
            type: DataTypes.TEXT,
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
        modelName : "review",
        tableName : "ds_review",
        timestamps : false
    }
)