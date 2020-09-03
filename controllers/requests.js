const {validationResult} = require('express-validator');

const Request = require('../db/models/Request');

const getRequestList = async (_req, res) => {
    try {
        const requestList = await Request.find();
        res.json(requestList);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const getRequest = async (req, res) => {
    const requestId = req.params.id;
    try {
        let request = await Request.findById(requestId);
        res.json(request);
    } catch (error) {
        console.error(error);
        if (error.name === 'CastError') {
            res.status(404).send('Заявка не найдена!');
        } else {
            res.status(500).send('Server Error');
        }
    }
};

const searchRequests = async (req, res) => {
    const searchRegex = new RegExp(req.params.keyword, 'i');
    try {
        let request = (await Request.find()).filter(
            (el) =>
                searchRegex.test(el.companyName) ||
                searchRegex.test(el.fio) ||
                searchRegex.test(el.phone) ||
                searchRegex.test(el.ati) ||
                searchRegex.test(el._id) ||
                searchRegex.test(el.date)
        );
        res.json(request);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const createRequest = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    try {
        const request = await Request.create(
            ({fio, companyName, phone, comment, ati} = req.body)
        );

        res.status(200).json({id: request._id});
    } catch (error) {
        console.error(error);
        if (error.name === 'CastError') {
            return res.status(400).json(['Cast Error']);
        }
        res.status(500).send('Server Error');
    }
};

const changeRequest = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    try {
        const {id, fio, companyName, phone, comment, ati} = req.body;
        const request = await Request.findById(id);
        request.fio = fio;
        request.companyName = companyName;
        request.phone = phone;
        request.comment = comment;
        request.ati = ati;

        await request.save();

        res.status(200).json(request);
    } catch (error) {
        console.error(error);
        if (error.name === 'CastError') {
            return res.status(400).json(['Cast Error']);
        }
        res.status(500).send('Server Error');
    }
};

const deleteRequest = async (req, res) => {
    const requestId = req.params.id;
    try {
        await Request.findByIdAndDelete(requestId);
        res.status(200).json({id: requestId});
    } catch (error) {
        console.error(error);
        if (error.name === 'CastError') {
            return res.status(400).json(['Cast Error']);
        }
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getRequestList,
    getRequest,
    searchRequests,
    createRequest,
    changeRequest,
    deleteRequest,
};
