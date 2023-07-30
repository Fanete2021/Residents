import ResidentModel from '../../models/Resident.js';
import CityModel from '../../models/City.js';

const checkCityAndGroup = async (cityId, groups) => {
  const city = await CityModel.findOne({ _id: cityId });
  if (!city) {
    return `Переданного cityId = ${cityId} не существует в городах`;
  }

  const group = groups.find(group => {
    return group.name.toLowerCase().startsWith(city.name.toLowerCase());
  });
  if (!group) {
    return `Переданный город не совпадает с городом в группе`;
  }
}

export const create = async (req, res) => {
  try {
    const { city_id: cityId, groups, name } = req.body;

    const verificationResult = await checkCityAndGroup(cityId, groups);
    if (verificationResult) {
      return res.status(400).json({
        message: verificationResult
      });
    }

    const doc = new ResidentModel({
      name: name,
      city_id: cityId,
      groups: groups
    });

    await doc.save();

    const resident = await ResidentModel.findOne({
      _id: doc._id
    })
      .populate('city_id')
      .exec();

    res.json(resident);
  } catch(err) {
    console.log(err);

    res.status(500).json({
      message: 'Не удалось создать жителя'
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const residents = await ResidentModel.find()
    .populate('city_id')
    .exec();

    res.json(residents);
  } catch(err) {
    console.log(err);

    res.status(500).json({
      message: 'Не удалось получить жителей'
    });
  }
};

export const remove = async (req, res) => {
  try {
    const residentId = req.params.id;

    await ResidentModel.findOneAndDelete({ _id: residentId });

    res.json({
      success: true
    });
  } catch(err) {
    console.log(err);

    res.status(500).json({
      message: 'Не удалось удалить жителя'
    });
  }
};

export const update = async (req, res) => {
  try {
    const residentId = req.params.id;
    const { city_id: cityId, groups, name } = req.body;

    const verificationResult = await checkCityAndGroup(cityId, groups);
    if (verificationResult) {
      return res.status(400).json({
        message: verificationResult
      });
    }

    await ResidentModel.findOneAndUpdate(
      { 
        _id: residentId 
      },
      {
        name: name,
        city_id: cityId,
        groups: groups
      } 
    )
      .populate('city_id')
      .exec();

    res.json({
      success: true
    });
  } catch(err) {
    console.log(err);

    res.status(500).json({
      message: 'Не удалось обновить жителя'
    });
  }
};