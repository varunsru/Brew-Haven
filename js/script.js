/* =============================================
   BREW HAVEN — Main JavaScript File
   Pure Vanilla JavaScript — No frameworks or libraries!

   Features:
   1. Sticky Navbar
   2. Mobile Navigation (hamburger menu)
   3. Dark Mode Toggle (with localStorage)
   4. Scroll Animations (IntersectionObserver)
   5. Scroll To Top Button
   6. Testimonial Slider (auto + manual)
   7. Menu Category Tabs (filter)
   8. Gallery Lightbox (full-screen viewer)
   9. Contact Form Validation
   10. Active Navigation Link Highlight
   11. Smooth Scrolling for anchor links
   ============================================= */
// =============================================
// EmailJS Configuration
// =============================================
// Account 1 (Reservations)
const EMAILJS_SERVICE_ID = "service_igf72sy";
const EMAILJS_PUBLIC_KEY = "B_dAYqVQSHZkXA8IA";
const RESERVATION_TEMPLATE_ID = "template_srcheuy";
const CUSTOMER_CONFIRMATION_TEMPLATE_ID = "template_51pr1nc";

// Account 2 (Contact Form)
const EMAILJS_CONTACT_SERVICE_ID = "service_4jhmxyh";
const EMAILJS_CONTACT_PUBLIC_KEY = "Qid5tHLVuUHzKeeP7";
const CONTACT_TEMPLATE_ID = "template_wskt0uv";

// Initialize EmailJS globally to Account 1 key if SDK is loaded
if (typeof emailjs !== 'undefined') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

// ---- Run all initializers once the page is fully loaded ----
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileNav();
  initDarkMode();
  initScrollAnimations();
  initScrollToTop();
  initTestimonialSlider();
  initMenuTabs();
  initGalleryLightbox();
  initContactForm();
  initActiveNavLink();
  initSmoothScrolling();
  initReservations();
});


/* -----------------------------------------
   1. STICKY NAVBAR
   -----------------------------------------
   When the user scrolls past 50px, add a
   "scrolled" class to the navbar. This class
   changes the navbar from transparent to solid
   via CSS (see style.css).
   ----------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return; // Safety check: exit if navbar doesn't exist

  // Listen for scroll events
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');     // Add solid background
    } else {
      navbar.classList.remove('scrolled');  // Remove solid background
    }
  });

  // Check scroll position on page load (in case user refreshed mid-page)
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  }
}


/* -----------------------------------------
   2. MOBILE NAVIGATION
   -----------------------------------------
   Toggles the hamburger menu icon and slides
   the navigation panel in/out on mobile screens.
   Also handles closing via overlay click or
   link click.
   ----------------------------------------- */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const overlay   = document.getElementById('navOverlay');

  if (!hamburger || !navLinks) return;

  // Toggle mobile menu when hamburger is clicked
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');   // Animate hamburger → X
    navLinks.classList.toggle('active');    // Slide nav panel in/out
    if (overlay) overlay.classList.toggle('active'); // Show/hide dark overlay

    // Prevent body scrolling when menu is open
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when dark overlay is clicked
  if (overlay) {
    overlay.addEventListener('click', closeMobileMenu);
  }

  // Close menu when any nav link is clicked (for same-page navigation)
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Helper function to close the mobile menu
  function closeMobileMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}


/* -----------------------------------------
   3. DARK MODE TOGGLE
   -----------------------------------------
   Switches between light and dark themes.
   The user's preference is saved in localStorage
   so it persists across page reloads and visits.
   Also respects the system's color scheme preference.
   ----------------------------------------- */
function initDarkMode() {
  const toggle = document.getElementById('darkModeToggle');
  if (!toggle) return;

  const icon = toggle.querySelector('.toggle-icon');

  // Check saved preference from previous visit
  const savedMode = localStorage.getItem('darkMode');

  if (savedMode === 'enabled') {
    // User previously chose dark mode
    document.body.classList.add('dark-mode');
    if (icon) icon.textContent = '☀️';
  } else if (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // No saved preference, but system is set to dark mode
    document.body.classList.add('dark-mode');
    if (icon) icon.textContent = '☀️';
  }

  // Toggle dark mode on button click
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    const isDark = document.body.classList.contains('dark-mode');

    // Update the toggle icon (moon ↔ sun)
    if (icon) icon.textContent = isDark ? '☀️' : '🌙';

    // Save preference to localStorage
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
  });
}


