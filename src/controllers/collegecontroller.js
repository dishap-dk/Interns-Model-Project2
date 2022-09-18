const collegemodel = require('../models/collegeModel')


//POST API-createCollege
const createCollege = async function (req, res) {
    try {
        let data = req.body
        
        let save = await collegemodel.create(data)
        return res.status(201).send({ status: true, data: save })
    }
    catch (err) {
        res.status(500).send({ status: true, message: err.message })
    }
}

module.exports.createCollege = createCollege