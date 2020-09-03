const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    fio: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: false,
    },
    ati: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Request = mongoose.model('Request', RequestSchema);
