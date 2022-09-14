const collegemodel = require('../models/collegemodel')


const createCollege = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "enter data to create the college" })
        let save = await collegemodel.create(data)
        return res.status(201).send({ status: true, data: save })
    }
    catch (err) {
        res.status(500).send({ status: true, msg: err.message })
    }
}

module.exports.createCollege = createCollege