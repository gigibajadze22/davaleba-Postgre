import pool from "../config/db.config.js"


async function getProducts(req, res) {

    try {
        const result = await pool.query("select * from products")
        res.json(result.rows)

    } catch (error) {
        res.status(500).json({ message: error.message })
    };

}

async function createProducts(req, res) {
    const { name, stock, category, archived, price } = req.body;
    try {
      const result = await pool.query(
        "INSERT INTO products (name, stock, category, archived, price) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, stock, category, archived, price]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async function editProducts(req, res) {
    const { id } = req.params;
    const { name, stock, category, archived, price } = req.body;
    try {
      const result = await pool.query(
        "UPDATE products SET name = $1, stock = $2, category = $3, archived = $4, price = $5 WHERE id = $6 RETURNING *",
        [name, stock, category, archived, price, id]
      );
      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  

  async function deleteProducts(req, res) {
    const { id } = req.params;
    try {
      const result = await pool.query("DELETE FROM products WHERE id = $1", [id]);
      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }



export { getProducts, createProducts, editProducts, deleteProducts }