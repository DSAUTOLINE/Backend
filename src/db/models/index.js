import dotenv from "dotenv";
import  Sequelize  from "sequelize";

dotenv.config();
const sequelize = new Sequelize({
    username : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE,
    host : process.env.DB_HOST,
    dialect : "mysql",
    timezone: "Asia/Seoul"
});

console.log("DB Connect!");

export default sequelize;