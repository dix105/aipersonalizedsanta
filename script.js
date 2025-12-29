document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Navigation ---
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav');
    const navLinks = document.querySelectorAll('header nav a');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all others
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });
            
            // Toggle current
            item.classList.toggle('active');
            if (!isActive) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // --- Modals (Privacy/Terms) ---
    const openButtons = document.querySelectorAll('[data-modal-target]');
    const closeButtons = document.querySelectorAll('[data-modal-close]');
    const modals = document.querySelectorAll('.modal');

    openButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-modal-target');
            const modal = document.getElementById(targetId + '-modal');
            if (modal) {
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // Prevent body scroll
            }
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            closeModal(modal);
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    function closeModal(modal) {
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    // --- Ember Particle Animation ---
    // Creates rising sparks for the forge theme
    const container = document.getElementById('ember-canvas');
    if (container) {
        const particleCount = 40;
        
        function createEmber() {
            const ember = document.createElement('div');
            ember.classList.add('ember');
            
            // Random horizontal position
            ember.style.left = Math.random() * 100 + '%';
            
            // Random animation duration
            const duration = 4 + Math.random() * 6;
            ember.style.animationDuration = duration + 's';
            
            // Random delay
            const delay = Math.random() * 5;
            ember.style.animationDelay = delay + 's';
            
            // Random size variation
            const scale = 0.5 + Math.random();
            ember.style.transform = `scale(${scale})`;
            
            container.appendChild(ember);
            
            // Remove after animation to keep DOM clean (re-add loop)
            // Fix: Include delay in timeout to ensure animation completes
            setTimeout(() => {
                ember.remove();
                if(document.visibilityState === 'visible') {
                    createEmber();
                }
            }, (duration + delay) * 1000);
        }

        // Initialize pool
        for(let i=0; i<particleCount; i++) {
            setTimeout(createEmber, Math.random() * 5000);
        }
    }

    // --- Scroll Intersection Observer (Fade in Up) ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section > div.container').forEach(el => {
        el.style.opacity = '0'; // Initial state
        observer.observe(el);
    });
});