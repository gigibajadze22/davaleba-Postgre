
import pool from "../config/db.config.js"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function getProducts(req, res) {

    try {
        const products = await prisma.products.findMany({
          include: {
            category: {
              select: {
                name:true
              }
            }
          }
        })
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    };

}

async function createProducts(req, res) {
    try {
      const { name, stock, category, archived, price } = req.body;
      const product = await prisma.products.create({
      data: { name, stock, category, archived, price }
     })
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async function editProducts(req, res) {
    
    try {
      const { id } = req.params;
      const { name, stock, category, archived, price } = req.body;
      const product = await prisma.products.update({
        where: {id: parseInt(id)},
        data: { name, stock, category, archived, price }
      })
      res.json(product)
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  

  async function deleteProducts(req, res) {
    try {
      const { id } = req.params;
      const product = await prisma.products.delete({
        where: {id: parseInt(id)},
      })
      res.json({message: 'Product deleted successfully'})
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async function buyProduct(req, res) {
    try {
        const { id } = req.params;
        const { userId } = req.body;  // Make sure userId is accessed from the body

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Check if product exists
        const product = await prisma.products.findUnique({
            where: { id: parseInt(id) }
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if the product has enough stock
        if (product.stock <= 0) {
            return res.status(400).json({ message: "Not enough stock to complete the purchase" });
        }

        // Decrease the product stock
        const updatedProduct = await prisma.products.update({
            where: { id: parseInt(id) },
            data: {
                stock: product.stock - 1
            }
        });

        // Add the purchased product to the usersProducts table
        const newPurchase = await prisma.usersProducts.create({
            data: {
                userId: parseInt(userId),  // Use the userId from the body
                productId: parseInt(id)
            }
        });

        // Respond with the success message and details
        res.json({
            message: "Product purchased successfully",
            product: updatedProduct,
            purchase: newPurchase
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


  async function getCategoryStats(req,res){
    try{
      const result = await prisma.products.groupBy({
        by: ['name'],
        _count: true,
        _avg:{price: true},
        _min:{price: true},
        _max:{price: true}
      })
      res.json(result)
    }catch(error){
      res.status(500).json({error:"Internal server error"})
    }
  }


export { getProducts, createProducts, editProducts, deleteProducts,buyProduct, getCategoryStats}