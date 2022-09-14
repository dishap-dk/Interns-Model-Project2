const mongoose = require('mongoose');

const internSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
        unique: true
    },
    mobile: {
        type: Number,
        require: true,
        match: [/^(\+\d{1,3}[- ]?)?\d{10}$/],
        unique: true
    },
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "College"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestams: true });

module.exports=mongoose.model('Intern',internSchema)