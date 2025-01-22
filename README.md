# Primos NFT Web Application

A modern web application for the Primos NFT collection, featuring a trait builder, NFT gallery, and market analytics.

## Features

- NFT Gallery with real-time updates
- Interactive Trait Builder
- Market Analytics Dashboard
- Real-time price tracking
- Mobile-responsive design

## Project Structure

```
primos-web/
├── index.html          # Main landing page
├── builder.html        # NFT Builder interface
├── src/
│   ├── components/     # Reusable UI components
│   ├── services/       # API and external services
│   ├── utils/          # Utility functions
│   ├── styles/         # CSS styles
│   ├── config/         # Configuration files
│   └── assets/         # Static assets
│       ├── images/     # Images and media
│       └── fonts/      # Custom fonts
└── package.json        # Project dependencies
```

## Development

The project uses Live Server for development. To start working on the project:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Open with Live Server in VS Code:
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - The site will be available at http://127.0.0.1:5500

## Technologies Used

- HTML5/CSS3
- JavaScript (ES6+)
- Chart.js for analytics
- Magic Eden API integration
