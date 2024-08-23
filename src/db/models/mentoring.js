import sequelize from "./index.js";
import { DataTypes, Model, Sequelize } from "sequelize";

export class mentoring extends Model{
    //buffer에 저장하면 binary 형태로 저장이 되기 때문에 json type으로 다시 변환시켜주기 위함
    toJSON(){
        return super.toJSON();
    }

}

mentoring.init(
    {
        seq : {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey : true
        },

        mento : {
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
        modelName : "mentoring",
        tableName : "ds_mentoring",
        timestamps : false
    }
)