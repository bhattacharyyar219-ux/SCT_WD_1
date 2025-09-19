// Navigation Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const colorPickerBtn = document.getElementById('color-picker-btn');
    const colorOptions = document.getElementById('color-options');
    const colorOptionElements = document.querySelectorAll('.color-option');

    // Scroll-based navigation styling
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Mobile menu toggle
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    }

    // Close mobile menu when clicking on a link
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    }

    // Set active navigation link based on current page
    function setActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPage = link.getAttribute('href');
            
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === 'index.html' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    // Smooth scroll for anchor links
    function smoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Add hover effects to navigation links
    function addHoverEffects() {
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    // Parallax effect for hero section
    function parallaxEffect() {
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            });
        }
    }

    // Add loading animation
    function addLoadingAnimation() {
        const navbar = document.getElementById('navbar');
        navbar.style.opacity = '0';
        navbar.style.transform = 'translateY(-100%)';
        
        setTimeout(() => {
            navbar.style.transition = 'all 0.5s ease';
            navbar.style.opacity = '1';
            navbar.style.transform = 'translateY(0)';
        }, 100);
    }

    // Intersection Observer for animations
    function setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe feature cards
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    }

    // Add click ripple effect
    function addRippleEffect() {
        const buttons = document.querySelectorAll('.cta-button, .nav-link');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Keyboard navigation support
    function addKeyboardNavigation() {
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
    }

    // Color picker functionality
    function initColorPicker() {
        // Load saved color theme
        const savedTheme = localStorage.getItem('navbarTheme') || 'default';
        applyTheme(savedTheme);
        updateActiveColorOption(savedTheme);

        // Toggle color picker dropdown
        colorPickerBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            colorOptions.classList.toggle('show');
        });

        // Handle color selection
        colorOptionElements.forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                const selectedColor = this.getAttribute('data-color');
                applyTheme(selectedColor);
                updateActiveColorOption(selectedColor);
                saveTheme(selectedColor);
                colorOptions.classList.remove('show');
            });
        });

        // Close color picker when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.color-picker')) {
                colorOptions.classList.remove('show');
            }
        });
    }

    // Apply theme to navigation
    function applyTheme(theme) {
        // Remove all theme classes
        navbar.classList.remove('theme-blue', 'theme-green', 'theme-purple', 'theme-orange', 'theme-red');
        
        // Add selected theme class
        if (theme !== 'default') {
            navbar.classList.add(`theme-${theme}`);
        }
    }

    // Update active color option
    function updateActiveColorOption(theme) {
        colorOptionElements.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-color') === theme) {
                option.classList.add('active');
            }
        });
    }

    // Save theme to localStorage
    function saveTheme(theme) {
        localStorage.setItem('navbarTheme', theme);
    }

    // Initialize all functions
    function init() {
        // Core functionality
        window.addEventListener('scroll', handleScroll);
        mobileMenu.addEventListener('click', toggleMobileMenu);
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Initialize other features
        setActiveLink();
        smoothScroll();
        addHoverEffects();
        parallaxEffect();
        addLoadingAnimation();
        setupIntersectionObserver();
        addRippleEffect();
        addKeyboardNavigation();
        initColorPicker();

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    }

    // Start the application
    init();
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-link, .cta-button {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);
