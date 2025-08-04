import express from 'express';
import cors from 'cors';
import { router } from './routes.js'

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});