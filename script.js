// Modern Birthday Invitation - JavaScript

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 50,
    easing: 'ease-out-cubic'
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Countdown Timer
function updateCountdown() {
    const eventDate = new Date('December 30, 2025 14:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = hours;
    if (minutesEl) minutesEl.textContent = minutes;
    if (secondsEl) secondsEl.textContent = seconds;

    if (distance < 0) {
        const countdownEl = document.getElementById('countdown');
        if (countdownEl) {
            countdownEl.innerHTML = "<h2 class='countdown-title'>🎉 The party is today! 🎉</h2>";
        }
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Add to Calendar Function
function addToCalendar() {
    const event = {
        title: "Nora's 1st Birthday Party",
        description: "Join us to celebrate Nora Rahim's first birthday!",
        location: "Wesley Chapel, FL",
        start: "20251230T140000",
        end: "20251230T180000"
    };
    
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}&dates=${event.start}/${event.end}`;
    
    window.open(googleCalUrl, '_blank');
}

// Handle RSVP form submission with Web3Forms
const form = document.getElementById('rsvp-form');
const formStatus = document.getElementById('form-status');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.rsvp-submit-btn');
        const originalContent = submitBtn.innerHTML;
        const formData = new FormData(form);
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span>';
        formStatus.textContent = '';
        formStatus.className = '';
        
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                formStatus.textContent = '✅ Thank you for your RSVP! We can\'t wait to celebrate with you! 🎉';
                formStatus.className = 'success';
                form.reset();
                
                // Scroll to success message
                formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                throw new Error(data.message || 'Form submission failed');
            }
        } catch (error) {
            formStatus.textContent = '❌ Oops! Something went wrong. Please email us directly at info@theskript.com';
            formStatus.className = 'error';
            console.error('Form error:', error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalContent;
        }
    });
}

// Share Functions
function shareOnWhatsApp() {
    const text = "You're invited to Nora's 1st Birthday Party! 🎉 December 30, 2025, 2-6pm in Wesley Chapel, FL";
    const url = window.location.href;
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
}

function shareOnFacebook() {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
}

function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        const status = document.getElementById('copy-status');
        if (status) {
            status.textContent = '✅ Link copied to clipboard!';
            setTimeout(() => {
                status.textContent = '';
            }, 3000);
        }
    }).catch(err => {
        console.error('Could not copy text: ', err);
        alert('Link: ' + url);
    });
}

// Add subtle parallax effect to hero
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Add hover effect to gallery items
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    item.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Log success message
console.log('🎂 Nora\'s Birthday Invitation loaded successfully! 🎉');
console.log('Design by THESKRIPT LLC');