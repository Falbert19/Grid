#!/bin/bash

echo "🧹 Starting project cleanup..."

# Delete unnecessary frontend files
rm -f frontend/src/App.test.js
rm -f frontend/src/reportWebVitals.js
rm -f frontend/src/setupTests.js

# Delete .DS_Store and Apple resource fork files from entire project
find . -name ".DS_Store" -type f -delete
find . -name "._*" -type f -delete

echo "✅ Cleanup complete!"

