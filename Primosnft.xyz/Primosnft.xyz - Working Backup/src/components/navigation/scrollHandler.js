// Handle scroll events for navigation
export function handleScroll(navbar) {
    const onScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    };

    window.addEventListener('scroll', onScroll);
}
