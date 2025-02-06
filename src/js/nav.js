document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Handle navbar background on scroll
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);

    // Handle mobile menu toggle
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        
        // Reset scroll position of mobile menu when opening
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.scrollTop = 0;
        }
        
        // Close any open dropdowns when closing the mobile menu
        if (!mobileMenu.classList.contains('active')) {
            document.querySelectorAll('.mobile-menu .dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Handle dropdown menus on hover for desktop
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        
        if (dropdown.closest('.mobile-menu')) {
            // Mobile dropdown behavior
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropdown.classList.toggle('active');
            });
        } else {
            // Desktop dropdown behavior
            dropdown.addEventListener('mouseenter', () => {
                dropdown.classList.add('active');
            });
            
            dropdown.addEventListener('mouseleave', () => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu?.classList.contains('active') && 
            !e.target.closest('.mobile-menu') && 
            !e.target.closest('.hamburger')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            // Reset scroll position
            setTimeout(() => {
                mobileMenu.scrollTop = 0;
            }, 300);
            
            // Close any open dropdowns
            document.querySelectorAll('.mobile-menu .dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Close mobile menu when window is resized to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileMenu?.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            // Close any open dropdowns
            document.querySelectorAll('.mobile-menu .dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});
