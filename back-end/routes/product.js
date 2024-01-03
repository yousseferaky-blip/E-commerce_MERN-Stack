const express = require("express");
const cors = require("cors")
const { createProduct , AllProducts , deleteProductById , getProductById , updateProductById} = require("../controllers/product");
const {
  requireSignIn,
  adminMiddleware,
  userMiddleware,
} = require("../middleware/index");
const router = express.Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const Ext =  file.mimetype.split("/")[1]
    const fileName = `user-${Date.now()}.${Ext}` 
    cb(null, fileName)
  }
})

const fileFilter = (req, file, cb)=>{
  const imageType = file.mimetype.split("/")[0]
  if(imageType == "image"){
      return  cb(null,true)
  }else{
      const error = new Error('Invalid file type. Only images are allowed.');
      error.status = 400;
      return cb(error, false);
  }
}

const upload = multer({
  storage,
  fileFilter
})
router.use(cors());
router.post(
  "/product/create",
  upload.single("avatar"),
  createProduct
);

router.get("/products",   AllProducts)

router.delete("/product/:id",   deleteProductById)

router.get("/product/:id",   getProductById)

router.patch("/product/:id",   updateProductById)

module.exports = router;
