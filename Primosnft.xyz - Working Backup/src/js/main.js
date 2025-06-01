// Main JavaScript file for additional functionality

// Handle dropdown menus in desktop navigation
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded - initializing dropdown menus');
    
    // Desktop dropdowns
    const dropdownTriggers = document.querySelectorAll('.nav-links .dropdown-trigger');
    console.log('Found dropdown triggers:', dropdownTriggers.length);
    
    // Add click event to each dropdown trigger
    dropdownTriggers.forEach((trigger, index) => {
        console.log('Adding click event to dropdown trigger', index);
        
        trigger.addEventListener('click', function(e) {
            console.log('Dropdown trigger clicked');
            e.preventDefault();
            
            // Get parent li element
            const parentLi = this.parentElement;
            console.log('Parent li:', parentLi);
            
            // Close other dropdowns
            document.querySelectorAll('.nav-links > li').forEach(li => {
                if (li !== parentLi && li.classList.contains('active')) {
                    console.log('Closing other dropdown');
                    li.classList.remove('active');
                }
            });
            
            // Toggle active class
            parentLi.classList.toggle('active');
            console.log('Toggled active class, is now active:', parentLi.classList.contains('active'));
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown-trigger') && !e.target.closest('.dropdown-menu')) {
            console.log('Clicked outside dropdown, closing all dropdowns');
            document.querySelectorAll('.nav-links > li.active').forEach(li => {
                li.classList.remove('active');
            });
        }
    });
});
