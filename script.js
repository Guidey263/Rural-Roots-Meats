document.addEventListener('DOMContentLoaded', () => {

    // --- Function to load header and footer ---
    const loadComponent = async (component, placeholderId) => {
        try {
            const response = await fetch(component);
            const data = await response.text();
            document.getElementById(placeholderId).innerHTML = data;
        } catch (error) {
            console.error(`Could not load ${component}:`, error);
        }
    };

    // --- Load Header and then initialize menu and active links ---
    loadComponent('partials/header.html', 'header-placeholder').then(() => {
        // Hamburger menu functionality
        const hamburger = document.querySelector('.hamburger-menu');
        const navLinks = document.querySelector('.nav-links');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Highlight the active navigation link
        const currentPath = window.location.pathname.split('/').pop();
        const navLinksList = document.querySelectorAll('.nav-links a');

        navLinksList.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
                link.classList.add('active');
            }
        });
    });

    // --- Load Footer ---
    loadComponent('partials/footer.html', 'footer-placeholder');

    // --- Scroll to Top Button Functionality ---
    const scrollTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) { // Show button after scrolling 300px
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});