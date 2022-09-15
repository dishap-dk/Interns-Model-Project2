const Internmodel = require('../models/internModel')
const collegemodel = require('../models/collegeModel')



// ------------------------------------------------POST API creating Interns--------------------------------------------------
const intern = async (req, res) => {
    try {
        let data = req.body
        let createintern = await Internmodel.create(data)
        res.status(201).send({ status: true, data: createintern })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}




// ----------------------------------------------------GET API getInternsDetails---------------------------------------------

const getInters = async function (req, res) {
    let data = req.query
    try {

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "Please Give any input" })
        }

        let getCollege = await collegemodel.findOne({ name: data.collegeName, isDeleted: false })
        // console.log(getCollege)
        if(!data.collegeName)return res.status(400).send({status:false,message:"invalid query"})

        if (!getCollege) {
            return res.status(400).send({ status: false, message: "Give a valid registered Collegename" })
        }

        let idOfCollege = getCollege._id.toString()

        let getCollegeInterns = await Internmodel.find({ collegeId: idOfCollege, isDeleted: false })

        if (getCollegeInterns.length == 0) {
            return res.status(400).send({ status: false, msg: "No intern is found with provided collegename" })
        }

        return res.status(200).send({
            data: {
                name: getCollege.name,
                fullName: getCollege.fullName,
                logoLink: getCollege.logoLink, intern: getCollegeInterns
            }
        })

    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }



}



// ----------------------------------------------------exporting module---------------------------------------------------------
module.exports.intern = intern
module.exports.getInters = getInters