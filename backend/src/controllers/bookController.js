const { PrismaClient } = require("../../generated/prisma/client");
const prisma = new PrismaClient();


exports.createBook = async (req, res) => {
  const { title, author, genre } = req.body;

  if (!title || !author || !genre) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        genre,
      },
    });
    return res.status(201).json({ message: "Book created successfully", newBook });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getBooks = async (req, res) => {
  const {genre, author} = req.query;
  try {
    const books = await prisma.book.findMany({
      where:{
        ...(genre && {genre}),
        ...(author && {author})
      },
      include:{
        reviews:true
      },
      orderBy:{
        createdAt:"desc"
      }
    });
    if(!books){
      return res.status(404).json({ message: "No books found" });
    }

    const avgReview = books.map(book=>{
      const reviews = book.reviews || [];
      const rating = reviews.map(r=>r.rating).filter(Boolean);

      const avg = rating.length> 0? rating.reduce((a,b)=>a+b,0)/rating.length:null;
      return {...book,avgReview:avg, reviewCount:reviews.length};
    })

    res.json({avgReview});
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getBookById = async (req, res) => {
  const {id} = req.params;
  try {
    const book = await prisma.book.findUnique({where:{id:parseInt(id)}});
    if(!book){
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ book });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
  