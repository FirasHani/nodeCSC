const User =require('../model/userModel')
const subjectModel =require('../model/subjectModel')
const { create } = require('domain')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const showAllStudents=async(req,res)=>{
    const allUsers=await User.find()
    res.json(allUsers)

}
//PUT
//edit
const editStudent=async(req,res)=>{
    const id=req.params.id
    const {email,name,isActive} = req.body
    const user=await User.findByIdAndUpdate(id,{email,name,isActive},{new:true})
    res.json(user)
}
// @desc  delete product
// @route DELETE product/deleteProduct/:id
// @access Admin
const deleteStudent=async(req,res) => {
    const id=req.params.id
        await User.deleteOne({_id:id})
        .then(res.json("user deleted"))
}

const createUser=async(req,res)=>{
    const{name,email,password,isAdmain}=req.body
    const checkUser=await User.findOne({email})
    if(checkUser){
        res.send("user exists")
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user= await User.create({
        name,
        email,
        password:hashedPassword,
       
    })
    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmain,
            token: generateToken(user._id),
          })
    }else {
        res.status(400)
        throw new Error('Invalid user data')
      }
}

const createSubject=async(req,res)=>{
       const {subjectName,subjectMin}=req.body
       const subject=await subjectModel.create({
        subjectName,subjectMin
       }) 
       res.json(subject)
}

const showSubject=async(req,res)=>{
    const data= await subjectModel.find()
     res.json(data)
 }

const addSubjectToStudent=async(req,res)=>{
    const subjectID=req.params.id
    const {email}=req.body
    const subject =await subjectModel.findById(subjectID)
    const student = await User.find({"email":email})
    const updatedStudent = await User.findOneAndUpdate(
        { email },
        { $addToSet: { subject: { subjectID ,
            subjectName:subject.subjectName
        } } },
        { new: true } // Return the updated document
      );
    res.json(updatedStudent)
}
 const showAllSubjectForOneStudent=async(req,res)=>{
    const studentID =req.params.id
    const student =await User.findById(studentID)
    res.json(student.subject)
 }
 const addSubjectNewMark = async (req, res) => {
    const subjectID = req.params.id; // Assuming the subject ID is in the URL parameter
    const { subjectNewMark } = req.body; // Assuming subjectNewMark is in the request body
  
    try {
      // Find the subject document (assuming you have a separate subject model)
      const subject = await subjectModel.findById(subjectID);
      if (!subject) {
        return res.status(404).json({ message: 'Subject not found' });
      }
  
      // Find the user document
      const user = await User.findOneAndUpdate(
        { "subject.subjectID": subjectID }, // Match user with matching subject ID
        { $set: { "subject.$.subjectNewMark": subjectNewMark } }, // Update subjectNewMark within the subject array
        { new: true } // Return the updated document
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found or subject not assigned' });
      }
  
      res.json({ message: 'Subject new mark updated successfully', updatedUser: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating subject new mark' });
    }
  };
// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  }
module.exports={
    showAllStudents,
    editStudent,
    deleteStudent,
    createUser,
    createSubject,
    showSubject,
    addSubjectToStudent,
    showAllSubjectForOneStudent,
    addSubjectNewMark
}