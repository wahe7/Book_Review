const express = require("express");
const router = express.Router();

const {createBook,getBooks,getBookById} = require("../controllers/bookController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/",authMiddleware,createBook);
router.get("/",authMiddleware,getBooks);
router.get("/:id",authMiddleware,getBookById);

module.exports = router;