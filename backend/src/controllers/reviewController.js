const { PrismaClient } = require("../../generated/prisma/client");
const prisma = new PrismaClient();

exports.createReview = async (req, res) => {
  const {bookId, rating, reviewText} = req.body;
  const userId = req.user.userId;

  if(!bookId || !rating || !reviewText){
    return res.status(400).json({message:"All fields are required"});
  }

  try{
    const newReview = await prisma.review.create({
      data:{
        bookId,
        rating,
        reviewText,
        userId,
      }
    })
    return res.status(201).json({message:"Review created successfully",newReview});
  }catch(err){
    return res.status(500).json({message:"Internal server error"});
  }
};