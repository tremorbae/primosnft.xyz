// Image optimization and lazy loading handler
document.addEventListener('DOMContentLoaded', () => {
    // Initialize intersection observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });

    // Handle image loading errors
    const handleImageError = (img) => {
        img.style.opacity = '0.5';
        img.style.filter = 'grayscale(100%)';
        console.error(`Failed to load image: ${img.src}`);
    };

    // Add loading="lazy" to images below the fold
    document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }

        // Add error handling
        img.addEventListener('error', () => handleImageError(img));
        
        // Observe images with data-src
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
});
