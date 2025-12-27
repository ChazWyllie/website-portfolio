// ================================================================
// ANIMATIONS.JS - GSAP Scroll Animations & Interactions
// ================================================================

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

// ================================================================
// 0. PERFORMANCE OPTIMIZATION - Disable animations on low-end devices
// ================================================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isLowEndDevice = navigator.deviceMemory ? navigator.deviceMemory < 4 : false;

// Function to skip animations if needed
function shouldAnimate() {
    return !prefersReducedMotion && !isLowEndDevice;
}

// ================================================================
// 1. INITIALIZE VANILLA TILT FOR PROJECT CARDS
// ================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Vanilla Tilt on all project cards with data-tilt attribute
    const tiltElements = document.querySelectorAll('[data-tilt]');
    tiltElements.forEach(element => {
        if (typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(element, {
                max: 15,
                scale: 1.05,
                speed: 400
            });
        }
    });
});

// ================================================================
// 2. SCROLL-TRIGGERED ANIMATIONS FOR SECTIONS
// ================================================================

// Animate all sections with data-animate attribute
document.querySelectorAll('[data-animate]').forEach(element => {
    const animationType = element.getAttribute('data-animate');
    
    let timeline = gsap.timeline({
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none',
            markers: false
        }
    });

    if (animationType === 'fade-in') {
        timeline.from(element, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out'
        });
    }
});

// ================================================================
// 3. HERO PARALLAX EFFECT
// ================================================================

const heroSection = document.querySelector('.hero');
if (heroSection) {
    gsap.to(heroSection, {
        scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            markers: false
        },
        y: 100,
        opacity: 0.9,
        duration: 1
    });
}

// ================================================================
// 4. STAGGERED PROJECT CARD REVEALS
// ================================================================

const projectCards = document.querySelectorAll('.project-card');
if (projectCards.length > 0) {
    gsap.from(projectCards, {
        scrollTrigger: {
            trigger: '.projects',
            start: 'top 75%',
            toggleActions: 'play none none none',
            markers: false
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
    });
}

// ================================================================
// 5. SKILL BARS FILL ON SCROLL
// ================================================================

const skillBars = document.querySelectorAll('.skill-bar');
skillBars.forEach(bar => {
    const progressBar = bar.querySelector('.skill-progress');
    if (progressBar) {
        const percentage = bar.getAttribute('data-percentage') || '80';
        
        gsap.to(progressBar, {
            scrollTrigger: {
                trigger: bar,
                start: 'top 80%',
                toggleActions: 'play none none none',
                markers: false
            },
            width: percentage + '%',
            duration: 0.8,
            ease: 'power2.out'
        });
    }
});

// ================================================================
// 6. STICKY HEADER ON SCROLL
// ================================================================

const header = document.querySelector('.header');
if (header) {
    gsap.to(header, {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            onUpdate: (self) => {
                if (self.getVelocity() < -300) {
                    // Scrolling up
                    gsap.to(header, { y: 0, duration: 0.3 });
                } else if (self.getVelocity() > 300) {
                    // Scrolling down
                    gsap.to(header, { y: -100, duration: 0.3 });
                }
            }
        }
    });
}

// ================================================================
// 7. MOBILE MENU TOGGLE
// ================================================================

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
        const isOpen = navMenu.classList.contains('open');
        
        if (isOpen) {
            gsap.to(navMenu, {
                height: 0,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.inOut',
                onComplete: () => {
                    navMenu.classList.remove('open');
                }
            });
        } else {
            navMenu.classList.add('open');
            gsap.to(navMenu, {
                height: 'auto',
                opacity: 1,
                duration: 0.3,
                ease: 'power2.inOut'
            });
        }
    });
}

