const mongoose = require('mongoose')
const subjectSchema = mongoose.Schema(
  {
 
    subjectName:{
        type:String
    },
    subjectPassMark:{
        type:Number
    },
    subjectNewMark:{
        type:Number
    },
    subjectMin:{
      type:Number
    },
    student:[
      {
      user:{
        id:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'user'
        },
        name:{
          type:String
        }
      },
    }
    ]
  },
)
module.exports = mongoose.model('subject', subjectSchema)