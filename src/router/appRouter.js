import  express  from "express"; 
import adminController from "../controllers/adminController.js";
import carController from "../controllers/carController.js";
import counselingController from "../controllers/counselingController.js";
import reviewController from "../controllers/reviewController.js";
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

router.post( //빠른간편상담
    "/counseling",
    carController.counseling
)
export default router;




