// Sticky CTA bar
const stickyCta = document.getElementById('sticky-cta');
if (stickyCta) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroHeight = document.querySelector('.hero')?.offsetHeight || 600;
        const contactSection = document.getElementById('contact');
        const contactTop = contactSection ? contactSection.getBoundingClientRect().top : Infinity;

        if (scrollY > heroHeight && contactTop > 200) {
            stickyCta.classList.add('visible');
        } else {
            stickyCta.classList.remove('visible');
        }
        lastScroll = scrollY;
    });
}

// Mobile nav
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
}

// Scroll reveal animations
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

// Apply reveal to section headings, subtitles, text
document.querySelectorAll('.section h2, .section h3, .section-subtitle, .section-text, .stats-conclusion, .partnership-note, .journey-conclusion, .cta-preheading, .contact-info, .contact-form-wrapper').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// Staggered card reveals
document.querySelectorAll('.card-grid, .stats-grid, .results-grid, .features-grid, .pricing-grid').forEach(grid => {
    const children = grid.children;
    Array.from(children).forEach((child, i) => {
        child.classList.add('reveal', `reveal-delay-${Math.min(i + 1, 4)}`);
        revealObserver.observe(child);
    });
});

// Contact stats stagger
document.querySelectorAll('.contact-stat').forEach((el, i) => {
    el.classList.add('reveal', `reveal-delay-${i + 1}`);
    revealObserver.observe(el);
});

// Form submission via Web3Forms
document.querySelectorAll('.contact-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'SENDING...';
        btn.disabled = true;

        const formData = new FormData(form);
        formData.append('access_key', '837d9a75-73a2-4747-b102-f6ed69568e9f');

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                btn.textContent = 'SENT ✓';
                btn.style.background = '#2d8a4e';
                form.reset();
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            } else {
                throw new Error('Failed');
            }
        } catch (err) {
            btn.textContent = 'ERROR — TRY AGAIN';
            btn.style.background = '#8a2d2d';
            btn.disabled = false;
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 3000);
        }
    });
});
