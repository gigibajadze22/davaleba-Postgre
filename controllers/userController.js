import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

async function getUsers(req, res) {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createUser(req, res) {
  try {
    const { firstname, lastname, email, password } = req.body; 
    const user = await prisma.users.create({
      data: { firstname, lastname, email, password},
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function editUser(req, res) {
  try {
    const { id } = req.params;
    const { firstname, lastname, email } = req.body;  
    const user = await prisma.users.update({
      where: { id: parseInt(id) },
      data: { firstname, lastname, email },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    await prisma.users.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function signup(req,res) {
  try {
    const { firstname, lastname, email, password } = req.body; 
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.users.create({
      data: { firstname, lastname, email, password: hashedPassword},
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function signin(req,res){
  const {email, password} = req.body;
  const user = await prisma.users.findUnique({where: {email}})
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid){
    return res.status(401).json({message: "Invalid credentals"})
  }

  const token = jwt.sign({id: user.id,firstname: user.firstname, lastname:user.lastname,email: user.email}, process.env.JWT_SECRET, { 
    expiresIn: '1h' 
  });
  res.json({token})
}

async function getUserInfo(req,res) {
   try{
    const user = req.user
    console.log(user);
    res.status(200).json({id: user.id,firstname: user.firstname, lastname:user.lastname,email: user.email})

   }
   catch(err){  
    res.status(500).json({ message: err.message });
   }
   
}


export { getUsers, createUser, editUser, deleteUser, signup, signin, getUserInfo };
