import express from "express";
import path from "path";
import cors from "cors"
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";

import router from "./router/appRouter.js";
dotenv.config();
const app = express();
const __dirname = path.resolve()
app.set('port', process.env.PORT || 3000);
app.use(morgan ('dev')); // 개발 => dev, 배포 => combined
app.use(express.static(__dirname));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({extended : true,limit: '50mb'})); //extended 는 중첩된 객체표현을 허용할지 말지 정함 객체 안에 객체를 파싱할 수 있게하려면 true. true = qs, false querystring
app.use(cors());

app.use("/",router);
app.listen(app.get('port'),()=>{
    console.log("start server");
});