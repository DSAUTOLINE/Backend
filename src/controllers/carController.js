import carServices from "../services/carServices.js";

const carController = {
    home: async (req,res) => {
        try{
            const response = await carServices.home()
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },
    quickFaq: async (req,res) => {//즉시출고 ?entry = 국내 or 수입 & category = 전체 소형/승용 
        try{
            const response = await carServices.quickFaq(decodeURIComponent(req.query.entry),decodeURIComponent(req.query.enter),decodeURIComponent(req.query.category))
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },

    hotDeal: async (req,res) => { 
        try{
            const response = await carServices.hotDeal()
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },

    estimate: async (req,res) => {  //파라미터 넘겨받기  req.query.파람이름  or req.params.nid
        try{
            const response = await carServices.estimate(req.params.nid)
            return res.json(response)
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },

    estimateInsert: async (req,res) => {
        try{
            const response = await carServices.estimateInsert(req.body)
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },

    quickDeal: async (req,res) => { //즉시출고 ?entry = 국내 or 수입 & category = 전체 소형/승용 
        try{
            const response = await carServices.quickDeal(decodeURIComponent(req.query.entry),decodeURIComponent(req.query.enter),decodeURIComponent(req.query.category))
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },

    event: async (req,res) => {// 이벤트페이지 ?type = 0 or 1 null notnull 
        try{
            const response = await carServices.event(req.query.type)
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },

    eventDetail: async (req,res) => {  //파라미터 넘겨받기 
        try{
            const response = await carServices.eventDetail(req.params.nid)
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },

    review: async (req,res) => { //리뷰 최신순으로 출력 offset으로 8개씩 출력 offset: (offset-1)*8, limit 8 
        try{
            const response = await carServices.review()
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },

    reviewDetail: async (req,res) => { //파라미터 넘겨받기 
        try{
            const response = await carServices.reviewDetail(req.params.nid)
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },

    reviewInsert: async (req,res) => {
        try{
            const response = await carServices.reviewInsert(req.body)
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },

    reviewSelect: async (req,res) => {
        try{
            const response = await carServices.reviewSelect();
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },

    counseling: async (req,res) => {
        try{
            const response = await carServices.counseling(req.body)
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },

    optionList: async (req,res) => {
        try{
            const response = await carServices.optionList(req.params.nid)
            return res.json(response);
        }catch(err){
            console.log(err)
            return res.json({sc:400})
        }
    },

    imgUpload: async (req,res) => {
        try {
            const images = req.file
            const imageKey = images.key
            const imageUrl = `https://dsautoline-s3-bucket.s3.ap-northeast-2.amazonaws.com/${imageKey}`;
            res.json({ imageUrl });
        } catch (err) {
            console.error('Error during image upload:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
export default carController;