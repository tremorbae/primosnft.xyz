export function initializeHeroVideo() {
    const video = document.getElementById('hero-video');
    const heroContent = document.querySelector('.hero-content');
    if (!video || !heroContent) return;

    // Start loading video immediately
    video.load();

    // Initially hide both video and content
    video.style.opacity = '0';
    heroContent.style.opacity = '0';

    // Play video as soon as enough data is loaded
    video.addEventListener('loadeddata', () => {
        video.play().catch(error => {
            console.error('Error playing video:', error);
        });
    });

    // Show both video and content when video starts playing
    video.addEventListener('playing', () => {
        video.style.opacity = '1';
        heroContent.style.opacity = '1';
    });

    // Handle video loading issues
    video.addEventListener('waiting', () => {
        video.style.opacity = '0';
        heroContent.style.opacity = '0';
    });

    // Preload the logo image
    const logo = heroContent.querySelector('.hero-logo');
    if (logo) {
        const img = new Image();
        img.src = logo.src;
        img.onload = () => {
            logo.style.opacity = '1';
        };
    }
}
