const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes.js');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});