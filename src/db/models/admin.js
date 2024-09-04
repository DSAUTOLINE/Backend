import sequelize from "./index.js";
import { DataTypes, Model, Sequelize } from "sequelize";

export class admin extends Model{
    //buffer에 저장하면 binary 형태로 저장이 되기 때문에 json type으로 다시 변환시켜주기 위함
    toJSON(){
        return super.toJSON();
    }

}

admin.init(
    {
        id : {
            type: DataTypes.STRING(45),
            primaryKey : true
        },

        password: {
            type: DataTypes.STRING(255),
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
        modelName : "admin",
        tableName : "ds_admin",
        timestamps : false
    }
)