import CityModel from '../../models/City.js';

export const create = async (req, res) => {
  try {
    const doc = new CityModel({
      name: req.body.name,
      data: req.body.data
    });

    const city = await doc.save();

    res.json(city);
  } catch(err) {
    console.log(err);

    res.status(500).json({
      message: 'Не удалось создать город'
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const cities = await CityModel.find();

    res.json(cities);
  } catch(err) {
    console.log(err);

    res.status(500).json({
      message: 'Не удалось получить города'
    });
  }
};

export const remove = async (req, res) => {
  try {
    const cityId = req.params.id;

    await CityModel.findOneAndDelete({ _id: cityId });

    res.json({
      success: true
    });
  } catch(err) {
    console.log(err);

    res.status(500).json({
      message: 'Не удалось удалить город'
    });
  }
};

export const update = async (req, res) => {
  try {
    const cityId = req.params.id;

    await CityModel.findOneAndUpdate(
      { 
        _id: cityId 
      },
      {
        name: req.body.name,
        data: req.body.data
      } 
    );

    res.json({
      success: true
    });
  } catch(err) {
    console.log(err);

    res.status(500).json({
      message: 'Не удалось обновить город'
    });
  }
};