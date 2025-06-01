// Navigation Injector
import { initNavigation } from '../components/navigation/initNavigation.js';

// Inject navigation template
async function injectNavigation() {
    try {
        const header = document.querySelector('header');
        if (!header) {
            console.error('Header element not found');
            return;
        }

        // Fetch navigation template
        const response = await fetch('./src/components/navigation/navigation-template.html');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();

        // Inject the navigation template
        header.innerHTML = html;

        // Wait for DOM updates
        await new Promise(resolve => setTimeout(resolve, 100));

        // Initialize navigation functionality
        initNavigation();
    } catch (error) {
        console.error('Error initializing navigation:', error);
    }
}

// Inject navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add a small delay to ensure all scripts are loaded
    setTimeout(injectNavigation, 200);
});
