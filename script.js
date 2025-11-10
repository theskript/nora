// Modern Birthday Invitation - JavaScript

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 50,
    easing: 'ease-out-cubic'
});

// ============================================
// BIRTHDAY EFFECTS - Confetti & Balloons
// ============================================

// Create confetti effect
function createConfetti() {
    const confettiCount = 50;
    const colors = ['#FF6B9D', '#FFB4D6', '#FFA07A', '#FFD700', '#FF69B4', '#87CEEB'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.body.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Create floating balloons
function createBalloons() {
    const balloonEmojis = ['🎈', '🎉', '🎂', '🎁', '✨', '🎊'];
    const balloonCount = 15;
    
    for (let i = 0; i < balloonCount; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.textContent = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
        balloon.style.left = Math.random() * 100 + 'vw';
        balloon.style.animationDelay = Math.random() * 5 + 's';
        balloon.style.animationDuration = (Math.random() * 10 + 10) + 's';
        document.body.appendChild(balloon);
        
        // Remove balloon after animation
        setTimeout(() => {
            balloon.remove();
        }, 20000);
    }
}

// Trigger confetti on page load
window.addEventListener('load', () => {
    setTimeout(createConfetti, 500);
    createBalloons();
});

// Trigger confetti on scroll to certain sections
let confettiTriggered = {
    gallery: false,
    rsvp: false
};

function checkConfettiTriggers() {
    const gallerySection = document.querySelector('.gallery-section');
    const rsvpSection = document.querySelector('.rsvp-section');
    
    if (gallerySection && !confettiTriggered.gallery) {
        const rect = gallerySection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            createConfetti();
            confettiTriggered.gallery = true;
        }
    }
    
    if (rsvpSection && !confettiTriggered.rsvp) {
        const rect = rsvpSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            createBalloons();
            confettiTriggered.rsvp = true;
        }
    }
}

window.addEventListener('scroll', checkConfettiTriggers);

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
    const zoomLink = "https://zoom.us/j/YOUR_MEETING_ID"; // Replace with actual Zoom link
    const event = {
        title: "Nora's 1st Birthday Party",
        description: `Join us to celebrate Nora Rahim's first birthday!%0A%0A🎂 HYBRID TIME: 2:30-3:00 PM - Cake Cutting!%0AJoin in person or via Zoom: ${zoomLink}%0A%0AContact:%0A📧 info@theskript.com%0A📱 Ahmed: (813) 568-5765%0A📱 Teaka: (609) 366-0857`,
        location: "Wesley Chapel, FL",
        start: "20251230T140000",
        end: "20251230T180000"
    };
    
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}&dates=${event.start}/${event.end}`;
    
    window.open(googleCalUrl, '_blank');
}

// Generate Calendar Invite (ICS file)
function generateCalendarInvite(attendeeName, attendeeEmail, attendingType) {
    const eventTitle = "Nora's 1st Birthday Party";
    const location = "Wesley Chapel, FL";
    const startDate = "20251230T140000";
    const endDate = "20251230T180000";
    const zoomLink = "https://zoom.us/j/YOUR_MEETING_ID"; // Replace with actual Zoom link
    
    let description = `Join us to celebrate Nora's first birthday!\\n\\n`;
    
    if (attendingType === 'yes-zoom') {
        description += `You've RSVP'd to join via Zoom for the cake cutting (2:30-3:00 PM)\\n\\n`;
        description += `🎂 HYBRID TIME: 2:30-3:00 PM\\n`;
        description += `Zoom Link: ${zoomLink}\\n\\n`;
    } else {
        description += `We'll see you in person!\\n\\n`;
        description += `🎂 Don't miss the cake cutting at 2:30 PM!\\n`;
        description += `Zoom option also available: ${zoomLink}\\n\\n`;
    }
    
    description += `Contact:\\n`;
    description += `📧 info@theskript.com\\n`;
    description += `📱 Ahmed: (813) 568-5765\\n`;
    description += `📱 Teaka: (609) 366-0857`;
    
    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Nora Birthday//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:REQUEST',
        'BEGIN:VEVENT',
        `DTSTART:${startDate}`,
        `DTEND:${endDate}`,
        `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
        `SUMMARY:${eventTitle}`,
        `DESCRIPTION:${description}`,
        `LOCATION:${location}`,
        'STATUS:CONFIRMED',
        'SEQUENCE:0',
        'BEGIN:VALARM',
        'TRIGGER:-PT24H',
        'DESCRIPTION:Reminder: Nora\'s Birthday Party Tomorrow!',
        'ACTION:DISPLAY',
        'END:VALARM',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');
    
    return icsContent;
}

// Download calendar invite
function downloadCalendarInvite(attendeeName, attendeeEmail, attendingType) {
    const icsContent = generateCalendarInvite(attendeeName, attendeeEmail, attendingType);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'nora-birthday-party.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Handle RSVP form submission - Now using Google Forms embed
// Previous Web3Forms implementation commented out
/*
const form = document.getElementById('rsvp-form');
const formStatus = document.getElementById('form-status');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.rsvp-submit-btn');
        const originalContent = submitBtn.innerHTML;
        const formData = new FormData(form);
        
        // Get form values
        const attendeeName = formData.get('name');
        const attendeeEmail = formData.get('email');
        const attendingType = formData.get('attending');
        
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
                // Trigger confetti celebration!
                createConfetti();
                setTimeout(createConfetti, 300);
                setTimeout(createBalloons, 600);
                
                formStatus.innerHTML = '✅ Thank you for your RSVP! We can\'t wait to celebrate with you! 🎉<br><br>📅 <strong>Calendar invite downloaded!</strong> Check your downloads folder.';
                formStatus.className = 'success';
                
                // Download calendar invite if attending
                if (attendingType === 'yes-inperson' || attendingType === 'yes-zoom') {
                    setTimeout(() => {
                        downloadCalendarInvite(attendeeName, attendeeEmail, attendingType);
                    }, 500);
                }
                
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
*/

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