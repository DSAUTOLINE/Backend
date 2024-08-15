import sequelize from "./index.js";
import { DataTypes, Model, Sequelize } from "sequelize";

export class carList extends Model{
    //buffer에 저장하면 binary 형태로 저장이 되기 때문에 json type으로 다시 변환시켜주기 위함
    toJSON(){
        return super.toJSON();
    }

}

carList.init(
    {
        car_code : {
            type: DataTypes.STRING(45),
            primaryKey : true
        },

        name : {
            type: DataTypes.STRING(45),
            allowNull : true
        },

        info : {
            type: DataTypes.STRING(45),
            allowNull : true
        },

        img : {
            type: DataTypes.STRING(45),
            allowNull:true
        },

        in_color : {
            type: DataTypes.STRING(45),
            allowNull:true
        },

        out_color : {
            type: DataTypes.STRING(45),
            allowNull:true
        },

        category : {
            type: DataTypes.STRING(45),
            allowNull:true
        },

        
        enter_code : {
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
        modelName : "carList",
        tableName : "ds_car_list",
        timestamps : false
    }
)