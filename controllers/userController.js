import { PrismaClient } from "@prisma/client";

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
    const { firstname, lastname, email } = req.body; 
    const user = await prisma.users.create({
      data: { firstname, lastname, email },
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

export { getUsers, createUser, editUser, deleteUser };
