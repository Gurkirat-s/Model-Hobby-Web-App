const express = require("express");
const session = require("express-session");

const catalog = require("./data/catalog.json");
const allProducts = require("./data/products.json");

require("dotenv").config();

const app = express();
const port = process.argv[2] || process.env.PORT;

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/Catalog", (req, res) => {
  res.send(catalog);
});

app.get("/api/products/category/:id", (req, res) => {
  const catId = parseInt(req.params.id);
  const products = allProducts.filter((product) => {
    console.log(product.catId, catId);
    return product.catId === catId;
  });
  res.send(products);
});

app.get("/api/products/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const result = allProducts.find((product) => product.id === id);

  res.send(result);
});

const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`server listening to ${host}:${port}`);
});
