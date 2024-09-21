import axios from "axios";
import dotenv from "dotenv";
import moment from "moment-timezone";
dotenv.config();

// AWS 서비스들과 상호작용하기 위해 필요

// AWS 자격증명 .env파일에서 환경변수들을 갖고 온다.

const kakao = {
    alimtalk: async (name,phone) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let seoulTime = moment.tz("Asia/Seoul").format('YYMMDD');
        for (let i = 0; i < 6; i++) {
            seoulTime += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        const button = `{"attachment":{"button":[{"name":"채널 추가","type":"AC"}]}}`
        const link = `{"url_mobile":"https://dsautoline.com","url_pc":"https://dsautoline.com/"}`
        console.log(button)
        const text = `안녕하세요, ${name}고객님.\nDS오토라인입니다!\n\n고객님께서 저희 DS오토라인을 선택해주신 것에 진심으로 감사드립니다.\n고객님의 신뢰에 보답하기 위해 신속하고 정확한 상담을 제공하겠습니다.\n\n고객님의 요청에 따라 전문 카멘토가 곧 기입하신 연락처로 연락드릴 예정입니다.\n상담 중 궁금한 점이나 추가적인 요청 사항이 있으시면 언제든지 편하게 말씀 부탁드립니다.\n\n저희는 고객님의 만족을 최우선으로 생각하며, 믿음직한 서비스를 약속드립니다.\n감사합니다.`
        const data = new FormData()
        data.append('senderKey',process.env.WIDE_SHOT_KEY)
        data.append('templateCode',process.env.TEMPLATE_KEY)
        data.append('contents',text)
        data.append('receiverTelNo',phone)
        data.append('userKey',seoulTime)
        data.append('messageType','AT')
        data.append('attachment',button)
        data.append('link',link)
        console.log(JSON.parse(button))
        const response = await axios.post("https://apimsg.wideshot.co.kr/api/v3/message/alimtalk",data,{
            headers: {'Content-Type':'multipart/form-data','sejongApiKey':process.env.SEJONG_API_KEY}
        })
        console.log(response.data)
    }
    
};
export default kakao