/* -----------------------------------------
   4. SCROLL ANIMATIONS
   -----------------------------------------
   Uses the Intersection Observer API to detect
   when elements with class "scroll-animate"
   enter the viewport, then adds "visible" class
   to trigger CSS animations.

   This is more performant than listening to
   scroll events because the browser handles
   the observation natively.
   ----------------------------------------- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.scroll-animate');
  if (elements.length === 0) return;

  // Create an observer that watches for elements entering the viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Element is visible — trigger the animation
          entry.target.classList.add('visible');
          // Stop watching this element (animate only once)
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,                   // Trigger when 15% visible
      rootMargin: '0px 0px -50px 0px'    // 50px offset from bottom edge
    }
  );

  // Start observing each animatable element
  elements.forEach(el => observer.observe(el));
}


/* -----------------------------------------
   5. SCROLL TO TOP BUTTON
   -----------------------------------------
   A floating button in the bottom-right corner
   that appears when the user scrolls down 500px.
   Clicking it smoothly scrolls back to the top.
   ----------------------------------------- */
function initScrollToTop() {
  const scrollTopBtn = document.getElementById('scrollTop');
  if (!scrollTopBtn) return;

  // Show or hide the button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  // Scroll to top when the button is clicked
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling animation
    });
  });
}


/* -----------------------------------------
   6. TESTIMONIAL / REVIEW SLIDER
   -----------------------------------------
   A carousel that shows one review at a time.
   Features:
   - Auto-advances every 5 seconds
   - Previous / Next buttons
   - Dot indicators for direct navigation
   - Pauses on hover
   - Swipe support on touch devices
   ----------------------------------------- */
function initTestimonialSlider() {
  const track  = document.querySelector('.reviews-track');
  const slides = document.querySelectorAll('.review-slide');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  const dotsContainer = document.querySelector('.slider-dots');

  // Exit if slider elements don't exist on this page
  if (!track || slides.length === 0) return;

  let currentSlide = 0;      // Index of the currently visible slide
  let autoSlideInterval;      // Reference to the auto-slide timer

  // ---- Create dot indicators dynamically ----
  if (dotsContainer) {
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('slider-dot');
      dot.setAttribute('aria-label', `Go to review ${index + 1}`);
      if (index === 0) dot.classList.add('active');

      // Jump to slide on dot click
      dot.addEventListener('click', () => {
        goToSlide(index);
        resetAutoSlide(); // Restart auto-timer
      });

      dotsContainer.appendChild(dot);
    });
  }

  // ---- Navigate to a specific slide ----
  function goToSlide(index) {
    currentSlide = index;
    // Move the track left by (index * 100%) to show the correct slide
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
  }

  // ---- Highlight the active dot ----
  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.slider-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  // ---- Go to next / previous slide ----
  function nextSlide() {
    // Loop back to first slide after the last one
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
  }

  function prevSlide() {
    // Loop to last slide if going before the first one
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(currentSlide);
  }

  // ---- Button click handlers ----
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

  // ---- Auto-slide every 5 seconds ----
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Start auto-sliding
  startAutoSlide();

  // Pause auto-slide when user hovers over the slider
  track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
  track.addEventListener('mouseleave', startAutoSlide);

  // ---- Touch / Swipe support for mobile ----
  let touchStartX = 0;
  let touchEndX   = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const swipeDistance = touchStartX - touchEndX;

    // Only trigger if swipe is at least 50px
    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) nextSlide();   // Swipe left → next
      else prevSlide();                     // Swipe right → prev
      resetAutoSlide();
    }
  }, { passive: true });
}


/* -----------------------------------------
   7. MENU CATEGORY TABS
   -----------------------------------------
   Filters menu cards by category when user
   clicks a category tab (e.g., "Coffee",
   "Tea", "Pastries"). Uses data-category
   attributes on both tabs and cards.
   ----------------------------------------- */
function initMenuTabs() {
  const tabs  = document.querySelectorAll('.menu-tab');
  const cards = document.querySelectorAll('.menu-card');

  if (tabs.length === 0 || cards.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // ---- Update which tab looks active ----
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // ---- Get the selected category ----
      const category = tab.getAttribute('data-category');

      // ---- Show/hide cards based on category ----
      cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (category === 'all' || cardCategory === category) {
          // Show card with a fade-in animation
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';

          // Use setTimeout to trigger CSS transition
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          }, 50);
        } else {
          // Hide card
          card.style.display = 'none';
        }
      });
    });
  });
}


