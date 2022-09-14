const Internmodel = require('../models/internmodel')
const Collegemodel=require('../models/collegemodel')

const valiforintern = async (req, res) => {
    try {
        let body = req.body

        if (Object.keys(body).length === 0) {
            return res.status(400).send({ status: false, msg: "Please provide some data,You have not put it blank" })
        }

        //validation for name
        let alphabets = /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/
        if (!body.name) {
            return res.status(400).send({ status: false, msg: "Please provide your name. it's mandatory" })
        }
        if (!alphabets.test(body.fname)) {
            return res.status(400).send({ status: false, msg: "name must contain only letters and first letter is capital" })
        }

        //validation for email
        let emailValid = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
        if (!body.email) {
            return res.status(400).send({ status: false, msg: "Please provide your email" })
        }
        if (!emailValid.test(body.email)) {
            return res.status(400).send({ status: false, msg: "This email is not valid ,Please Enter valid email" })
        }
        let Intern = await Internmodel.findOne({ email: body.email })
        if (Intern) {
            return res.status(400).send({ status: false, msg: "This email is already exist,Please use Diffrent email" })
        }

        //validation for mobile
        let mobile = /^(\+\d{1,3}[- ]?)?\d{10}$/
        if (!body.mobile) {
            return res.status(400).send({ status: false, msg: "Please provide your mobile Number" })
        }
        if (!mobile.test(body.mobile)) {
            return res.status(400).send({ status: false, msg: "This mobile Number is not valid ,Please Enter valid mobile Number" })
        }
        let Inter = await Internmodel.findOne({ mobile: body.mobile })
        if (Inter) {
            return res.status(400).send({ status: false, msg: "This mobile Number is already exist,Please use Diffrent mobile Number" })
        }
        //validation for College name
        if (!body.collegename) {
            return res.status(400).send({ status: false, msg: "Please provide collegename. it's mandatory" })
        }
        let collegebyname = await Collegemodel.findOne({fullName:body.collegename})
        if (!collegebyname) {
            return res.status(400).send({ status: false, msg: "college is not exist for this college name" })
        }
        body["collegeId"]=collegebyname._id
        //validation for isDeleted
        if (blog.isDeleted) {
            if (typeof (blog.isDeleted) !== "boolean") {
                return res.status(400).send({ status: false, msg: "contains only boolean value in isDeleted" })
            }
        }
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.valiforintern=valiforintern