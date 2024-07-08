const mongoose = require('mongoose')
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String
    },
    isAdmin:{
      type:Boolean,
      default:false,
    },
    isActive:{
        type:Boolean,
        default:false
    },
    subject:[
      {
        subjectID:{
            type:mongoose.Schema.Types.ObjectId,
              ref:'subject'
        },
        subjectName:{
          type:String
        },
        subjectPassMark:{
          type:Number
      },
      subjectNewMark:{
          type:Number
      }
      }
    ]

  },
)
module.exports = mongoose.model('user', userSchema)