/* -----------------------------------------
   8. GALLERY LIGHTBOX
   -----------------------------------------
   When a gallery image is clicked, it opens
   in a full-screen overlay with:
   - Previous / Next navigation
   - Close button
   - Keyboard support (Esc, Arrow keys)
   - Click outside to close
   ----------------------------------------- */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox     = document.getElementById('lightbox');

  if (galleryItems.length === 0 || !lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-image');
  const closeBtn    = lightbox.querySelector('.lightbox-close');
  const prevBtn     = lightbox.querySelector('.lightbox-prev');
  const nextBtn     = lightbox.querySelector('.lightbox-next');

  let currentIndex = 0;

  // Collect all image sources from gallery items
  const images = [];
  galleryItems.forEach((item, index) => {
    const img = item.querySelector('.gallery-image');
    if (img) {
      images.push(img.src);

      // Open lightbox when gallery item is clicked
      item.addEventListener('click', () => {
        currentIndex = index;
        openLightbox();
      });
    }
  });

  // ---- Open the lightbox ----
  function openLightbox() {
    if (lightboxImg) lightboxImg.src = images[currentIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  // ---- Close the lightbox ----
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
  }

  // ---- Navigate to next / previous image ----
  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    if (lightboxImg) lightboxImg.src = images[currentIndex];
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    if (lightboxImg) lightboxImg.src = images[currentIndex];
  }

  // ---- Event Listeners ----
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn)  nextBtn.addEventListener('click', showNext);
  if (prevBtn)  prevBtn.addEventListener('click', showPrev);

  // Close lightbox when clicking the dark background (not the image)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation inside lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return; // Only when open
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft')  showPrev();
  });
}


