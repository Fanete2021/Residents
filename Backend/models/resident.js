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

ResidentSchema.set('toJSON', {
  transform: function(doc, ret, options) {   
      if (!mongoose.Types.ObjectId.isValid(ret.city_id)) {
          ret.city = ret.city_id;
          delete ret.city_id;
      }
  }
});

export default mongoose.model('Resident', ResidentSchema);