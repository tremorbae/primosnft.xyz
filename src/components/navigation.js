// Navigation functionality
export function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
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
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Toggle mobile dropdown
    if (mobileDropdownTrigger) {
        mobileDropdownTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            mobileDropdown.classList.toggle('active');
            const icon = mobileDropdownTrigger.querySelector('.fa-chevron-down');
            icon.style.transform = mobileDropdown.classList.contains('active') ? 'rotate(180deg)' : '';
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle mobile nav item animations
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    document.addEventListener('DOMContentLoaded', () => {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileNavLinks = document.querySelectorAll('.mobile-menu .nav-link');

        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close mobile menu when clicking a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });

        // Handle marketplace dropdown in mobile menu
        const marketplaceItem = document.querySelector('.mobile-menu .marketplace-item');
        marketplaceItem.addEventListener('click', (e) => {
            marketplaceItem.classList.toggle('active');
            e.stopPropagation();
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });
}