/* -----------------------------------------
   9. CONTACT FORM VALIDATION
   -----------------------------------------
   Validates all form fields when the user
   clicks "Send Message". Shows inline error
   messages for invalid fields and a success
   message when all fields pass.

   Note: This is front-end validation only.
   For a real business, you'd also need
   server-side validation.
   ----------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop the form from actually submitting

    let isValid = true;

    // ---- Get references to form fields ----
    const name    = form.querySelector('#name');
    const email   = form.querySelector('#email');
    const phone   = form.querySelector('#phone');
    const subject = form.querySelector('#subject');
    const message = form.querySelector('#message');

    // ---- Clear any previous error messages ----
    clearErrors(form);

    // ---- Validate each field ----

    // Name: required, at least 2 characters
    if (name && name.value.trim().length < 2) {
      showError(name, 'Please enter your full name (at least 2 characters).');
      isValid = false;
    }

    // Email: required, must match email pattern
    if (email && !isValidEmail(email.value.trim())) {
      showError(email, 'Please enter a valid email address.');
      isValid = false;
    }

    // Phone: optional, but must be valid format if provided
    if (phone && phone.value.trim() !== '' && !isValidPhone(phone.value.trim())) {
      showError(phone, 'Please enter a valid phone number.');
      isValid = false;
    }

    // Subject: required
    if (subject && subject.value.trim().length < 2) {
      showError(subject, 'Please enter a subject.');
      isValid = false;
    }

    // Message: required, at least 10 characters
    if (message && message.value.trim().length < 10) {
      showError(message, 'Please enter a message (at least 10 characters).');
      isValid = false;
    }

    // ---- If everything is valid, send via EmailJS ----
    if (isValid) {
      const submitBtn = form.querySelector('button[type="submit"]');
      let originalBtnHTML = '';
      if (submitBtn) {
        originalBtnHTML = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span>Sending...';
      }

      // Map contact template parameters to variables: name, email, phone, title, message, time
      const templateParams = {
        name: name.value.trim(),
        email: email.value.trim(),
        phone: phone ? phone.value.trim() : '',
        title: subject.value.trim(),
        message: message.value.trim(),
        time: new Date().toLocaleString()
      };

      if (typeof emailjs !== 'undefined') {
        // Initialize with Account 2 key
        emailjs.init(EMAILJS_CONTACT_PUBLIC_KEY);

        emailjs.send(EMAILJS_CONTACT_SERVICE_ID, CONTACT_TEMPLATE_ID, templateParams)
          .then(function(response) {
            // Restore back to Account 1 key immediately
            emailjs.init(EMAILJS_PUBLIC_KEY);

            const successMsg = form.querySelector('.form-success');
            if (successMsg) {
              successMsg.classList.add('visible');
              successMsg.style.color = 'var(--secondary)';
              successMsg.textContent = '✅ Thank you! Your message has been sent successfully. We\'ll get back to you soon!';
            }

            form.reset(); // Clear all form fields

            // Restore button
            if (submitBtn) {
              submitBtn.innerHTML = originalBtnHTML;
              submitBtn.disabled = false;
            }

            // Auto-hide success message after 5 seconds
            setTimeout(() => {
              if (successMsg) successMsg.classList.remove('visible');
            }, 5000);
          }, function(error) {
            console.error('Contact Form EmailJS Error:', error);
            
            // Restore back to Account 1 key even on failure
            emailjs.init(EMAILJS_PUBLIC_KEY);

            const successMsg = form.querySelector('.form-success');
            if (successMsg) {
              successMsg.classList.add('visible');
              successMsg.style.color = 'var(--error)';
              successMsg.textContent = '❌ Unable to send your message at the moment. Please try again later.';
            }

            // Restore button
            if (submitBtn) {
              submitBtn.innerHTML = originalBtnHTML;
              submitBtn.disabled = false;
            }

            setTimeout(() => {
              if (successMsg) successMsg.classList.remove('visible');
            }, 5000);
          });
      } else {
        console.error('EmailJS SDK not found.');
        const successMsg = form.querySelector('.form-success');
        if (successMsg) {
          successMsg.classList.add('visible');
          successMsg.style.color = 'var(--error)';
          successMsg.textContent = '❌ Email service is currently unavailable. Please try again later.';
        }
        if (submitBtn) {
          submitBtn.innerHTML = originalBtnHTML;
          submitBtn.disabled = false;
        }
      }
    }
  });

  // ---- Real-time error clearing ----
  const inputs = form.querySelectorAll('.form-input, .form-textarea');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        input.classList.remove('error');
        const errorMsg = input.parentElement.querySelector('.form-error');
        if (errorMsg) errorMsg.classList.remove('visible');
      }
    });
  });
}

// Helper: Display an error message below a form field
function showError(input, message) {
  input.classList.add('error');
  const errorMsg = input.parentElement.querySelector('.form-error');
  if (errorMsg) {
    errorMsg.textContent = message;
    errorMsg.classList.add('visible');
  }
}

// Helper: Remove all error states from the form
function clearErrors(form) {
  form.querySelectorAll('.form-input, .form-textarea').forEach(input => {
    input.classList.remove('error');
  });
  form.querySelectorAll('.form-error').forEach(error => {
    error.classList.remove('visible');
  });
}

// Helper: Check if an email address is valid using regex
function isValidEmail(email) {
  // Basic email pattern: something@something.something
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Helper: Check if a phone number is valid
function isValidPhone(phone) {
  // Accepts formats like: (555) 123-4567, 555-123-4567, +1 555 1234567
  const regex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
  return regex.test(phone);
}


/* -----------------------------------------
   10. ACTIVE NAVIGATION LINK
   -----------------------------------------
   Automatically highlights the nav link
   that matches the current page URL.
   For example, if you're on "menu.html",
   the "Menu" link gets the "active" class.
   ----------------------------------------- */
function initActiveNavLink() {
  // Get the filename of the current page (e.g., "menu.html")
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // Find the nav link whose href matches the current filename
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
}


/* -----------------------------------------
   11. SMOOTH SCROLLING
   -----------------------------------------
   When a link points to an anchor (#section),
   smoothly scroll to that section instead of
   jumping instantly.
   ----------------------------------------- */
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return; // Ignore empty anchors

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}


/* -----------------------------------------
   12. TABLE RESERVATIONS
   ----------------------------------------- */
