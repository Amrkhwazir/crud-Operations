import mongoose  from "mongoose";

const crudSchema = new mongoose.Schema({
  desc:{
    type: String,
    required: true,
    max: 50
  },
  title:{
    type: String,
    required: true
  },
  status:{
    type: String,
    required: true
  },
},
{timestamps: true}
);

export default mongoose.model('Post', crudSchema);