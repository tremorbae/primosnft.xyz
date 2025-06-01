// Navigation initialization and event handlers
import { handleScroll } from './scrollHandler.js';

// Dropdown functionality
function setupDropdowns() {
    // Desktop dropdowns - using click
    const desktopTriggers = document.querySelectorAll('.navbar .dropdown-trigger');
    const desktopDropdowns = document.querySelectorAll('.navbar .dropdown-menu');

    desktopTriggers.forEach((trigger, index) => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get the parent li element
            const parentLi = trigger.parentElement;
            
            // Close other dropdowns
            desktopTriggers.forEach((otherTrigger, i) => {
                if (i !== index) {
                    otherTrigger.parentElement.classList.remove('active');
                }
            });
            
            // Toggle active class on parent li
            parentLi.classList.toggle('active');
        });
    });
    
    // Close desktop dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown-trigger') && !e.target.closest('.dropdown-menu')) {
            desktopTriggers.forEach((trigger) => {
                trigger.parentElement.classList.remove('active');
            });
        }
    });

    // Mobile dropdowns
    const mobileTriggers = document.querySelectorAll('.mobile-menu .mobile-dropdown-trigger');
    const mobileDropdowns = document.querySelectorAll('.mobile-menu .mobile-dropdown');
    const mobileMenuContent = document.querySelector('.mobile-menu-content');
    const mobileNavLinks = document.querySelector('.mobile-nav-links');

    mobileTriggers.forEach((trigger, index) => {
        const dropdown = mobileDropdowns[index];
        
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Close other dropdowns
            mobileTriggers.forEach((otherTrigger, i) => {
                if (i !== index) {
                    mobileDropdowns[i].classList.remove('active');
                    otherTrigger.classList.remove('active');
                }
            });

            // Toggle current dropdown
            if (dropdown.classList.contains('active')) {
                // If dropdown is already open, close it
                dropdown.classList.remove('active');
                trigger.classList.remove('active');
                if (mobileMenuContent) mobileMenuContent.classList.remove('active-dropdown');
                if (mobileNavLinks) mobileNavLinks.classList.remove('active-dropdown');
            } else {
                // If dropdown is closed, open it
                dropdown.classList.add('active');
                trigger.classList.add('active');
                if (mobileMenuContent) mobileMenuContent.classList.add('active-dropdown');
                if (mobileNavLinks) mobileNavLinks.classList.add('active-dropdown');
            }
        });
    });

    // Close mobile dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.mobile-dropdown') && !e.target.closest('.mobile-dropdown-trigger')) {
            mobileTriggers.forEach((trigger, index) => {
                mobileDropdowns[index].classList.remove('active');
                trigger.classList.remove('active');
            });
        }
    });
}

export function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    // Initialize scroll handler
    handleScroll(navbar);

    // Initialize dropdowns
    setupDropdowns();

    // Initialize mobile menu
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            navbar.classList.toggle('menu-active');
            document.body.classList.toggle('mobile-menu-active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                navbar.classList.remove('menu-active');
                document.body.classList.remove('mobile-menu-active');
            }
        });
    }
}
