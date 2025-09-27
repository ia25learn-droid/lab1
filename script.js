// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Animated counter for hero stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat h3');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
                    const suffix = counter.textContent.replace(/[\d]/g, '');
                    
                    let current = 0;
                    const increment = target / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target + suffix;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.ceil(current) + suffix;
                        }
                    }, 40);
                    
                    observer.unobserve(counter);
                }
            });
        });

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    // Progress bar animation
    function animateProgressBar() {
        const progressBar = document.querySelector('.progress-fill');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressBar.style.width = '25%';
                    observer.unobserve(entry.target);
                }
            });
        });

        if (progressBar) {
            observer.observe(progressBar);
        }
    }

    // Form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const orderData = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                flavor: formData.get('flavor'),
                quantity: formData.get('quantity'),
                message: formData.get('message')
            };

            // Simple form validation
            if (!orderData.name || !orderData.email || !orderData.phone || !orderData.flavor) {
                showNotification('Please fill in all required fields!', 'error');
                return;
            }

            // Simulate form submission
            showNotification('Thank you! Your pre-order has been received. We\'ll contact you soon!', 'success');
            
            // Reset form
            this.reset();
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 10000;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;

        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
        `;

        notification.querySelector('.notification-close').style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            margin-left: auto;
        `;

        // Add to document
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);

        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }

    // Scroll-triggered animations
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.menu-item, .point, .stat');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }

    // Ice cream flavor selector enhancement
    function enhanceFlavorSelector() {
        const flavorSelect = document.getElementById('flavor');
        if (flavorSelect) {
            const flavors = {
                'vanilla': '🍦',
                'chocolate': '🍫',
                'strawberry': '🍓',
                'mint': '🌿',
                'caramel': '🍯',
                'royal': '👑',
                'premium': '⭐'
            };

            // Add emojis to options
            Array.from(flavorSelect.options).forEach(option => {
                if (option.value && flavors[option.value]) {
                    option.textContent = `${flavors[option.value]} ${option.textContent}`;
                }
            });
        }
    }

    // Quantity selector with price calculation
    function setupPriceCalculator() {
        const quantityInput = document.getElementById('quantity');
        const flavorSelect = document.getElementById('flavor');
        
        if (quantityInput && flavorSelect) {
            const priceDisplay = document.createElement('div');
            priceDisplay.className = 'price-display';
            priceDisplay.style.cssText = `
                margin-top: 1rem;
                padding: 1rem;
                background: #f0f0f0;
                border-radius: 10px;
                text-align: center;
                font-weight: 600;
                color: #FF6B6B;
            `;
            quantityInput.closest('.form-group').appendChild(priceDisplay);

            function calculatePrice() {
                const quantity = parseInt(quantityInput.value) || 1;
                const flavor = flavorSelect.value;
                let pricePerScoop = 5;

                if (flavor && (flavor.includes('caramel') || flavor.includes('royal'))) {
                    pricePerScoop = 7;
                } else if (flavor === 'premium') {
                    pricePerScoop = 8;
                }

                const total = quantity * pricePerScoop;
                priceDisplay.textContent = `Estimated Total: $${total}`;
            }

            quantityInput.addEventListener('input', calculatePrice);
            flavorSelect.addEventListener('change', calculatePrice);
            calculatePrice(); // Initial calculation
        }
    }

    // Parallax effect for hero section
    function initParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroImage = document.querySelector('.ice-cream-stack');
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrolled * 0.1}px) rotate(${scrolled * 0.02}deg)`;
            }
        });
    }

    // Initialize all features
    animateCounters();
    animateProgressBar();
    initScrollAnimations();
    enhanceFlavorSelector();
    setupPriceCalculator();
    initParallax();

    // Easter egg: Ice cream emoji shower
    let clickCount = 0;
    document.querySelector('.logo').addEventListener('click', function() {
        clickCount++;
        if (clickCount === 5) {
            createIceCreamShower();
            clickCount = 0;
        }
    });

    function createIceCreamShower() {
        const emojis = ['🍦', '🍨', '🧁', '🍓', '🍫', '🌿'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const emoji = document.createElement('div');
                emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                emoji.style.cssText = `
                    position: fixed;
                    top: -50px;
                    left: ${Math.random() * 100}vw;
                    font-size: 2rem;
                    z-index: 10000;
                    pointer-events: none;
                    animation: fall 3s linear forwards;
                `;
                
                document.body.appendChild(emoji);
                
                setTimeout(() => {
                    emoji.remove();
                }, 3000);
            }, i * 100);
        }
        
        // Add CSS animation for falling
        if (!document.querySelector('#fall-animation')) {
            const style = document.createElement('style');
            style.id = 'fall-animation';
            style.textContent = `
                @keyframes fall {
                    to {
                        transform: translateY(110vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful');
        }, function(err) {
            console.log('ServiceWorker registration failed');
        });
    });
}