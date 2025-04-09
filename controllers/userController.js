import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import sendEmail from "../utils/emailService.js";


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
    const hashedPassword = await bcrypt.hash(password, 10); 
    const user = await prisma.users.create({
      data: { firstname, lastname, email, password: hashedPassword },
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
  const user = await prisma.users.findUnique({where: {email}, include: {roles: true}})
  
 
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid){
    return res.status(401).json({message: "Invalid credentals"})
  }

  const token = jwt.sign({id: user.id, role: user.roles.name }, process.env.JWT_SECRET, { 
    expiresIn: '1h' 
  });
  res.json({token})
}


async function getUserInfo(req,res) {
   try{ 
    const user = await prisma.users.findUnique({where: {id: req.user.id}})
    res.status(200).json(user)

   }
   catch(err){  
    res.status(500).json({ message: err.message });
   }
   
}

async function forgotPassword(req,res){
  const {email} = req.body
  const user = await prisma.users.findUnique({where: {email} })
  if(!user){
    return res.status(401).json({message: "User not found"})
  }
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString()
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  await prisma.users.update({
    where: {id: user.id},
    data: {otpCode, otpExpiry}
  })
 
 
  try{
    const isEmailSent = await sendEmail(email,
       "OTP for password reset", 
       `
       <h1>Password Reset OTP Code</h1>
      <p>You requested a password reset. Use the following OTP code to reset your password:</p>
      <h2 style="color: #4CAF50; font-size: 32px; letter-spacing: 5px; text-align: center;">${otpCode}</h2>
      <p>This code will expire in 10 minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
      `,
    );
    if(isEmailSent){
      res.json({message: 'OTP send to email'})
    }
   else{
    res.status(500).json({message: 'Faild to send email'})
   }  
  }
  catch(err){
    console.error("Error sending email", err);
    
  }
}

async function resetPassword(req, res) {
  try {
    const { email, otpCode, newPassword } = req.body;
    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User is not found' });
    }

    if (user.otpCode !== otpCode || user.otpExpiry < new Date()) {
      if (user.otpAttempts > 1) {
        await prisma.users.update({
          where: { id: user.id },
          data: { otpAttempts: user.otpAttempts - 1 }
        });
        return res.status(401).json({
          message: `Invalid OTP code, ${user.otpAttempts - 1} attempts left`
        });
      } else {
        await prisma.users.update({
          where: { id: user.id },
          data: { otpCode: null, otpExpiry: null, otpAttempts: 5 }
        });
        return res.status(401).json({ message: "OTP code is cancelled after too many failed attempts" });
      }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.users.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        otpCode: null,
        otpExpiry: null,
        otpAttempts: 5 
      }
    });

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
}



export { getUsers, createUser, editUser, deleteUser, signup, signin, getUserInfo, forgotPassword ,resetPassword };
