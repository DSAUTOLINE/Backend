import reviewServices from "../services/reviewServices.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const reviewController = {
    msgsender: async (req,res) => {
        try{
            const data = new FormData()
            data.append('senderKey','abcd1234abcd1234abcd1234abcd1234abcd1234')
            data.append('templateCode','SJB_102055')
            data.append('contents','알림톡 테스트입니다. 변수의 실제 값을 포함하여 완전한 문장으로 전송합니다.')
            data.append('receiverTelNo','01000000000')
            data.append('userKey','123e4567e89b')
            const response = await axios.post("https://apimsg-dev.wideshot.co.kr/api/v2/message/alimtalk",data,{
                headers: {'Content-Type':'multipart/form-data','sejongApiKey':process.env.wideshot_api_sender_key}
            })
            console.log(response.data)
            //const response = await ansimiService.ansimi(req.body)
            return res.json(response.data);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },
    msglog: async (req,res) => {
        try{
            const data = new FormData()
            const response = await axios.get("https://apimsg-dev.wideshot.co.kr/api/v2/message/results",{
                headers: {'sejongApiKey':process.env.wideshot_api_sender_key}
            })
            console.log(response.data)
            //const response = await ansimiService.ansimi(req.body)
            return res.json(response.data);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },
}
export default reviewController;