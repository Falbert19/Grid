// backend/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const Brand = require('./models/Brand');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/clothing-app';

const sampleProducts = [
  {
    name: 'Streetwear Hoodie',
    image: 'https://picsum.photos/400/300?random=1',
    price: 45,
  },
  {
    name: 'Vintage Denim Jacket',
    image: 'https://picsum.photos/400/300?random=2',
    price: 60,
  },
  {
    name: 'Minimalist T-Shirt',
    image: 'https://picsum.photos/400/300?random=3',
    price: 25,
  },
  {
    name: 'Cargo Pants',
    image: 'https://picsum.photos/400/300?random=4',
    price: 35,
  },
  {
    name: 'Oversized Sweater',
    image: 'https://picsum.photos/400/300?random=5',
    price: 50,
  },
  {
    name: 'Checkered Shirt',
    image: 'https://picsum.photos/400/300?random=6',
    price: 30,
  },
];

async function seedData() {
  try {
    await mongoose.connect(MONGO_URI);
    await Product.deleteMany();
    await Brand.deleteMany();

    const brand = await Brand.create({
      name: 'Local Brand Co.',
      description: 'Independent fashion made locally',
      logo: 'https://picsum.photos/80?random=99',
    });

    const productsWithBrand = sampleProducts.map((product) => ({
      ...product,
      brand: brand._id,
    }));

    await Product.insertMany(productsWithBrand);

    console.log('Seed successful');
    process.exit();
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
}

seedData();
