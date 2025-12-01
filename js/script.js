/* script.js */

/* --- Authentication & Modal Functions --- */
function openLoginModal() {
    $('#login-modal').removeClass('hidden').addClass('flex');
}

function closeLoginModal() {
    $('#login-modal').addClass('hidden').removeClass('flex');
}

function checkAuth() {
    const user = localStorage.getItem('cleanCityUser');
    if (user) {
        // Desktop Views
        $('#desktop-guest-view').addClass('hidden');
        $('#desktop-user-view').removeClass('hidden').addClass('flex');
        $('#user-email-display').text(user.split('@')[0]);
        // Mobile Views
        $('#mobile-login-btn').addClass('hidden');
        $('#mobile-logout-btn').removeClass('hidden');
    } else {
        // Desktop Views
        $('#desktop-guest-view').removeClass('hidden');
        $('#desktop-user-view').addClass('hidden').removeClass('flex');
        // Mobile Views
        $('#mobile-login-btn').removeClass('hidden');
        $('#mobile-logout-btn').addClass('hidden');
    }
}

function logout() {
    localStorage.removeItem('cleanCityUser');
    checkAuth();
    $('#mobile-menu').addClass('hidden');
}

/* --- Main Logic (Runs when page loads) --- */
$(document).ready(function() {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Run Auth Check
    checkAuth();

    // 3. Mobile Menu Handlers
    $('#mobile-menu-btn').click(() => $('#mobile-menu').removeClass('hidden'));
    $('#close-mobile-menu').click(() => $('#mobile-menu').addClass('hidden'));

    // 4. Auth Form Submission
    $('#auth-form').submit(function(e) {
        e.preventDefault();
        localStorage.setItem('cleanCityUser', $('#email-input').val());
        closeLoginModal();
        checkAuth();
        $('#email-input').val(''); // Clear input
        $('#password-input').val('');
    });

    // 5. Contact Form Handler (For contact.html)
    // Automatically handles any form that isn't the login form
    $('form').not('#auth-form').submit(function(e) {
        // Prevent default submission if it's the contact form
        if ($(this).find('textarea').length > 0) {
            e.preventDefault();
            alert('Message sent successfully!');
        }
    });

    // 6. Background Slider Logic
    const backgrounds = [
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1000&q=80",
        "https://images.pexels.com/photos/5932607/pexels-photo-5932607.jpeg?_gl=1*8wei8g*_ga*Nzc5ODE4ODkzLjE3NjQ1ODg4OTk.*_ga_8JE65Q40S6*czE3NjQ1ODg4OTkkbzEkZzEkdDE3NjQ1ODg5MTgkajQxJGwwJGgw",
        "https://images.pexels.com/photos/5461555/pexels-photo-5461555.jpeg?_gl=1*tehsiz*_ga*Nzc5ODE4ODkzLjE3NjQ1ODg4OTk.*_ga_8JE65Q40S6*czE3NjQ1ODg4OTkkbzEkZzEkdDE3NjQ1ODkyMjMkajI4JGwwJGgw",
        "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?_gl=1*19sqw0x*_ga*Nzc5ODE4ODkzLjE3NjQ1ODg4OTk.*_ga_8JE65Q40S6*czE3NjQ1ODg4OTkkbzEkZzEkdDE3NjQ1ODkxNDMkajMzJGwwJGgw",
        "https://images.pexels.com/photos/19121494/pexels-photo-19121494.jpeg?_gl=1*1nr09to*_ga*Nzc5ODE4ODkzLjE3NjQ1ODg4OTk.*_ga_8JE65Q40S6*czE3NjQ1ODg4OTkkbzEkZzEkdDE3NjQ1ODk2MDIkajU5JGwwJGgw",
    ];
    
    const $bgContainer = $('#bg-container');
    const $dots = $('#bg-dots');

    if ($bgContainer.length) {
        backgrounds.forEach((url, i) => {
            $bgContainer.prepend(`
                <div class="bg-slide absolute inset-0 transition-opacity duration-[2000ms]" 
                     style="opacity:${i === 0 ? 1 : 0}; z-index:${i === 0 ? 1 : 0}" 
                     data-index="${i}">
                    <img src="${url}" class="w-full h-full object-cover transition-transform duration-[8000ms] scale-100">
                </div>
            `);
            if ($dots.length) {
                $dots.append(`<div class="bg-dot h-1.5 rounded-full transition-all duration-500 ${i === 0 ? 'w-8 bg-green-500' : 'w-2 bg-white/30'}" data-index="${i}"></div>`);
            }
        });

        let c = 0;
        setInterval(() => {
            const n = (c + 1) % backgrounds.length;
            // Opacity transition
            $('.bg-slide').css('opacity', 0).css('z-index', 0);
            $(`.bg-slide[data-index="${n}"]`).css('opacity', 1).css('z-index', 1);
            // Zoom effect
            $('.bg-slide img').removeClass('scale-110').addClass('scale-100');
            $(`.bg-slide[data-index="${n}"] img`).removeClass('scale-100').addClass('scale-110');
            // Dots update
            $('.bg-dot').removeClass('w-8 bg-green-500').addClass('w-2 bg-white/30');
            $(`.bg-dot[data-index="${n}"]`).addClass('w-8 bg-green-500').removeClass('w-2 bg-white/30');
            c = n;
        }, 6000);
    }

    // 7. Scroll Reveal Observer
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) $(entry.target).addClass('is-visible');
        })
    }, { threshold: 0.1 });
    
    $('.reveal-on-scroll').each(function() {
        obs.observe(this);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Select the Logout button
    // REPLACE '#logout-btn' with the actual ID or Class of the text 'Logout' in your top right corner
    const logoutBtn = document.querySelector('#logout-btn'); 

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(event) {
            // Prevent the link from jumping immediately (optional, good practice)
            event.preventDefault();

            // 2. Remove the user data from storage
            // MAKE SURE 'currentUser' matches the key you used in your Login logic
            localStorage.removeItem('currentUser'); 
            
            // Note: If you used sessionStorage instead, use sessionStorage.removeItem('currentUser');

            // 3. Reload the page
            // This refreshes the browser. Your previous script will run, 
            // see that 'currentUser' is gone, and reveal the Login button again.
            window.location.reload(); 
            
            // Alternatively, redirect to home:
            // window.location.href = 'index.html';
        });
    }
});