function initReservations() {
  const modal = document.getElementById('reservationModal');
  const closeBtn = document.getElementById('closeModalBtn');
  const navBtn = document.getElementById('navReserveBtn');
  const mobileBtn = document.getElementById('mobileReserveBtn');
  const heroBtn = document.getElementById('heroReserveBtn');
  
  if (!modal) return;

  // Open modal triggers
  const openTriggers = [navBtn, mobileBtn, heroBtn].filter(Boolean);
  openTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      // Load and show bookings list
      renderBookings();
    });
  });

  // Close modal
  const closeReservationModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', closeReservationModal);
  }

  const overlay = modal.querySelector('.modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', closeReservationModal);
  }

  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeReservationModal();
    }
  });

  // Modal Tabs switching
  const tabs = modal.querySelectorAll('.modal-tab');
  const tabContents = modal.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const target = tab.getAttribute('data-target');
      const content = document.getElementById(target);
      if (content) content.classList.add('active');
    });
  });

  // Form Validation & Submission
  const form = document.getElementById('reservationForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const nameField = document.getElementById('resName');
      const phoneField = document.getElementById('resPhone');
      const emailField = document.getElementById('resEmail');
      const guestsField = document.getElementById('resGuests');
      const dateField = document.getElementById('resDate');
      const timeField = document.getElementById('resTime');
      const seatingField = form.querySelector('input[name="resSeating"]:checked');
      const requestsField = document.getElementById('resRequests');

      // Clear errors
      clearResErrors(form);

      // Name
      if (nameField && nameField.value.trim().length < 2) {
        showResError(nameField, 'Please enter your name (at least 2 characters).');
        isValid = false;
      }

      // Phone
      if (phoneField && !isValidPhone(phoneField.value.trim())) {
        showResError(phoneField, 'Please enter a valid mobile number.');
        isValid = false;
      }

      // Email
      if (emailField && !isValidEmail(emailField.value.trim())) {
        showResError(emailField, 'Please enter a valid email address.');
        isValid = false;
      }

      // Date
      if (!dateField || dateField.value.trim() === '') {
        showResError(dateField, 'Please select a date.');
        isValid = false;
      } else {
        const selectedDate = new Date(dateField.value);
        const today = new Date();
        today.setHours(0,0,0,0);
        if (selectedDate < today) {
          showResError(dateField, 'Reservation date cannot be in the past.');
          isValid = false;
        }
      }

      // Time
      if (timeField && timeField.value === '') {
        showResError(timeField, 'Please select a time slot.');
        isValid = false;
      }

      // Guests
      if (guestsField && guestsField.value === '') {
        showResError(guestsField, 'Please select number of guests.');
        isValid = false;
      }

      // Seating preference is required
      if (!seatingField) {
        isValid = false;
      }

      if (isValid) {
        const submitBtn = form.querySelector('button[type="submit"]');
        let originalBtnHTML = '';
        if (submitBtn) {
          originalBtnHTML = submitBtn.innerHTML;
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span class="spinner"></span>Sending...';
        }

        const prevScrollY = window.scrollY;

        // Map form parameters to exact EmailJS template variables
        const templateParams = {
          customer_name: nameField.value.trim(),
          customer_email: emailField.value.trim(),
          customer_phone: phoneField.value.trim(),
          reservation_date: dateField.value,
          reservation_time: timeField.value,
          guests: guestsField.value,
          seating: seatingField ? seatingField.value : 'Indoor',
          special_request: requestsField ? requestsField.value.trim() : ''
        };

        if (typeof emailjs !== 'undefined') {
          // Send Reservation Notification to Owner AND Confirmation to Customer
          const sendToOwner = emailjs.send(EMAILJS_SERVICE_ID, RESERVATION_TEMPLATE_ID, templateParams);
          const sendToCustomer = emailjs.send(EMAILJS_SERVICE_ID, CUSTOMER_CONFIRMATION_TEMPLATE_ID, templateParams);

          Promise.all([sendToOwner, sendToCustomer])
            .then(function(results) {
              // LocalStorage save only on success of both
              const bookings = JSON.parse(localStorage.getItem('brewHavenReservations') || '[]');
              const newBooking = {
                id: Date.now(),
                name: templateParams.customer_name,
                phone: templateParams.customer_phone,
                email: templateParams.customer_email,
                guests: templateParams.guests,
                date: templateParams.reservation_date,
                time: templateParams.reservation_time,
                seating: templateParams.seating,
                requests: templateParams.special_request
              };
              bookings.push(newBooking);
              localStorage.setItem('brewHavenReservations', JSON.stringify(bookings));

              // Reset form
              form.reset();

              // Show custom success popup
              showToastPopup(true);

              // Refresh list
              renderBookings();

              // Close modal and restore button
              setTimeout(() => {
                closeReservationModal();
                const bookTabButton = modal.querySelector('.modal-tab[data-target="book-tab"]');
                if (bookTabButton) bookTabButton.click();
                
                if (submitBtn) {
                  submitBtn.innerHTML = originalBtnHTML;
                  submitBtn.disabled = false;
                }

                // Scroll smoothly back
                window.scrollTo({
                  top: prevScrollY,
                  behavior: 'smooth'
                });
              }, 4000);
            })
            .catch(function(error) {
              console.error('EmailJS Send Error:', error);
              // Show custom error popup
              showToastPopup(false);

              if (submitBtn) {
                submitBtn.innerHTML = originalBtnHTML;
                submitBtn.disabled = false;
              }
            });
        } else {
          console.error('EmailJS SDK not found.');
          showToastPopup(false);
          if (submitBtn) {
            submitBtn.innerHTML = originalBtnHTML;
            submitBtn.disabled = false;
          }
        }
      }
    });

    // Real-time error clearing for reservation form
    const inputs = form.querySelectorAll('.form-input, .form-select');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          input.classList.remove('error');
          const errorMsg = input.parentElement.querySelector('.form-error');
          if (errorMsg) errorMsg.classList.remove('visible');
        }
      });
      input.addEventListener('change', () => {
        if (input.classList.contains('error')) {
          input.classList.remove('error');
          const errorMsg = input.parentElement.querySelector('.form-error');
          if (errorMsg) errorMsg.classList.remove('visible');
        }
      });
    });
  }
}

