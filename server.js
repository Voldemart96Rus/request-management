const express = require('express');
const path = require('path');
require('dotenv').config();

const connectDB = require('./db');

const app = express();

connectDB();

app.use(express.json({extended: false}));

app.use('/api/Requests', require('./routes/api/Requests'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (_req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
