import mongoose from 'mongoose';
import Product from '../models/Product';
import { connectDatabase, disconnectDatabase } from '../config/database';
import config from '../config';

interface ProductSeedData {
  title: string;
  color: string;
  condition: string;
  price: number;
  instock: number;
  fabric: string;
  description: string;
  style: string;
  size: string;
  featured?: boolean;
  image: string;
  isActive?: boolean;
}

const productSeedData: ProductSeedData[] = [
  // T-Shirts
  {
    title: "Classic White Cotton T-Shirt",
    color: "White",
    condition: "New",
    price: 19.99,
    instock: 50,
    fabric: "100% Cotton",
    description: "A comfortable, classic white t-shirt made from high-quality cotton. Perfect for everyday wear.",
    style: "Casual",
    size: "M",
    featured: true,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
  },
  {
    title: "Navy Blue Polo Shirt",
    color: "Navy Blue",
    condition: "New",
    price: 29.99,
    instock: 35,
    fabric: "Cotton Blend",
    description: "Elegant navy blue polo shirt with a classic collar design. Great for casual outings.",
    style: "Smart Casual",
    size: "L",
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500"
  },
  {
    title: "Graphic Print Tee",
    color: "Black",
    condition: "New",
    price: 24.99,
    instock: 40,
    fabric: "Cotton",
    description: "Stylish black t-shirt with an eye-catching graphic print. Express your unique style.",
    style: "Streetwear",
    size: "S",
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500"
  },

  // Jeans
  {
    title: "Slim Fit Dark Wash Jeans",
    color: "Dark Blue",
    condition: "New",
    price: 79.99,
    instock: 25,
    fabric: "Denim",
    description: "Modern slim fit jeans in a classic dark wash. Comfortable and versatile for any occasion.",
    style: "Casual",
    size: "32x32",
    featured: true,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"
  },
  {
    title: "High-Waisted Skinny Jeans",
    color: "Light Blue",
    condition: "New",
    price: 69.99,
    instock: 30,
    fabric: "Stretch Denim",
    description: "Flattering high-waisted skinny jeans that hug your curves perfectly. Made with stretch fabric for all-day comfort.",
    style: "Modern",
    size: "28x30",
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500"
  },
  {
    title: "Distressed Boyfriend Jeans",
    color: "Medium Blue",
    condition: "New",
    price: 89.99,
    instock: 20,
    fabric: "Premium Denim",
    description: "Edgy distressed boyfriend jeans with a relaxed fit. Perfect for a casual, lived-in look.",
    style: "Casual",
    size: "30x32",
    image: "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=500"
  },

  // Dresses
  {
    title: "Little Black Dress",
    color: "Black",
    condition: "New",
    price: 149.99,
    instock: 15,
    fabric: "Polyester Blend",
    description: "Timeless little black dress with a flattering silhouette. Essential for any wardrobe.",
    style: "Evening",
    size: "8",
    featured: true,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500"
  },
  {
    title: "Floral Maxi Dress",
    color: "Multicolor",
    condition: "New",
    price: 99.99,
    instock: 22,
    fabric: "Rayon",
    description: "Beautiful floral maxi dress perfect for summer occasions. Flowy and feminine.",
    style: "Boho",
    size: "10",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500"
  },
  {
    title: "Bodycon Midi Dress",
    color: "Red",
    condition: "New",
    price: 79.99,
    instock: 18,
    fabric: "Polyester",
    description: "Bold red bodycon midi dress that accentuates your curves. Perfect for a night out.",
    style: "Bodycon",
    size: "6",
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=500"
  },

  // Jackets
  {
    title: "Leather Biker Jacket",
    color: "Black",
    condition: "New",
    price: 299.99,
    instock: 12,
    fabric: "Genuine Leather",
    description: "Classic black leather biker jacket with silver hardware. A timeless piece for your wardrobe.",
    style: "Biker",
    size: "M",
    featured: true,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"
  },
  {
    title: "Denim Jacket",
    color: "Blue",
    condition: "New",
    price: 89.99,
    instock: 28,
    fabric: "Denim",
    description: "Vintage-inspired denim jacket with a relaxed fit. Perfect for layering over any outfit.",
    style: "Casual",
    size: "L",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500"
  },
  {
    title: "Wool Coat",
    color: "Camel",
    condition: "New",
    price: 199.99,
    instock: 16,
    fabric: "Wool Blend",
    description: "Elegant camel wool coat for colder weather. Luxurious and warm.",
    style: "Classic",
    size: "XL",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500"
  },

  // Accessories
  {
    title: "Leather Crossbody Bag",
    color: "Brown",
    condition: "New",
    price: 79.99,
    instock: 20,
    fabric: "Genuine Leather",
    description: "Stylish brown leather crossbody bag with adjustable strap. Perfect for everyday use.",
    style: "Casual",
    size: "One Size",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500"
  },
  {
    title: "Canvas Sneakers",
    color: "White",
    condition: "New",
    price: 59.99,
    instock: 45,
    fabric: "Canvas",
    description: "Comfortable white canvas sneakers with rubber sole. Versatile and easy to style.",
    style: "Casual",
    size: "8",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"
  },
  {
    title: "Silk Scarf",
    color: "Patterned",
    condition: "New",
    price: 49.99,
    instock: 25,
    fabric: "100% Silk",
    description: "Elegant silk scarf with beautiful patterns. Adds a touch of luxury to any outfit.",
    style: "Accessories",
    size: "One Size",
    image: "https://images.unsplash.com/photo-1601762603339-fd61e28b698a?w=500"
  },

  // More sizes for the same products
  {
    title: "Classic White Cotton T-Shirt",
    color: "White",
    condition: "New",
    price: 19.99,
    instock: 45,
    fabric: "100% Cotton",
    description: "A comfortable, classic white t-shirt made from high-quality cotton. Perfect for everyday wear.",
    style: "Casual",
    size: "L",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
  },
  {
    title: "Classic White Cotton T-Shirt",
    color: "White",
    condition: "New",
    price: 19.99,
    instock: 38,
    fabric: "100% Cotton",
    description: "A comfortable, classic white t-shirt made from high-quality cotton. Perfect for everyday wear.",
    style: "Casual",
    size: "XL",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
  },
  {
    title: "Slim Fit Dark Wash Jeans",
    color: "Dark Blue",
    condition: "New",
    price: 79.99,
    instock: 22,
    fabric: "Denim",
    description: "Modern slim fit jeans in a classic dark wash. Comfortable and versatile for any occasion.",
    style: "Casual",
    size: "34x32",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"
  }
];

