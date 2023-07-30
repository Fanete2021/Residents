import fs from 'fs';
import ResidentModel from '../../models/Resident.js';
import CityModel from '../../models/City.js';

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

export const load = async (req, res) => {
  try {
    const cities = JSON.parse(fs.readFileSync('data/cities.json', 'utf-8'));
    const residents = JSON.parse(fs.readFileSync('data/residents.json', 'utf-8'));

    Promise.all([importCities(cities), importResidents(residents)])
      .then(() => {
        console.log('Загрузка данных завершена.');
      })
      .catch((err) => {
        console.log('Ошибка при загрузке данных:', err);
      });

    res.json({
      success: true
    });
  } catch(err) {
    console.log(err);

    res.status(500).json({
      message: 'Не удалось загрузить в базу данных'
    });
  }
};