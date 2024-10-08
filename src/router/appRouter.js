import  express  from "express"; 
import adminController from "../controllers/adminController.js";
import carController from "../controllers/carController.js";
import counselingController from "../controllers/counselingController.js";
import reviewController from "../controllers/reviewController.js";
import { upload } from "../middleware/imageUpload.js";
const router = express.Router();

router.get(
    "/home",
    carController.home
)

router.get( //견적서 정보 불러오기 
    "/estimate/:nid",
    carController.estimate
)

router.post( //견적서 추가 
    "/estimateInsert",
    carController.estimateInsert
)

router.get( //빠른간편문의 리스트  ?entry = 국내 or 수입 & category = 전체 소형/승용 
    "/quickFaq",
    carController.quickFaq
)

router.get( //한정 특가 리스트 
    "/hotDeal",
    carController.hotDeal
)

router.get( //즉시출고 ?entry = 국내 or 수입 & category = 전체 소형/승용 
    "/quickDeal",
    carController.quickDeal
)

router.get( // 이벤트페이지 ?type = 0 or 1 null notnull 
    "/event",
    carController.event
)

router.get( //nid로 리뷰상세 출력 
    "/event/:nid",
    carController.eventDetail
)

router.get( //리뷰 최신순으로 출력 offset으로 8개씩 출력 offset: (offset-1)*8, limit 8 
    "/review",
    carController.review
)

router.get( //리뷰 상세 
    "/review/:nid",
    carController.reviewDetail
)

router.post( //리뷰추가 
    "/reviewInsert",
    carController.reviewInsert
)

router.get( //리뷰추가 
    "/reviewSelect",
    carController.reviewSelect
)

router.post( //빠른간편상담
    "/counseling",
    carController.counseling
)

router.get(
    "/optionList/:nid",
    carController.optionList

)

router.get(
    "/ranking",
    carController.ranking

)

router.get(
    "/quickEstimate/:nid",
    carController.quickEstimate
)

router.post(
    "/mentoring",
    carController.mentoring
)

router.post('/image', upload.single('file'),async (req, res) => { //수정
    try{
        console.log(req.file)
        return res.json({sc:200})
    }catch(err){
        console.log(req.file)
        return res.json({sc:400})
    }
});

//관리자 
router.post( //리뷰 상세 
    "/eventInsert",
    adminController.eventInsert
)

router.delete( //리뷰 상세 
    "/eventDelete/:nid",
    adminController.eventDelete
)

router.delete( //리뷰 상세 
    "/reviewDelete/:nid",
    adminController.reviewDelete
)

router.post( //리뷰 상세 
    "/reviewChange",
    adminController.reviewChange
)

router.get( //리뷰 상세 
    "/allColor",
    adminController.allColor
)

router.post( //리뷰 상세 
    "/allColorInsert",
    adminController.allColorInsert
)

router.delete( //리뷰 상세 
    "/allColorDelete/:nid",
    adminController.allColorDelete
)

router.get( //리뷰 상세 
    "/allOption",
    adminController.allOption
)

router.post( //리뷰 상세 
    "/allOptionInsert",
    adminController.allOptionInsert
)

router.delete( //리뷰 상세 
    "/allOptionDelete/:nid",
    adminController.allOptionDelete
)

router.get( //리뷰 상세 
    "/customerList",
    adminController.customerList
)

router.get( //리뷰 상세 
    "/currentSituation",
    adminController.CurrentSituation
)
router.delete( //리뷰 상세 
    "/quickInquiryDelete/:nid",
    adminController.quickInquiryDelete
)

router.post( //리뷰 상세 
    "/quickInquiryChange",
    adminController.quickInquiryChange
)
router.delete( //리뷰 상세 
    "/carInquiryDelete/:nid",
    adminController.carInquiryDelete
)

router.post( //리뷰 상세 
    "/carInquiryChange",
    adminController.carInquiryChange
)

router.delete( //리뷰 상세 
    "/counselingInquiryDelete/:nid",
    adminController.counselingInquiryDelete
)

router.post( //리뷰 상세 
    "/counselingInquiryChange",
    adminController.counselingInquiryChange
)

router.delete( //리뷰 상세  
    "/mentoInquiryDelete/:nid",
    adminController.mentoInquiryDelete
)

router.post( //리뷰 상세 
    "/mentoInquiryChange",
    adminController.mentoInquiryChange
)

router.post( //리뷰 상세 
    "/carInsert",
    adminController.carInsert
)

router.post( //리뷰 상세 
    "/quickInsert",
    adminController.quickInsert
)

router.get(
    "/enter",
    carController.enter
)

router.get(
    "/faqFilter",
    carController.faqFilter
)

router.post(
    "/hotDealInsert",
    adminController.hotDealInsert
)

router.post(
    "/quickCounselingInsert",
    carController.quickCounselingInsert
)

router.delete( //리뷰 상세 
    "/carFaqDelete/:nid",
    adminController.carFaqDelete
)

router.delete( //리뷰 상세 
    "/hotDealDelete/:nid",
    adminController.hotDealDelete
)

router.delete( //리뷰 상세 
    "/quickDealDelete/:nid",
    adminController.quickDealDelete
)

router.post(
    "/admin-hash/secure-entry-point/login",
    adminController.admin
)

router.get(
    "/healthcheck",async (req,res) => {
        try{
            return res.json("OK")
        }catch(err){
            return res.status(400)
        }
    }
)

//카카오톡 테스트 
router.get(
    "/msgsender",
    reviewController.msgsender
)

router.get(
    "/msglog",
    reviewController.msglog
)
export default router;





