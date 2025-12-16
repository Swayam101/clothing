#!/bin/bash

# Setup script for mock data configuration
echo "🎭 Setting up mock data configuration..."

# Create .env file with mock data enabled
cat > .env << 'EOF'
# API Configuration
VITE_API_BASE_URL=http://localhost:1337/api

# Mock Data Toggle - Set to 'true' to use mock data
VITE_USE_MOCK_DATA=true
EOF

echo "✅ Created .env file with mock data enabled!"
echo ""
echo "To start the app with mock data:"
echo "  yarn dev"
echo ""
echo "To switch to real API later, edit .env and set:"
echo "  VITE_USE_MOCK_DATA=false"

