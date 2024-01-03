require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/Cart')
const paymentRoutes = require('./routes/Payment')
const path = require('path');
const cors = require('cors');


app.use(cors());

app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// CONNECT DATABASE
mongoose.connect(process.env.MONGO__URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error.message);
  });

app.use(express.json());
app.use(express.static(path.join(__dirname, '../admin-app/build')));

// ROUTES
app.use('/api', authRoutes)
app.use('/api', adminRoutes)
app.use('/api', productRoutes)
app.use('/api', cartRoutes)
app.use('/api', paymentRoutes)

app.use('*', function (req,res){
  res.sendFile(path.join(__dirname,'../admin-app/build/index.html'))
})


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

