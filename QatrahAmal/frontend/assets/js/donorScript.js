// script.js

// Function to toggle between Donor and Patient forms
function showTab(tabName) {
    const signupForm = document.getElementById('signup');
    const loginForm = document.getElementById('login');

    if (tabName === 'signup') {
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
    } else {
         $('html').animate({
            scrollTop: 1800
          }, 1000);
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    }
}
