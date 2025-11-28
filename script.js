// Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(function() {
        preloader.classList.add('hidden');
    }, 500);
});

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Menu Filtering
const tabBtns = document.querySelectorAll('.tab-btn');
const menuCards = document.querySelectorAll('.menu-card');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        tabBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-tab');
        
        menuCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
    });
    
    // Add touch support for mobile
    question.addEventListener('touchstart', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
    });
});

// Form Submission
const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const eventDate = document.getElementById('eventDate').value;
        const eventType = document.getElementById('eventType').value;
        
        // Simple validation
        if (name && phone && eventDate && eventType) {
            // In a real application, you would send this data to a server
            alert(`Thank you ${name}! We've received your booking request for a ${eventType} on ${eventDate}. Our team will contact you shortly at ${phone}.`);
            
            // Reset form
            bookingForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// Set minimum date for event date input to today
const today = new Date().toISOString().split('T')[0];
const eventDateInput = document.getElementById('eventDate');

if (eventDateInput) {
    eventDateInput.setAttribute('min', today);
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Handle image loading errors
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('error', function() {
        // Set a fallback image or hide the image
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=';
        this.alt = 'Image not available';
    });
});

// Gallery Image Popup (Simple Implementation)
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // In a real implementation, you would show a modal with the full-size image
        // For now, we'll just show an alert
        alert('In a full implementation, this would open a modal with the full-size image.');
    });
});

// Testimonial Slider (Simple Implementation)
// In a real implementation, you would use a library like Swiper.js for a full-featured slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
}

// Initialize testimonial display
if (testimonials.length > 0) {
    showTestimonial(currentTestimonial);
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// Animation on Scroll (Simple Implementation)
// Add animation class when elements come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.menu-card, .gallery-item, .pricing-card, .blog-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.querySelectorAll('.menu-card, .gallery-item, .pricing-card, .blog-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Trigger animation on scroll
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// WhatsApp Chat Button Animation
const whatsappBtn = document.querySelector('.whatsapp-chat');

if (whatsappBtn) {
    // Add pulse animation periodically
    setInterval(() => {
        whatsappBtn.style.animation = 'pulse 2s infinite';
        setTimeout(() => {
            whatsappBtn.style.animation = '';
        }, 2000);
    }, 10000);
}

// Add CSS for pulse animation
const style = document.createElement('style');
style.innerHTML = `
    @keyframes pulse {
        0% {
            transform: scale(1);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
        50% {
            transform: scale(1.1);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
        }
        100% {
            transform: scale(1);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
    }
`;
document.head.appendChild(style);