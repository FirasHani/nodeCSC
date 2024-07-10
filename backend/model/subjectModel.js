const mongoose = require('mongoose')
const subjectSchema = mongoose.Schema(
  {
 
    subjectName:{
        type:String
    },
    subjectPassMark:{
        type:String
    },
    subjectNewMark:{
        type:String
    },
    subjectMin:{
      type:String
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