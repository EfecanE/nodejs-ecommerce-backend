const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editMode: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const userId = req.user._id;
  const product = new Product(
    title,
    price,
    imageUrl,
    description,
    null,
    userId
  );

  product
    .save()
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const productId = req.params.id;
  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }

      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product" + req.params.id,
        editMode: true,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.params.id.trim();

  const prodId = productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;

  const updatedProduct = new Product(
    updatedTitle,
    updatedPrice,
    updatedImageUrl,
    updatedDescription,
    prodId
  );

  updatedProduct
    .save()
    .then(() => {
      return res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.id;
  Product.deleteById(productId)
    .then(() => {
      return res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
