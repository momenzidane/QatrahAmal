// script.js

// Function to toggle between Donor and Patient forms
function showTab(tabName) {
    const hSignupForm = document.getElementById('signup');
    const hLoginForm = document.getElementById('login');
    // const donorTab = document.querySelector('.tab-btn.active');

    if (tabName === 'signup') {
        $('html').animate({
            scrollTop: 300
        }, 1000);
        hSignupForm.style.display = 'block';
        hLoginForm.style.display = 'none';
    } else {
        hSignupForm.style.display = 'none';
        hLoginForm.style.display = 'block';

    }
}
