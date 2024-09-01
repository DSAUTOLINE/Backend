import sequelize from "./index.js";
import { DataTypes, Model, Sequelize } from "sequelize";

export class quickListOptions extends Model{
    //buffer에 저장하면 binary 형태로 저장이 되기 때문에 json type으로 다시 변환시켜주기 위함
    toJSON(){
        return super.toJSON();
    }

}

quickListOptions.init(
    {
        seq : {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey : true
        },

        quick_num : {
            type: DataTypes.STRING(45),
            allowNull : true
        },

        name : {
            type: DataTypes.TEXT,
            allowNull : true
        },

        img : {
            type: DataTypes.STRING(45),
            allowNull : true
        },

        price : {
            type: DataTypes.INTEGER,
            allowNull : true
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
        modelName : "quickListOptions",
        tableName : "ds_quick_list_options",
        timestamps : false
    }
)