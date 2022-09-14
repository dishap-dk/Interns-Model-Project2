const express=require('express');
const router=express.Router();
const interncontroller=require('../controllers/interncontriller');
const collegecontroller=require('../controllers/collegecontroller')
const validators=require('../validators/validator')


router.post ('/functionup/colleges',validators.valiforcollege,collegecontroller.createCollege)
router.post("/functionup/interns",validators.valiforintern,interncontroller.intern);
router.all('/:x/:y',(req,res)=>{
    res.status(400).send({status:false,msg:"invalid URL"})
})
router.all('/:x/',(req,res)=>{
    res.status(400).send({status:false,msg:"invalid URL"})
})
module.exports=router