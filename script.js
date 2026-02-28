/* ============================================
   ChariXAngie Portfolio — Interactive Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNavbar();
    initPersonToggle();
    initProjectFilters();
    initSkillBars();
    initContactForm();
    initScrollAnimations();
    initCounterAnimation();
    initBackToTop();
});

/* ==================
   Particle Background
   ================== */
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrame;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.5 + 0.1;
            const colors = ['255, 107, 157', '192, 132, 252', '56, 189, 248', '6, 214, 160', '251, 191, 36'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.fill();
        }
    }

    // Create particles
    const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const opacity = (1 - dist / 150) * 0.15;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(192, 132, 252, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connectParticles();
        animationFrame = requestAnimationFrame(animate);
    }

    animate();
}

/* ==================
   Navbar
   ================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveLink();
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Active link based on scroll
    function updateActiveLink() {
        const sections = document.querySelectorAll('.section, .hero');
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }
}

/* ==================
   Person Toggle (About Section)
   ================== */
function initPersonToggle() {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const slider = document.querySelector('.toggle-slider');
    const personCards = document.querySelectorAll('.person-card');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const person = btn.getAttribute('data-person');

            // Update buttons
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Move slider
            if (person === '2') {
                slider.classList.add('right');
            } else {
                slider.classList.remove('right');
            }

            // Show person card
            personCards.forEach(card => {
                card.classList.remove('active');
                if (card.getAttribute('data-person') === person) {
                    card.classList.add('active');
                }
            });
        });
    });
}

/* ==================
   Project Filters
   ================== */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.classList.add('fade-in');
                    // Remove animation class after it plays
                    setTimeout(() => card.classList.remove('fade-in'), 500);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

/* ==================
   Skill Bars Animation
   ================== */
function initSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    skillFills.forEach(bar => observer.observe(bar));
}

/* ==================
   Contact Form
   ================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('formSuccess');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Add button loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            form.style.display = 'none';
            successMsg.classList.add('show');

            // Reset after some time
            setTimeout(() => {
                form.style.display = '';
                successMsg.classList.remove('show');
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 4000);
        }, 1500);
    });
}

/* ==================
   Scroll-Triggered Animations
   ================== */
function initScrollAnimations() {
    // Add reveal class to elements
    const revealElements = document.querySelectorAll(
        '.section-header, .person-card, .skill-item, .project-card, .contact-card, .contact-form-wrapper, .skills-divider, .skills-person-header'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

/* ==================
   Counter Animation
   ================== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 40;
        const duration = 1500;
        const stepTime = duration / 40;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);
    }
}

/* ==================
   Back to Top Button
   ================== */
function initBackToTop() {
    const btn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ==================
   Smooth Anchor Links
   ================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
