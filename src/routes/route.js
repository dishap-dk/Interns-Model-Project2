const express=require('express');
const router=express.Router();
const interncontroller=require('../controllers/interncontriller');
const validators=require('../validators/validator')

router.post("/functionup/interns",validators.valiforintern,interncontroller.intern);


module.exports=router