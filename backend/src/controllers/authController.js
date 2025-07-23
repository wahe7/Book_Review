const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("../../generated/prisma/client");
const prisma = new PrismaClient();

exports.signup = async(req,res)=>{
  const {name,email,password} = req.body;

  if(!name || !email || !password){
    return res.status(400).json({message:"All fields are required"});
  }

  const user = await prisma.user.findUnique({where:{email}});

  if(user){
    return res.status(400).json({message:"User already exists"});
  }

  const hashedPassword = await bcrypt.hash(password,10);
  try{
      const newUser = await prisma.user.create({
      data:{
        name,
        email,
        password:hashedPassword
      }
    })

    const token = jwt.sign({userId:newUser.id},process.env.JWT_SECRET,{expiresIn:"1h"});
    return res.status(201).json({message:"User created successfully",token});
  }catch(err){
    return res.status(500).json({message:"Internal server error"});
  }
}

exports.login = async(req,res)=>{
  const {email,password} = req.body;

  if(!email || !password){
    return res.status(400).json({message:"All fields are required"});
  }

  const user = await prisma.user.findUnique({where:{email}});

  if(!user){
    return res.status(400).json({message:"User does not exist"});
  }

  const isPasswordValid = await bcrypt.compare(password,user.password);

  if(!isPasswordValid){
    return res.status(400).json({message:"Invalid password"});
  }

  const token = jwt.sign({userId:user.id},process.env.JWT_SECRET,{expiresIn:"1h"});
  return res.status(200).json({message:"User logged in successfully",token});
}
