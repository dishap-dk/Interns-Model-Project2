const express=require('express');
const router=express.Router();
const interncontroller=require('../controllers/interncontriller');
const collegecontroller=require('../controllers/collegecontroller')
const validators=require('../validators/validator')


router.post ('/functionup/colleges',validators.valiforcollege,collegecontroller.createCollege)
router.post("/functionup/interns",validators.valiforintern,interncontroller.intern);


module.exports=router