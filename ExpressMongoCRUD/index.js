const express = require("express");
const app = express();
const path = require("path");
const mongooose = require("mongoose");
const Product = require("./models/product.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

mongooose
  .connect("mongodb://localhost:27017/shopApp", {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo Connection Open");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(3000, () => {
  console.log("Listening on Port 3000");
});

app.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.render("products/index.ejs", { products });
});

app.get("/products/new", (req, res) => {
  res.render("products/new.ejs");
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    console.log(product);
    res.render("products/details", { product });
  } catch (e) {
    console.log(e);
    res.render("products/404");
  }
});

app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    console.log(product);
    res.render("products/edit", { product });
  } catch (e) {
    console.log(e);
    res.render("products/404");
  }
});

app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  console.log(newProduct);
  res.redirect(`products/${newProduct._id}`);
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${product._id}`);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  res.redirect("/products");
});
