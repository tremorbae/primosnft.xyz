// Footer Injector
import { initFooter } from '../components/footer/initFooter.js';

// Inject footer template
async function injectFooter() {
    try {
        const footerContainer = document.querySelector('footer');
        if (!footerContainer) {
            console.error('Footer container not found');
            return;
        }

        // Fetch footer template
        const response = await fetch('./src/components/footer/footer-template.html');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();

        // Inject the footer template
        footerContainer.innerHTML = html;

        // Wait for DOM updates
        await new Promise(resolve => setTimeout(resolve, 100));

        // Initialize footer functionality
        initFooter();
    } catch (error) {
        console.error('Error initializing footer:', error);
    }
}

// Inject footer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add a small delay to ensure all scripts are loaded
    setTimeout(injectFooter, 200);
});
