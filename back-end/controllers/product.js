const productSchema = require("../models/product");
const shortid = require("shortid");
exports.createProduct = async (req, res, next) => {
  const { name, price, description , offer } = req.body;
  const avatar = req.file ? req.file.filename : null;
  const product = await productSchema({
    name,
    price,
    description,
    offer,
    avatar,
    slug: shortid.generate(), 
  });
  await product.save();
  res.status(200).json({ Product: { product } });
};


exports.AllProducts = async (req,res)=> {

 try {
        const products = await productSchema.find({},{})
        res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.deleteProductById = async (req,res,next) =>{
    try{
      const Id = req.params.id
      const Product = await productSchema.findByIdAndDelete(Id)
      if(Product){
        res.status(200).json({message:"Product deleted successfully",Product})
      }else{
        res.status(404).json({message:"Product not found"})
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.getProductById = async (req,res,next) =>{
    try{
      const Id = req.params.id
      const Product = await productSchema.findById(Id)
      if(Product){
        res.status(200).json({ Product })
      }else{
        res.status(404).json({message:"Product not found"})
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.updateProductById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;
    let productPictures = [];

    if (req.files && req.files.length > 0) {
      productPictures = req.files.map((file) => {
        return { img: file.filename };
      });
    }

    // إذا لم يكن هناك صور جديدة في الطلب، فقط استخدم الصور الحالية
    if (!productPictures || productPictures.length === 0) {
      // لاحظ هنا: لا تقم بتحديث productPictures إذا لم تكن هناك صور جديدة
      // يمكنك إما حذف هذا السطر أو تركه كما هو وفقًا لمتطلبات تطبيقك
    } else {
      // إذا كان هناك صور جديدة، دمجها مع الصور الحالية
      if (updateData.productPictures && updateData.productPictures.length > 0) {
        productPictures = [...updateData.productPictures, ...productPictures];
      }
    }

    // قم بتحديث البيانات بما في ذلك الصور
    updateData.productPictures = productPictures;

    const updatedProduct = await productSchema.findByIdAndUpdate(productId, updateData, { new: true });

    if (updatedProduct) {
      res.status(200).json({ product: updatedProduct });
    } else {
      res.status(404).json({ message: "Product not found" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};