function showResError(input, message) {
  if (!input) return;
  input.classList.add('error');
  const errorMsg = input.parentElement.querySelector('.form-error');
  if (errorMsg) {
    errorMsg.textContent = message;
    errorMsg.classList.add('visible');
  }
}

function clearResErrors(form) {
  form.querySelectorAll('.form-input, .form-select').forEach(input => {
    input.classList.remove('error');
  });
  form.querySelectorAll('.form-error').forEach(error => {
    error.classList.remove('visible');
  });
}

function showToastPopup(isSuccess) {
  const toast = document.getElementById('toastPopup');
  if (!toast) return;

  const icon = toast.querySelector('.toast-icon');
  const title = toast.querySelector('.toast-title');
  const message = toast.querySelector('.toast-message');

  if (isSuccess) {
    if (icon) icon.textContent = '✨';
    if (title) title.textContent = 'Reservation Confirmed!';
    if (message) {
      message.innerHTML = `
        Thank you for choosing Brew Haven Coffee Shop.<br><br>
        Your reservation has been received successfully.<br>
        A confirmation has been sent to our team.<br><br>
        We look forward to serving you.
      `;
    }
  } else {
    if (icon) icon.textContent = '❌';
    if (title) title.textContent = 'Unable to send';
    if (message) {
      message.innerHTML = `
        Unable to send your reservation at the moment.<br><br>
        Please try again later.
      `;
    }
  }

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

function renderBookings() {
  const bookingsList = document.getElementById('bookingsList');
  if (!bookingsList) return;

  const bookings = JSON.parse(localStorage.getItem('brewHavenReservations') || '[]');

  if (bookings.length === 0) {
    bookingsList.innerHTML = `<div class="no-bookings">No reservations found yet. Book a table to get started!</div>`;
    return;
  }

  // Sort bookings by date and time
  bookings.sort((a, b) => new Date(a.date + ' ' + a.time.replace(/ AM| PM/, '')) - new Date(b.date + ' ' + b.time.replace(/ AM| PM/, '')));

  bookingsList.innerHTML = bookings.map(res => {
    // Format Date for premium look
    const dateObj = new Date(res.date);
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('en-US', options);

    return `
      <div class="booking-card" data-id="${res.id}">
        <div class="booking-info">
          <h4>${escapeHTML(res.name)}</h4>
          <div class="booking-details-grid">
            <div class="booking-detail-item">📅 ${formattedDate}</div>
            <div class="booking-detail-item">🕒 ${res.time}</div>
            <div class="booking-detail-item">👥 ${res.guests} ${res.guests === '1' ? 'Guest' : 'Guests'}</div>
            <div class="booking-detail-item">🪑 ${res.seating}</div>
          </div>
          ${res.requests ? `<p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 8px; font-style: italic;">Note: "${escapeHTML(res.requests)}"</p>` : ''}
        </div>
        <button class="btn-delete-booking" onclick="deleteBooking(${res.id})">Cancel</button>
      </div>
    `;
  }).join('');
}

// Bind to window to allow inline onclick access
window.deleteBooking = function(id) {
  let bookings = JSON.parse(localStorage.getItem('brewHavenReservations') || '[]');
  bookings = bookings.filter(res => res.id !== id);
  localStorage.setItem('brewHavenReservations', JSON.stringify(bookings));
  renderBookings();
};

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
