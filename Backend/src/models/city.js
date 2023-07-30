import mongoose from "mongoose";

const CitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  data: {
    type: String,
    required: true
  }
},
{
  versionKey: false
});

export default mongoose.model('City', CitySchema);