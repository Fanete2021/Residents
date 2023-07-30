import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import CityRouter from './routes/CityRouter.js';
import ResidentRouter from './routes/ResidentRouter.js';
import {LoadController} from './controllers/index.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME
  })
  .then(() =>{
    console.log('db load');
  })
  .catch((err) => {
    console.log('db error', err);
    process.exit();
  });

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/cities', CityRouter);
app.use('/residents', ResidentRouter);

app.get('/load', LoadController.load);

app.listen(PORT);