const express=require('express');
const router=express.Router();
const interncontroller=require('../controllers/internController');
const collegecontroller=require('../controllers/collegeController')
const validators=require('../validators/validator')


router.post ('/functionup/colleges',validators.valiforcollege,collegecontroller.createCollege)
router.post("/functionup/interns",validators.valiforintern,interncontroller.intern);
router.get("/functionup/collegeDetails",interncontroller.getInters);




// -----------------------------------------------------errorHandling for wrong address--------------------------------------------------------
router.all("/**", function (req, res) {         
    res.status(404).send({
        status: false,
        msg: "The api you request is not available"
    })
})
module.exports=router