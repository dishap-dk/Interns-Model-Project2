const Internmodel = require('../models/internmodel')


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

module.exports.intern=intern