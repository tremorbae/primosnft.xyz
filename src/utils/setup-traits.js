const fs = require('fs');
const path = require('path');

// Create trait categories
const categories = [
    'background',
    'base',
    'face',
    'brows',
    'clothing',
    'eyes',
    'hair',
    'mouth',
    'accessories'
];

// Create directories
const traitsDir = path.join(__dirname, 'traits');
if (!fs.existsSync(traitsDir)) {
    fs.mkdirSync(traitsDir);
}

categories.forEach(category => {
    const categoryDir = path.join(traitsDir, category);
    if (!fs.existsSync(categoryDir)) {
        fs.mkdirSync(categoryDir);
    }

    // Create manifest file
    const manifestPath = path.join(categoryDir, 'manifest.json');
    if (!fs.existsSync(manifestPath)) {
        fs.writeFileSync(manifestPath, JSON.stringify([], null, 2));
    }
});
