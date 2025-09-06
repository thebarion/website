// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const navbar = document.getElementById('navbar');

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        const isOpen = mobileMenu.style.display === 'block';
        mobileMenu.style.display = isOpen ? 'none' : 'block';
        
        // Change icon
        const icon = mobileMenuBtn.querySelector('i');
        icon.className = isOpen ? 'fas fa-bars' : 'fas fa-times';
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.style.display = 'none';
            const icon = mobileMenuBtn.querySelector('i');
            icon.className = 'fas fa-bars';
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip smooth scrolling for external links (like catalog.html)
            if (href.includes('.html')) {
                return; // Let the browser handle the navigation
            }
            
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active navigation link on scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section link
                const activeLinks = document.querySelectorAll(`[data-section="${sectionId}"]`);
                activeLinks.forEach(link => link.classList.add('active'));
            }
        });
    }

    // Navbar background on scroll
    function updateNavbarBackground() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    // Listen for scroll events
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        updateNavbarBackground();
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Simple validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Newsletter subscription
    const newsletterBtn = document.querySelector('.newsletter-btn');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', function() {
            const emailInput = document.querySelector('.newsletter-input');
            const email = emailInput.value.trim();
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        });
    }

    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.feature-card, .stat-item, .contact-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Set initial styles for animation
    document.querySelectorAll('.feature-card, .stat-item, .contact-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Listen for scroll to trigger animations
    window.addEventListener('scroll', animateOnScroll);
    
    // Trigger animation on load
    animateOnScroll();

    // Initialize active navigation link
    updateActiveNavLink();
});

// Utility function to scroll to a specific section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Handle button clicks with smooth scrolling
document.addEventListener('click', function(e) {
    // Handle "Learn More" button in hero section
    if (e.target.textContent.includes('Learn More')) {
        e.preventDefault();
        scrollToSection('about');
    }
    
    // Handle other navigation clicks
    if (e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        scrollToSection(targetId);
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(function() {
        document.body.style.opacity = '1';
    }, 100);
});

// Add hover effects for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImg = document.querySelector('.hero-img');
    
    if (heroImg) {
        const rate = scrolled * -0.1;
        heroImg.style.transform = `translateY(${rate}px)`;
    }
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        const suffix = counter.textContent.replace(/[0-9]/g, '');
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + suffix;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + suffix;
            }
        }, 20);
    });
}

// Trigger counter animation when stats section is visible
let countersAnimated = false;
window.addEventListener('scroll', function() {
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection && !countersAnimated) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            animateCounters();
            countersAnimated = true;
        }
    }
});

// Hero Image Slider Functionality - FIXED VERSION
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('heroSlider');
    if (!slider) return; // Only run on pages with slider
    
    const sliderTrack = document.getElementById('sliderTrack');
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;
    let restartTimeout; // NEW: For delayed restart
    
    // Function to go to specific slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        const translateX = -slideIndex * 25; // 25% per slide (since we have 4 slides at 25% width each)
        sliderTrack.style.transform = `translateX(${translateX}%)`;
        
        // Update active states
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === slideIndex);
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === slideIndex);
        });
    }
    
    // Next slide function
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }
    
    // Previous slide function
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(currentSlide);
    }
    
    // FIXED: Auto slide function with proper cleanup
    function startAutoSlide() {
        clearInterval(autoSlideInterval);
        clearTimeout(restartTimeout); // Clean up any pending restart
        autoSlideInterval = setInterval(nextSlide, 4000); // Change every 4 seconds
    }
    
    // FIXED: Stop auto slide with timeout cleanup
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
        clearTimeout(restartTimeout);
    }
    
    // FIXED: Event listeners with delayed restart to prevent timing conflicts
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            // Wait 4 seconds before restarting auto-slide to prevent conflicts
            restartTimeout = setTimeout(startAutoSlide, 4000);
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            // Wait 4 seconds before restarting auto-slide to prevent conflicts
            restartTimeout = setTimeout(startAutoSlide, 4000);
        });
    }
    
    // FIXED: Dot navigation with delayed restart
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopAutoSlide();
            // Wait 4 seconds before restarting auto-slide to prevent conflicts
            restartTimeout = setTimeout(startAutoSlide, 4000);
        });
    });
    
    // Pause auto slide on hover (unchanged)
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
    
    // Touch/swipe support for mobile (unchanged)
    let startX = 0;
    let isDragging = false;
    
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        stopAutoSlide();
    });
    
    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    slider.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > 50) { // Minimum swipe distance
            if (diffX > 0) {
                nextSlide(); // Swipe left - next slide
            } else {
                prevSlide(); // Swipe right - previous slide
            }
        }
        
        // FIXED: Delayed restart after touch interaction
        restartTimeout = setTimeout(startAutoSlide, 4000);
    });
    
    // Initialize slider (unchanged)
    goToSlide(0);
    startAutoSlide();
    
    // FIXED: Keyboard navigation with delayed restart
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoSlide();
            restartTimeout = setTimeout(startAutoSlide, 4000);
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoSlide();
            restartTimeout = setTimeout(startAutoSlide, 4000);
        }
    });
});

// Catalog page functionality (unchanged)
if (window.location.pathname.includes('catalog.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const searchInput = document.getElementById('catalogSearch');
        const categoryFilter = document.getElementById('categoryFilter');
        const categoryTabs = document.querySelectorAll('.category-tab');
        const productCards = document.querySelectorAll('.product-card');
        const loadMoreBtn = document.querySelector('.load-more-btn');

        // Search functionality
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                filterProducts(searchTerm, getActiveCategory());
            });
        }

        // Category filter dropdown
        if (categoryFilter) {
            categoryFilter.addEventListener('change', function() {
                const category = this.value;
                const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
                filterProducts(searchTerm, category);
            });
        }

        // Category tabs
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Update active tab
                categoryTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
                filterProducts(searchTerm, category);
            });
        });

        // Get active category from tabs
        function getActiveCategory() {
            const activeTab = document.querySelector('.category-tab.active');
            return activeTab ? activeTab.getAttribute('data-category') : 'all';
        }

        // Filter products based on search and category
        function filterProducts(searchTerm, category) {
            let visibleCount = 0;
            
            productCards.forEach(card => {
                const title = card.querySelector('.product-title').textContent.toLowerCase();
                const description = card.querySelector('.product-description').textContent.toLowerCase();
                const cardCategory = card.getAttribute('data-category');
                
                const matchesSearch = searchTerm === '' || 
                                    title.includes(searchTerm) || 
                                    description.includes(searchTerm);
                
                const matchesCategory = category === '' || 
                                      category === 'all' || 
                                      cardCategory === category;
                
                if (matchesSearch && matchesCategory) {
                    card.classList.remove('hidden');
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                }
            });

            // Show/hide load more button based on visible products
            if (loadMoreBtn) {
                loadMoreBtn.style.display = visibleCount > 8 ? 'none' : 'block';
            }
        }

        // Load more functionality (simulate loading more products)
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function() {
                // In a real application, this would load more products from an API
                alert('Loading more products... (This is a demo)');
            });
        }

        // Product detail buttons
        document.querySelectorAll('.product-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const productTitle = this.closest('.product-card').querySelector('.product-title').textContent;
                alert(`Opening details for: ${productTitle}\n\n(This would open a detailed product page in a real application)`);
            });
        });

        // Add scroll animations for product cards
        function animateProductCards() {
            const cards = document.querySelectorAll('.product-card:not(.hidden)');
            
            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }

        // Set initial styles for product cards
        productCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        // Trigger animations
        window.addEventListener('scroll', animateProductCards);
        animateProductCards(); // Trigger on load
    });
}