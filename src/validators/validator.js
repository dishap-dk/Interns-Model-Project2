const Internmodel = require('../models/internModel')
const Collegemodel = require('../models/collegeModel')

// --------------------------------------------college validation-------------------------------------------------
const valiforcollege = async (req, res, next) => {
    try {
        let body = req.body;
        let { name, fullName, logoLink, isDeleted } = body

        if (Object.keys(body).length == 0) return res.status(400).send({ status: false, message: "Please enter details in body" })


        //-------------validation for name--------------------
        if (!name) {
            return res.status(400).send({ status: false, message: "Please enter Name,it's mandatory" })
        }
        let shortform = /^[a-z\s]{2,8}$/;
        if (!shortform.test(name)) {
            return res.status(400).send({ status: false, message: "Name is not in valid format, Please enter valid format(for ex:iith)" })
        }
        let collegename = await Collegemodel.findOne({ name: name, isDeleted: false })
        if (collegename) {
            return res.status(400).send({ status: false, message: "Name already exist, Use different name" })
        }

        //------------validation for full name
        if (!fullName) {
            return res.status(400).send({ status: false, message: " Please enter fullName, it's mandatory" })
        }
        if(!/^[A-Z][A-Za-z,\s]{1,}[\.]{0,1}[A-Z][A-Za-z\s]{0,}$/.test(fullName)){
            return res.status(400).send({status:false,msg:"invalid format of full name"})
        }

        fullName = fullName.trim().split(" ")

        for (let i = 0; i < fullName.length; i++) {

            if (fullName[i][0] !== fullName[i][0].toUpperCase()) {
                return res.status(400).send({
                    status: false,
                    message: "the first letter of fullname must be in uppercase"
                })
            } 
        }
        //----------validation for logo link-------------------
        if (!logoLink) {
            return res.status(400).send({ status: false, message: " Please enter logolink, it's mandatory" })
        }
        let validlogolink = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%\+.~#?&//=]*)/
        if (!validlogolink.test(logoLink)) {
            return res.status(400).send({ status: false, message: "invalid logo link,please enter valid format" })
        }
        let repeatedCollegeLink = await Collegemodel.findOne({ logoLink: logoLink, isDeleted: false })
        if (repeatedCollegeLink) {
            return res.status(400).send({ status: false, message: "Logo Link already exist" })
        }

      
        //------------validation for isDeleted--------------
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

// ---------------------------------------validation of Intern---------------------------------------
const valiforintern = async (req, res, next) => {
    try {
        let body = req.body
        let { name, email, mobile, collegeName, isDeleted } = body
        if (Object.keys(body).length === 0) {
            return res.status(400).send({ status: false, message: "Please provide data" })
        }

        //-----------------validation for name---------
        let alphabets = /^[A-Z][A-Za-z\s]{1,}[\.]{0,1}[A-Z][A-Za-z\s]{0,}$/
        if (!name) {
            return res.status(400).send({ status: false, message: "Please provide your name, it's mandatory" })
        }
        if (!alphabets.test(name)) {
            return res.status(400).send({ status: false, message: "Name contain only letters and starts with capital ( for ex:Naresh Gohil)" })
        }

        //---------validation for email
        let emailValid = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
        if (!email) {
            return res.status(400).send({ status: false, message: "Please provide your email, it's mandatory" })
        }
        if (!emailValid.test(email)) {
            return res.status(400).send({ status: false, message: "Please Enter valid email (for ex:abc@email.com)" })
        }
        let Intern = await Internmodel.findOne({ email: email, isDeleted: false })
        if (Intern) {
            return res.status(400).send({ status: false, message: "This email is already exist, Please use Diffrent email" })
        }

        //-------------validation for mobile
        let validMobile = /^(\+\d{1,3}[- ]?)?\d{10}$/
        if (!mobile) {
            return res.status(400).send({ status: false, message: " mobile Number  mandatory" })
        }
        if (!validMobile.test(mobile)) {
            return res.status(400).send({ status: false, message: "Invalid length or mobile number" })
        }
        let Inter = await Internmodel.findOne({ mobile: mobile, isDeleted: false })
        if (Inter) {
            return res.status(400).send({ status: false, message: "This mobile Number already exist,Enter New Number" })
        }
        //-------------validation for College name
        let validCollegeName = /^[a-z\s]{1,}[\.]{0,1}[a-z\s]{0,}$/

        if (!collegeName) {
            return res.status(400).send({ status: false, message: "Please provide collegename. it's mandatory" })
        }
      
        if (!validCollegeName.test(collegeName)) {
            return res.status(400).send({ status: false, message: "please enter valid format(for ex :Indian Institute)" })
        }
        let collegebyname = await Collegemodel.findOne({ name: collegeName, isDeleted: false })
        if (!collegebyname) {
            return res.status(400).send({ status: false, message: "College not exist for this college name, Please check your collage Name" })
        }
        body["collegeId"] = collegebyname._id
        //----------------validation for isDeleted
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




// ----------------exporting module-------------
module.exports.valiforcollege = valiforcollege
module.exports.valiforintern = valiforintern