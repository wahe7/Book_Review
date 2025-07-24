const express = require("express");
const router = express.Router();

const {createReview, getReview} = require("../controllers/reviewController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/:bookId", authMiddleware, createReview);
router.get("/:bookId",getReview);

module.exports = router;
