import Product from "../models/product.model.js";
import cloudinary from "cloudinary";
import fs from "fs";

// configure cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// add product : /api/product/add
export const addProduct = async (req, res) => {
  try {
    const { name, price, offerPrice, description, category } = req.body;

    if (!name || !price || !offerPrice || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields including images are required",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one product image is required",
      });
    }

    // upload images to Cloudinary
    const imageUrls = [];
    for (const file of req.files) {
      const result = await cloudinary.v2.uploader.upload(file.path, {
        folder: "ZipCart_products", // folder in Cloudinary
      });
      imageUrls.push(result.secure_url);

      // remove the temporary file from server
      fs.unlinkSync(file.path);
    }

    const product = new Product({
      name,
      price,
      offerPrice,
      description,
      category,
      image: imageUrls,
    });

    const savedProduct = await product.save();

    return res.status(201).json({
      success: true,
      product: savedProduct,
      message: "Product added successfully",
    });
  } catch (error) {
    console.error("Error in addProduct:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding product",
    });
  }
};

// get products : /api/product/get
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    console.log(products)
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get single product : /api/product/id
// get single product : /api/product/id?id=123
export const getProductById = async (req, res) => {
  try {
    const { id } = req.query;  // ✅ FIXED (was req.body)
    if (!id) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error in getProductById:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// change stock : /api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { inStock },
      { new: true }
    );
    res.status(200).json({
      success: true,
      product,
      message: "Stock updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, offerPrice, description, category } = req.body;

    // find product
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // if new images uploaded
    let imageUrls = product.image;
    if (req.files && req.files.length > 0) {
      // upload new images to cloudinary
      imageUrls = [];
      for (const file of req.files) {
        const result = await cloudinary.v2.uploader.upload(file.path, {
          folder: "ZipCart_products",
        });
        imageUrls.push(result.secure_url);
        fs.unlinkSync(file.path); // delete temp file
      }
    }

    // update product fields
    product.name = name || product.name;
    product.price = price || product.price;
    product.offerPrice = offerPrice || product.offerPrice;
    product.description = description || product.description;
    product.category = category || product.category;
    product.image = imageUrls;

    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      product: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Error in updateProduct:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error while updating product" });
  }
};