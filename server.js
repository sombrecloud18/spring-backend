const { setupRoutes } = require('./routes')
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

setupRoutes(app);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
