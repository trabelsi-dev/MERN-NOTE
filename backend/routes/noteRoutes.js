const express = require("express");
const { getNotes,createNote,getNoteById,UpdateNote,DeleteNote} = require("../controlles/noteController");
const router = express.Router();
const {protect} =require("../middlewares/authMiddleware")

router.route('/').get(protect,getNotes)
router.route('/create').post(protect,createNote)
router.route('/create').post(protect,createNote)
router.route('/:id').get(getNoteById).put(protect,UpdateNote).delete(protect,DeleteNote)

module.exports = router

