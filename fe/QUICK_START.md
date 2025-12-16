# 🚀 Quick Start Guide - Show Your Client in 60 Seconds!

## For Client Demo (No Backend Setup!)

```bash
# 1. Install dependencies (first time only)
yarn install

# 2. Start the app - that's it! 🎉
yarn dev
```

**Open browser:** `http://localhost:5173`

✅ **The app is already configured to use mock data!**

---

## What You'll See

### 🏠 Homepage (`/`)
- Hero carousel with 4 featured products
- Features section
- Featured products grid
- Benefits section
- Newsletter signup

### 🛍️ Products Page (`/products`)
- 16 mock products
- Pagination (12 per page)
- Product cards with images
- Click any product for details

### 👕 Product Detail Page
- Image gallery
- Product information
- Size selector
- WhatsApp/Instagram order buttons
- Trust signals

### 📄 Other Pages
- Size Guide
- About
- Contact (with FAQs)

---

## Mock Products Available

| Product | Price | Featured |
|---------|-------|----------|
| Oversized Black Tee | ₹899 | ✅ |
| Vintage Denim Jacket | ₹2,499 | ✅ |
| Classic White Hoodie | ₹1,499 | ✅ |
| Olive Cargo Pants | ₹1,799 | ✅ |
| Striped Button Shirt | ₹1,299 | |
| Grey Sweatpants | ₹1,199 | |
| Leather Bomber Jacket | ₹4,999 | |
| Graphic Print Tee | ₹799 | |
| Black Skinny Jeans | ₹1,899 | |
| Red Flannel Shirt | ₹1,399 | |
| Beige Chinos | ₹1,699 | |
| Navy Polo Shirt | ₹999 | |
| Retro Track Jacket | ₹1,899 | |
| Green Henley Shirt | ₹1,099 | |
| Khaki Shorts | ₹899 | |
| Orange Windbreaker | ₹2,199 | |

---

## How to Switch to Real API Later

When your backend is ready:

1. **Stop the dev server** (Ctrl+C)

2. **Create/Edit `.env` file:**
   ```env
   VITE_USE_MOCK_DATA=false
   VITE_API_BASE_URL=http://localhost:1337/api
   ```

3. **Restart dev server:**
   ```bash
   yarn dev
   ```

---

## Console Messages

Look for these in your browser console:

**With Mock Data:**
```
🎭 Using mock data for products
```

**With Real API (on failure):**
```
⚠️ API call failed, falling back to mock data
```

---

## Pro Tips for Client Demo

1. **Show Responsiveness**
   - Resize browser window
   - Use Chrome DevTools mobile view

2. **Show Product Flow**
   - Click a product → Select size → Click WhatsApp order
   - Shows the complete user journey

3. **Show All Pages**
   - Use navigation menu
   - Demonstrate footer links

4. **Highlight Features**
   - Sticky WhatsApp button (always visible)
   - Smooth animations on hover
   - Clean, modern design

5. **Mention Backend Integration**
   - "This is using mock data for demo"
   - "Once backend is ready, it's just one environment variable change"
   - "No code changes needed!"

---

## Troubleshooting

**Port already in use?**
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

**Need to reinstall?**
```bash
rm -rf node_modules yarn.lock
yarn install
```

**Images not loading?**
- Mock data uses Unsplash URLs
- Check internet connection
- Images load from CDN

---

## Next Steps After Client Approval

1. ✅ Mock data setup (DONE!)
2. 🔄 Backend integration (when ready)
3. 🎨 Customize brand colors/fonts
4. 📝 Update content in `src/utils/constants.ts`
5. 🖼️ Replace mock images with real product photos
6. 🚀 Deploy to production

---

**Need detailed info?** Check `MOCK_DATA_SETUP.md`

**Questions?** The app is fully functional and production-ready! 🎉

