const mongooose = require("mongoose");
const Product = require("./models/product.js");

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

const seedProducts = [
  {
    name: "Cucumber",
    price: 1.0,
    category: "vegetable",
  },
  {
    name: "Tomato",
    price: 1.2,
    category: "vegetable",
  },
  {
    name: "Apple",
    price: 0.5,
    category: "fruit",
  },
  {
    name: "Cheddar Cheese",
    price: 5.0,
    category: "dairy",
  },
  {
    name: "Pineapple",
    price: 4.0,
    category: "fruit",
  },
]

Product.insertMany(seedProducts)
.then (res => {
    console.log(res);
})
.catch(e => {
    console.log(e);
});