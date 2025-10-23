// ===== DETECT SYSTEM PREFERENCE & INITIALIZE THEME =====
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');
const isDarkMode = savedTheme ? savedTheme === 'dark' : prefersDark;

if (!isDarkMode) {
    document.documentElement.classList.add('light-mode');
}

// ===== DARK MODE TOGGLE =====
const darkModeToggle = document.getElementById('darkModeToggle');

darkModeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.classList.toggle('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    darkModeToggle.textContent = isLight ? '🌙' : '☀️';
});

// Set initial button text
darkModeToggle.textContent = isDarkMode ? '🌙' : '☀️';

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            document.documentElement.classList.remove('light-mode');
            darkModeToggle.textContent = '🌙';
        } else {
            document.documentElement.classList.add('light-mode');
            darkModeToggle.textContent = '☀️';
        }
    }
});

// ===== NAVIGATION ACTIVE LINK =====
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.pageYOffset >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputs = contactForm.querySelectorAll('input, textarea');
        const email = inputs[1].value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email');
            return;
        }
        
        alert('Thank you! I will get back to you soon.');
        contactForm.reset();
    });
}

// ===== SCROLL PROGRESS BAR =====
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrollPercentage + '%';
}, { passive: true });

// ===== LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ===== ADD ACTIVE NAV LINK STYLE =====
const style = document.createElement('style');
style.textContent = '.nav-link.active{color:#ff6b35;border-bottom:2px solid #ff6b35;padding-bottom:5px}';
document.head.appendChild(style);

console.log('Portfolio loaded ✓');
console.log('Theme: ' + (isDarkMode ? 'Dark' : 'Light'));

