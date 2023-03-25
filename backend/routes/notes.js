
const express = require('express')
const  verifytoken  = require('../middleware/auth.js')
const { addnotes, allnotes, getnotes, deletenote, updatenote, deleteallnote } = require('../controllers/notes')

const router = express.Router()

router.post("/addnotes", verifytoken, addnotes)
router.get('/allnotes/:id', verifytoken, allnotes )
router.get('/getnotes/:id', verifytoken, getnotes )
router.delete('/deletenotes/:id', verifytoken, deletenote )
router.put('/editnote/:id', verifytoken, updatenote )
router.delete('/deleteall/:id', verifytoken, deleteallnote )
// router.delete('deletesurvey/', verifytoken, deleteSurvey)
// router.put('/questions', verifytoken, questions)


module.exports = router