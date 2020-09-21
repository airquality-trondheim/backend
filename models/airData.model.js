const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const airDataSchema = new Schema(
  {
    id: { 
      type:Number,
      required: true,
    },
    zone: { 
      type:String,
      required: true,
      minlength:3
    },
    municipality: {
      type:String,
      required: true,
      minlength:3
    },
    area:{
      type:String,
      required: true,
      minlength:3
    },
    station:{
      type:String,
      required: true,
      minlength:3
    },
    eoi:{
      type:String,
      required: true,
      minlength:3
    },
    component:{
      type:String,
      required: true,
      minlength:3
    },
    fromTime:{
      type:String,
      required: true,
      minlength:3
    },toTime:{
      type:String,
      required: true,
      minlength:3
    },value:{
      type:Number,
      required: true,
      },
      unit:{
        type:String,
      },
      latitude:{
        type:Number,
        required: true
      },
      longitude:{
        type:Number,
        required: true,
      },
      timestep:{
        type:Number,
        required: true,
      },
      index:{
        type:Number,
        required: true,
      },color: {
        type:String,
        required: true,
      },
      isValid:{
        type:Boolean,
      }
    }
);

const airData = mongoose.model('airData', airDataSchema);

module.exports = airData;