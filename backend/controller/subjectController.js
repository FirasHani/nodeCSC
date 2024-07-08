const subjectModel =require('../model/subjectModel')


const showSubject=async(req,res)=>{
   const data= await subjectModel.find()
    res.json(data)
}

