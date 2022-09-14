const Internmodel = require('../models/internmodel')
const Collegemodel = require('../models/collegemodel')


const valiforcollege = async (req, res, next) => {
    try {
        let body = req.body;
        let { name, fullName, logoLink, isDeleted } = body

        if (Object.keys(body).length == 0) return res.status(400).send({ status: false, message: "Please enter some detail in body" })
        //validation for name
        if (!name) {
            return res.status(400).send({ status: false, message: "Please enter Name,it's mandatory" })
        }
        let sortform = /^[a-z\s]{2,8}$/;
        if (!sortform.test(name)) {
            return res.status(400).send({ status: false, message: "Name is not in valid formet, Please enter valid formet(for ex:iith)" })
        }
        let collegename = await Collegemodel.findOne({ name: name, isDeleted: false })
        if (collegename) {
            return res.status(400).send({ status: false, message: "Name is already exist, Use diffrent name" })
        }

        //validation for full name
        console.log((fullName.split(" ")))
        if (!fullName) {
            return res.status(400).send({ status: false, message: " Please enter fullName, it's mandatory" })
        }
        let alphabets = /^[A-Z][A-Za-z\s]{1,}[\.]{0,1}[A-Z][A-Za-z\s]{0,}$/    //not proper working
        if (!alphabets.test(fullName)) {
            return res.status(400).send({ status: false, message: "FullName is not in valid formet,please enter valid formet(for ex :Indian Institued)" })
        }
        //validation for logo link
        if (!logoLink) {
            return res.status(400).send({ status: false, message: " Please enter logolink, it's mandatory" })
        }
        let validlogolink = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%\+.~#?&//=]*)/
        if(!validlogolink.test(logoLink)) {
            return res.status(400).send({ status: false, message: "Logo link is not in valid formet,please enter valid formet" })
        }
        //validation for isDeleted
        if (isDeleted) {
            if (typeof (isDeleted) !== "boolean") {
                return res.status(400).send({ status: false, message: "IsDeleted contains only boolean value" })
            }message
        }
        next()
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}



const valiforintern = async (req, res, next) => {
    try {
        let body = req.body
        let { name, email, mobile, collageName, isDeleted } = body
        if (Object.keys(body).length === 0) {
            return res.status(400).send({ status: false, message: "Please provide some data, You have not put it blank" })
        }

        //validation for name
        let alphabets = /^[A-Z][A-Za-z\s]{1,}[\.]{0,1}[A-Z][A-Za-z\s]{0,}$/
        if (!name) {
            return res.status(400).send({ status: false, message: "Please provide your name, it's mandatory" })
        }
        if (!alphabets.test(name)) {
            return res.status(400).send({ status: false, message: "Name contain only letters and starting with capital ( for ex:Naresh Gohil)" })
        }

        //validation for email
        let emailValid = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
        if (!email) {
            return res.status(400).send({ status: false, message: "Please provide your email, it's mandatory" })
        }
        if (!emailValid.test(email)) {
            return res.status(400).send({ status: false, message: "This email is not valid, Please Enter valid email (for ex:abc@email.com)" })
        }
        let Intern = await Internmodel.findOne({ email: email, isDeleted: false })
        if (Intern) {
            return res.status(400).send({ status: false, message: "This email is already exist, Please use Diffrent email" })
        }

        //validation for mobile
        let validMobile = /^(\+\d{1,3}[- ]?)?\d{10}$/
        if (!mobile) {
            return res.status(400).send({ status: false, message: "Please provide your mobile Number, it's mandatory" })
        }
        if (!validMobile.test(mobile)) {
            return res.status(400).send({ status: false, message: "This mobile Number is not valid ,mobile Number contain only 10 digit" })
        }
        let Inter = await Internmodel.findOne({ mobile: mobile, isDeleted: false })
        if (Inter) {
            return res.status(400).send({ status: false, message: "This mobile Number is already exist,Please use Diffrent mobile Number" })
        }
        //validation for College name
        if (!collageName) {
            return res.status(400).send({ status: false, message: "Please provide collegename. it's mandatory" })
        }
        //not proper working
        if (!alphabets.test(collageName)) {
            return res.status(400).send({ status: false, message: "CollageName is not in valid formet,please enter valid formet(for ex :Indian Institued)" })
        }
        let collegebyname = await Collegemodel.findOne({ fullName: collageName, isDeleted: false })
        if (!collegebyname) {
            return res.status(400).send({ status: false, message: "College is not exist for this college name, Please check your collage Name" })
        }
        body["collegeId"] = collegebyname._id
        //validation for isDeleted
        if (isDeleted) {
            if (typeof (isDeleted) !== "boolean") {
                return res.status(400).send({ status: false, message: "IsDeleted contains only boolean value" })
            }
        }
        next()
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.valiforcollege = valiforcollege
module.exports.valiforintern = valiforintern