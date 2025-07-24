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
  const {genre, author, page=1, limit=5} = req.query;
  const skip = (page-1)*limit;
  const filter = {
    ...(genre && { genre: { contains: genre, mode: 'insensitive' } }),
    ...(author && { author: { contains: author, mode: 'insensitive' } }),
  };
  console.log(filter);
  try{
    const [books, totalCount] = await Promise.all([
      prisma.book.findMany({
        where:filter,
        skip: Number(skip),
        take: Number(limit),
        include: { reviews: true },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.book.count({ where:filter }),
    ]);
    console.log(books);
    if(!books){
      return res.status(404).json({ message: "No books found" });
    }
    const totalPages = Math.ceil(totalCount / limit);

    const allbooks = books.map(book=>{
      const reviews = book.reviews || [];
      const rating = reviews.map(r=>r.rating).filter(Boolean);

      const avg = rating.length> 0? rating.reduce((a,b)=>a+b,0)/rating.length:null;
      return {...book,avgReview:avg, reviewCount:reviews.length};
    })

    res.json({allbooks,totalPages, currentPage: Number(page)});
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getBookById = async (req, res) => {
  const {id} = req.params;
  try {
    const book = await prisma.book.findUnique({where:{id:parseInt(id)},include:{reviews:true}});

    if(!book){
      return res.status(404).json({ message: "Book not found" });
    }
    const reviews = book.reviews || [];
    const rating = reviews.map(r=>r.rating).filter(Boolean);
    const avg = rating.length> 0? rating.reduce((a,b)=>a+b,0)/rating.length:null;
    const bookRes = {...book,averageRating:avg,reviewCount:reviews.length};
    return res.status(200).json({ bookRes });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
  