// ================================================================
// 8. SMOOTH LINK NAVIGATION
// ================================================================

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        
        const target = document.querySelector(href);
        if (!target) return;
        
        e.preventDefault();
        
        if (typeof gsap !== 'undefined' && window.scrollTo) {
            gsap.to(window, {
                scrollTo: {
                    y: target,
                    offsetY: 80 // Account for sticky header
                },
                duration: 0.8,
                ease: 'power2.inOut'
            });
        } else {
            // Fallback for browsers without GSAP
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ================================================================
// 9. CONTACT FORM SUBMISSION FEEDBACK
// ================================================================

const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Success animation
            gsap.timeline()
                .to(contactForm, {
                    opacity: 0,
                    duration: 0.3
                })
                .set(contactForm, {
                    innerHTML: '<div style="text-align: center; padding: 2rem; background: rgba(76, 175, 80, 0.1); border-radius: 8px;"><h3>Thank you!</h3><p>I\'ll get back to you soon.</p></div>'
                })
                .to(contactForm, {
                    opacity: 1,
                    duration: 0.3
                });
            
            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// ================================================================
// 10. BUTTON RIPPLE EFFECT ENHANCEMENT
// ================================================================

document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
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

// ================================================================
// 11. EXPERIENCE TIMELINE ANIMATION
// ================================================================

const timelineItems = document.querySelectorAll('.timeline-item');
if (timelineItems.length > 0) {
    timelineItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none',
                markers: false
            },
            opacity: 0,
            x: index % 2 === 0 ? -40 : 40,
            duration: 0.6,
            ease: 'power2.out'
        });
    });
}

// ================================================================
// 12. COURSES/CERTIFICATIONS SCROLL ANIMATION
// ================================================================

const courseCards = document.querySelectorAll('.course-card');
if (courseCards.length > 0) {
    gsap.from(courseCards, {
        scrollTrigger: {
            trigger: '.courses',
            start: 'top 75%',
            toggleActions: 'play none none none',
            markers: false
        },
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out'
    });
}

// ================================================================
// 13. ABOUT SECTION IMAGE ANIMATION
// ================================================================

const aboutImage = document.querySelector('.about-image');
if (aboutImage) {
    gsap.from(aboutImage, {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 75%',
            toggleActions: 'play none none none',
            markers: false
        },
        opacity: 0,
        x: -60,
        duration: 0.8,
        ease: 'power2.out'
    });
}

// ================================================================
// 14. ABOUT TEXT ANIMATION
// ================================================================

const aboutText = document.querySelector('.about-text');
if (aboutText) {
    gsap.from(aboutText, {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 75%',
            toggleActions: 'play none none none',
            markers: false
        },
        opacity: 0,
        x: 60,
        duration: 0.8,
        ease: 'power2.out'
    });
}

// ================================================================
// 15. SKILLS SECTION TITLE ANIMATION
// ================================================================

const skillsTitle = document.querySelector('.skills h2');
if (skillsTitle) {
    gsap.from(skillsTitle, {
        scrollTrigger: {
            trigger: '.skills',
            start: 'top 80%',
            toggleActions: 'play none none none',
            markers: false
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out'
    });
}

// ================================================================
// 16. CONTACT SECTION ANIMATION
// ================================================================

const contactCards = document.querySelectorAll('.contact-card');
if (contactCards.length > 0) {
    gsap.from(contactCards, {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 75%',
            toggleActions: 'play none none none',
            markers: false
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
    });
}

// ================================================================
// 17. INTERSECTION OBSERVER FOR DYNAMIC SCROLL EFFECTS
// ================================================================

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
});

// ================================================================
// 18. KEYBOARD NAVIGATION ENHANCEMENTS
// ================================================================

document.addEventListener('keydown', (e) => {
    // Skip to main content on Tab key
    if (e.code === 'Tab') {
        const skipLink = document.querySelector('.skip-to-content');
        if (skipLink) {
            skipLink.style.display = 'block';
        }
    }
});

// ================================================================
// 19. SCROLL TO TOP BUTTON
// ================================================================

const scrollTopBtn = document.querySelector('.scroll-to-top');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        gsap.to(window, {
            scrollTo: 0,
            duration: 0.8,
            ease: 'power2.inOut'
        });
    });
}

// ================================================================
// 20. DARK MODE TRANSITION
// ================================================================

const darkModeToggle = document.querySelector('.dark-mode-toggle');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        gsap.to('body', {
            duration: 0.3,
            ease: 'power2.inOut'
        });
    });
}

console.log('✓ GSAP animations initialized successfully');
