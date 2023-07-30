import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { CityController, ResidentController } from './controllers/index.js';
import handleValidationErrors from './utils/handleValidationErrors.js';
import { cityValidation, residentValidation } from './validations/index.js'; 

console.log(process.env.PORT)

mongoose.connect('mongodb://127.0.0.1:27017/Residents')
  .then(() =>{
    console.log('db load');
  })
  .catch((err) => {
    console.log('db error', err);
  });

const PORT = 3030;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/cities', CityController.getAll);
app.post('/cities', cityValidation, handleValidationErrors, CityController.create);
app.delete('/cities/:id', CityController.remove);
app.patch('/cities/:id', cityValidation, handleValidationErrors, CityController.update);

app.get('/residents', ResidentController.getAll);
app.post('/residents', residentValidation, handleValidationErrors, ResidentController.create);
app.delete('/residents/:id', ResidentController.remove);
app.patch('/residents/:id', residentValidation, handleValidationErrors, ResidentController.update);

app.listen(PORT);