async function seedProducts(): Promise<void> {
  try {
    console.log('🌱 Starting product seeding...');

    // Connect to database
    await connectDatabase();
    console.log('✅ Connected to database');

    // Check if products already exist
    const existingCount = await Product.countDocuments();
    if (existingCount > 0) {
      console.log(`⚠️  Found ${existingCount} existing products. Skipping seeding to avoid duplicates.`);
      console.log('💡 If you want to reseed, please clear the database first.');
      return;
    }

    // Insert products
    const products = await Product.insertMany(productSeedData);
    console.log(`✅ Successfully seeded ${products.length} products`);

    // Log some statistics
    const stats = await Product.aggregate([
      {
        $group: {
          _id: '$style',
          count: { $sum: 1 },
          avgPrice: { $avg: '$price' },
          totalStock: { $sum: '$instock' }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    console.log('\n📊 Seeding Statistics:');
    stats.forEach((stat: any) => {
      console.log(`  ${stat._id}: ${stat.count} products, Avg Price: $${stat.avgPrice.toFixed(2)}, Total Stock: ${stat.totalStock}`);
    });

    const featuredCount = await Product.countDocuments({ featured: true });
    console.log(`\n⭐ Featured Products: ${featuredCount}`);

  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  } finally {
    // Disconnect from database
    await disconnectDatabase();
    console.log('🔌 Disconnected from database');
    console.log('🎉 Product seeding completed!');
  }
}

// Run the seeding script
if (require.main === module) {
  seedProducts();
}

export default seedProducts;
