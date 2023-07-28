import mongoose from "mongoose";

const ResidentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  city_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true
  },
  groups: {
    type: [
      {
        type: {
          type: String,
          required: true
        },
        name: {
          type: String,
          required: true
        }
      }
    ],
    required: true
  }
},
{
  versionKey: false
});

export default mongoose.model('Resident', ResidentSchema);