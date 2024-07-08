const express = require('express')
const router = express.Router()
const{
    showAllStudents,
    editStudent,
    deleteStudent,
    createUser,
    createSubject,
    showSubject,
    addSubjectToStudent,
    showAllSubjectForOneStudent,
    addSubjectNewMark
}=require('../controller/adminController')
const {
    protect,
    admin
}=require('../middleware/auth')

router.get('/showAllStudents',protect,admin,showAllStudents)
router.put('/editStudent/:id',protect,admin,editStudent)
router.delete('/deleteStudent/:id',protect,admin,deleteStudent)
router.post('/createUser',protect,admin,createUser)
router.post('/createSubject',protect,admin,createSubject)
router.get('/showSubject',protect,admin,showSubject)
router.put('/addSubjectToStudent/:id',protect,admin,addSubjectToStudent)
router.get('/showAllSubjectForOneStudent/:id',protect,admin,showAllSubjectForOneStudent)
router.put('/addSubjectNewMark/:id',protect,admin,addSubjectNewMark)
module.exports = router