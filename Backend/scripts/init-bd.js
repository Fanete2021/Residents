import mongoose from 'mongoose';
import fs from 'fs';
import CityModel from '../src/models/City.js';
import ResidentModel from '../src/models/Resident.js';

const importCities = async (cities) => {
  try {
    await CityModel.create(cities);

    console.log('Города успешно загружены');

    return Promise.resolve();
  } catch (error) {
    console.log('error', error);

    return Promise.reject(error);
  }
}

const importResidents = async (residents) => {
  try {
    await ResidentModel.create(residents);

    console.log('Жители успешно загружены');

    return Promise.resolve();
  } catch (error) {
    console.log('error', error);

    return Promise.reject(error);
  }
}

mongoose.connect('mongodb://127.0.0.1:27017/Residents')
  .then(() =>{
    const cities = JSON.parse(fs.readFileSync('data/cities.json', 'utf-8'));
    const residents = JSON.parse(fs.readFileSync('data/residents.json', 'utf-8'));

    Promise.all([importCities(cities), importResidents(residents)])
      .then(() => {
        console.log('Загрузка данных завершена.');
        mongoose.disconnect();
      })
      .catch((err) => {
        console.log('Ошибка при загрузке данных:', err);
        mongoose.disconnect();
      });
  })
  .catch((err) => {
    console.log('db error', err);
  });

