// WhatsApp link - REPLACE with your wa.me link once the number is live
// Format: https://wa.me/447XXXXXXXXX (no plus, no spaces)
const WHATSAPP_LINK = 'https://wa.me/447000000000';
// Set to true once the number is live to show the WhatsApp buttons
const WHATSAPP_ENABLED = false;

// Floating WhatsApp button (site-wide)
(function injectWhatsApp() {
    if (!WHATSAPP_ENABLED) return;
    const a = document.createElement('a');
    a.href = WHATSAPP_LINK;
    a.className = 'whatsapp-float';
    a.target = '_blank';
    a.rel = 'noopener';
    a.setAttribute('aria-label', 'Message us on WhatsApp');
    a.innerHTML = '<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
    document.body.appendChild(a);
})();

// Re-scroll to hash target after fonts/animations settle (fixes cross-page anchor jumps)
(function fixHashScroll() {
    if (!window.location.hash) return;
    let target;
    try { target = document.querySelector(window.location.hash); } catch (e) { return; }
    if (!target) return;
    const jump = () => {
        const prev = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';
        const y = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo(0, y);
        document.documentElement.style.scrollBehavior = prev;
    };
    window.addEventListener('load', () => {
        jump();
        [100, 300, 600].forEach(t => setTimeout(jump, t));
    });
})();

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
        formData.append('access_key', '1e3bebd6-21b5-403b-ae3d-35b17313ebf8');

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
