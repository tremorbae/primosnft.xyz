// Navigation functionality
export function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileDropdownTrigger = document.querySelector('.mobile-dropdown-trigger');
    const mobileDropdown = document.querySelector('.mobile-dropdown');

    // Handle scroll event to change navbar style
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);

    // Toggle mobile menu on hamburger click
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            navbar.classList.toggle('mobile-menu-active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Toggle mobile dropdown
    if (mobileDropdownTrigger) {
        mobileDropdownTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            mobileDropdownTrigger.classList.toggle('active');
            mobileDropdown.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
                navbar.classList.remove('mobile-menu-active');
                mobileDropdownTrigger.classList.remove('active');
                mobileDropdown.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
            navbar.classList.remove('mobile-menu-active');
            mobileDropdownTrigger.classList.remove('active');
            mobileDropdown.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}
