// Import components and utilities
import { initNavigation } from './components/navigation/index.js';
import { initFooter } from './components/footer/index.js';

// Initialize video player
function initVideo() {
    const video = document.getElementById('hero-video');
    if (video) {
        console.log('Video element found');
        video.play().catch(error => {
            console.error('Error playing video:', error);
        });
    } else {
        console.error('Video element not found');
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initFooter();
    initVideo();
});