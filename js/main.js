document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 500);
    });

    // Particle background for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const particleContainer = document.createElement('div');
        particleContainer.classList.add('particles-container');
        heroSection.appendChild(particleContainer);
        
        const particleCount = 100;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.animationDuration = `${5 + Math.random() * 10}s`;
            particle.style.width = `${2 + Math.random() * 5}px`;
            particle.style.height = particle.style.width;
            particleContainer.appendChild(particle);
        }
    }

    // Custom cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Delayed cursor outline effect
        setTimeout(() => {
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        }, 80);

        // Show cursor
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });

    // Interactive elements cursor effect
    const interactiveElements = document.querySelectorAll('a, button, .game-card, input, textarea, .slider-dot');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.border = '2px solid rgba(233, 69, 96, 0.8)';
        });
        element.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.border = '2px solid rgba(233, 69, 96, 0.5)';
        });
    });

    // Progress indicator
    const progressIndicator = document.createElement('div');
    progressIndicator.classList.add('progress-indicator');
    document.body.appendChild(progressIndicator);

    // Scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', () => {
        // Progress bar
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progressIndicator.style.width = `${scrollPercent}%`;
        
        // Scroll to top button visibility
        if (scrollTop > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }

        // Check for animation elements
        animateOnScroll();
    });

    // Scroll to top functionality
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Animate elements on scroll
    const animateOnScroll = () => {
        const animationElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
        
        animationElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.9) {
                element.classList.add('visible');
            }
        });
    };

    // Run animation check on initial load
    setTimeout(animateOnScroll, 100);

    // Dark mode toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = mobileMenuBtn.querySelector('i');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission with AJAX and popup notification
    const contactForm = document.querySelector('.contact-form form');
    const formStatus = document.getElementById('formStatus');
    const notificationPopup = document.getElementById('notificationPopup');
    const closeNotificationBtn = document.getElementById('closeNotification');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple validation
            const inputs = contactForm.querySelectorAll('input:not([type="hidden"]):not([name="_gotcha"]), textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    input.style.borderColor = 'red';
                    
                    // Remove error on input change
                    input.addEventListener('input', () => {
                        if (input.value.trim()) {
                            input.classList.remove('error');
                            input.style.borderColor = '';
                        }
                    }, { once: true });
                }
            });
            
            if (!isValid) {
                return;
            }
            
            // Show loading state
            const submitButton = contactForm.querySelector('button');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Get form action (Formspree URL)
            const action = contactForm.getAttribute('action');
            
            // Submit form with fetch API
            fetch(action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: {
                    'Accept': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                // Reset form
                contactForm.reset();
                
                // Show success popup
                notificationPopup.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is shown
                
                // Update button state
                submitButton.innerHTML = '<i class="fas fa-check"></i> Sent!';
                
                // Reset button after delay
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 2000);
            })
            .catch(error => {
                console.error('Error:', error);
                
                // Show error message
                formStatus.innerHTML = 'Oops! There was a problem sending your message. Please try again later.';
                formStatus.className = 'error';
                
                // Update button state
                submitButton.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error';
                submitButton.style.backgroundColor = '#e74c3c';
                
                // Reset button after delay
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    submitButton.style.backgroundColor = '';
                }, 3000);
                
                // Hide error message after delay
                setTimeout(() => {
                    formStatus.classList.add('hidden');
                }, 5000);
            });
        });
    }
    
    // Close notification popup
    if (closeNotificationBtn) {
        closeNotificationBtn.addEventListener('click', () => {
            notificationPopup.classList.remove('show');
            document.body.style.overflow = ''; // Re-enable scrolling
        });
        
        // Also handle the Great! button
        const closeNotificationBtnAlt = document.getElementById('closeNotificationBtn');
        if (closeNotificationBtnAlt) {
            closeNotificationBtnAlt.addEventListener('click', () => {
                notificationPopup.classList.remove('show');
                document.body.style.overflow = '';
            });
        }
        
        // Also close when clicking outside the popup content
        notificationPopup.addEventListener('click', (e) => {
            if (e.target === notificationPopup) {
                notificationPopup.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
        
        // Close with ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && notificationPopup.classList.contains('show')) {
                notificationPopup.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }

    // Intersection Observer for sections
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Game cards hover effect with 3D tilt and magnetic effect
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            // Calculate rotation based on mouse position
            const rotateX = mouseY * -0.05;
            const rotateY = mouseX * 0.05;
            
            // Calculate the magnetic pull effect
            const magneticPullX = mouseX * 0.2;
            const magneticPullY = mouseY * 0.2;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) translate(${magneticPullX * 0.1}px, ${magneticPullY * 0.1}px)`;
            
            // Apply dynamic shadow based on tilt
            const shadowX = mouseX * 0.05;
            const shadowY = mouseY * 0.05;
            card.style.boxShadow = `${-shadowX}px ${-shadowY}px 20px rgba(0, 0, 0, 0.1), 0 15px 30px rgba(0, 0, 0, 0.15)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) translate(0, 0)';
            card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        });
    });

    // Testimonial slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const sliderDots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let slideInterval;

    const showSlide = (index) => {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        sliderDots.forEach(dot => dot.classList.remove('active'));
        
        testimonialSlides[index].classList.add('active');
        sliderDots[index].classList.add('active');
        currentSlide = index;
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    };

    // Set up automatic slide change
    const startSlideInterval = () => {
        slideInterval = setInterval(nextSlide, 5000);
    };

    startSlideInterval();

    // Manual slide navigation with dots
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            startSlideInterval();
        });
    });

    // Add parallax effect to hero section
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroSection.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
        });
    }

    // Animate stats in about section
    const stats = document.querySelectorAll('.stat h3');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                let currentValue = 0;
                const duration = 2000;
                const increment = finalValue / (duration / 16);

                const updateValue = () => {
                    currentValue += increment;
                    if (currentValue < finalValue) {
                        target.textContent = Math.floor(currentValue) + '+';
                        requestAnimationFrame(updateValue);
                    } else {
                        target.textContent = finalValue + '+';
                    }
                };

                updateValue();
                statObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statObserver.observe(stat);
    });
});