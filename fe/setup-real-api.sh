#!/bin/bash

# Setup script for real API configuration
echo "🔌 Setting up real API configuration..."

# Create .env file with real API enabled
cat > .env << 'EOF'
# API Configuration
VITE_API_BASE_URL=http://localhost:1337/api

# Mock Data Toggle - Set to 'false' to use real API
VITE_USE_MOCK_DATA=false
EOF

echo "✅ Created .env file with real API enabled!"
echo ""
echo "⚠️  Make sure your Strapi backend is running on http://localhost:1337"
echo ""
echo "To start the app with real API:"
echo "  yarn dev"
echo ""
echo "To switch back to mock data, edit .env and set:"
echo "  VITE_USE_MOCK_DATA=true"

