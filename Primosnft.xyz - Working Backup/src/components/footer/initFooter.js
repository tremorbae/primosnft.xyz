// Initialize footer functionality
export function initFooter() {
    // Update copyright year
    const copyrightYear = document.querySelector('.footer-content p');
    if (copyrightYear) {
        const currentYear = new Date().getFullYear();
        copyrightYear.textContent = `© ${currentYear} Primos, LLC`;
    }

    // Initialize social links hover effects
    const socialLinks = document.querySelectorAll('.footer-social .social-icon');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });
}
