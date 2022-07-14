const express = require('express')
const app = express();
require('dotenv').config();
const server = app.listen(process.env.PORT, () => {
    console.log("Server listening at "+process.env.PORT);
});

app.use(express.json());
app.use('/api/', require('./routes/tasks'));