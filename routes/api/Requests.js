const router = require('express').Router();
const {check} = require('express-validator');
const {
    getRequestList,
    getRequest,
    searchRequests,
    createRequest,
    changeRequest,
    deleteRequest,
} = require('../../controllers/requests');

// @route   GET api/Requests/getRequestList
// @desc    Get request list
// @access  Public
router.get('/getRequestList', async (req, res) => {
    getRequestList(req, res);
});

// @route   GET api/Requests/getRequest/:id
// @desc    Get request
// @access  Public
router.get('/getRequest/:id', async (req, res) => {
    getRequest(req, res);
});

// @route   GET api/Requests/getRequest/search/:keyword
// @desc    Search requests by keyword
// @access  Public
router.get('/search/:keyword', async (req, res) => {
    searchRequests(req, res);
});

// @route   PUT api/Requests/createRequest
// @desc    Create request
// @access  Public
router.put(
    '/createRequest',
    [
        check('fio', 'FIO is required').not().isEmpty(),
        check('companyName', 'Company name is required').not().isEmpty(),
        check('phone', 'Telephone is required').not().isEmpty(),
        check('ati', 'ATI is required').not().isEmpty(),
    ],
    async (req, res) => {
        createRequest(req, res);
    }
);

// @route   PUT api/Requests/changeRequest
// @desc    Change request
// @access  Public
router.put(
    '/changeRequest',
    [
        check('fio', 'FIO is required').not().isEmpty(),
        check('companyName', 'Company name is required').not().isEmpty(),
        check('phone', 'Telephone is required').not().isEmpty(),
        check('ati', 'ATI is required').not().isEmpty(),
    ],
    async (req, res) => {
        changeRequest(req, res);
    }
);

// @route   DELETE api/Requests/delete/:id"
// @desc    Delete request
// @access  Public
router.delete('/delete/:id', async (req, res) => {
    deleteRequest(req, res);
});

module.exports = router;
