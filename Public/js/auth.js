/**
 * File: public/js/auth.js
 * Description: Logic for Login/Signup interactions, Slider, Password Toggle, and Supabase Auth.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Slider Logic ---
    const sliderItems = document.querySelectorAll('.slider .list .item');
    let currentSliderIndex = 0;
    const sliderInterval = 6000; // 6 seconds

    function nextSlide() {
        if(sliderItems.length === 0) return;
        sliderItems[currentSliderIndex].classList.remove('active');
        currentSliderIndex = (currentSliderIndex + 1) % sliderItems.length;
        sliderItems[currentSliderIndex].classList.add('active');
    }

    if (sliderItems.length > 0) {
        setInterval(nextSlide, sliderInterval);
    }

    // --- Password Visibility Toggle ---
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');
    
    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });

    // --- Login/Signup/Forgot Toggle ---
    const showSignupBtn = document.getElementById('showSignup');
    const showLoginBtn = document.getElementById('showLogin');
    const loginSection = document.getElementById('loginSection');
    const signupSection = document.getElementById('signupSection');
    const forgotPasswordSection = document.getElementById('forgotPasswordSection');
    const showForgotPasswordBtn = document.getElementById('showForgotPassword');
    const backToLoginFromForgotBtn = document.getElementById('backToLoginFromForgot');

    if (showSignupBtn && showLoginBtn) {
        showSignupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginSection.classList.add('hidden');
            signupSection.classList.remove('hidden');
            if(forgotPasswordSection) forgotPasswordSection.classList.add('hidden');
        });

        showLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            signupSection.classList.add('hidden');
            if(forgotPasswordSection) forgotPasswordSection.classList.add('hidden');
            loginSection.classList.remove('hidden');
        });
    }

    if (showForgotPasswordBtn) {
        showForgotPasswordBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginSection.classList.add('hidden');
            if(signupSection) signupSection.classList.add('hidden');
            forgotPasswordSection.classList.remove('hidden');
        });
    }

    if (backToLoginFromForgotBtn) {
        backToLoginFromForgotBtn.addEventListener('click', (e) => {
            e.preventDefault();
            forgotPasswordSection.classList.add('hidden');
            loginSection.classList.remove('hidden');
        });
    }

    // --- Supabase Auth Logic ---
    const authClient = window.supabaseClient;

    // Helper: Show Alert (Replace with better UI later)
    const showAlert = (message, isError = false) => {
        alert(message); // Simple alert for now
        if(isError) console.error(message);
    };

    // Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const submitBtn = loginForm.querySelector('button[type="submit"]');

            try {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Loading...';

                const { data, error } = await authClient.auth.signInWithPassword({
                    email: email,
                    password: password,
                });

                if (error) throw error;

                showAlert('Login Berhasil!');
                console.log('User:', data.user);
                // Redirect or update UI here
                // window.location.href = '/dashboard.html'; 

            } catch (error) {
                showAlert(`Login Gagal: ${error.message}`, true);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'MASUK';
            }
        });
    }

    // Signup
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const submitBtn = signupForm.querySelector('button[type="submit"]');

            try {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Loading...';

                const { data, error } = await authClient.auth.signUp({
                    email: email,
                    password: password,
                    options: {
                        data: {
                            full_name: name,
                        },
                    },
                });

                if (error) throw error;

                showAlert('Pendaftaran Berhasil! Silakan cek email untuk verifikasi.');
                console.log('User:', data.user);
                
                // Switch to login
                signupSection.classList.add('hidden');
                loginSection.classList.remove('hidden');

            } catch (error) {
                showAlert(`Pendaftaran Gagal: ${error.message}`, true);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'DAFTAR';
            }
        });
    }

    // Forgot Password
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('forgotEmail').value;
            const submitBtn = forgotPasswordForm.querySelector('button[type="submit"]');

            try {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Loading...';

                const { data, error } = await authClient.auth.resetPasswordForEmail(email, {
                    redirectTo: window.location.origin + '/reset-password.html', // Ensure this page exists or handle logic
                });

                if (error) throw error;

                showAlert('Link reset password telah dikirim ke email Anda.');
                
                // Switch to login
                forgotPasswordSection.classList.add('hidden');
                loginSection.classList.remove('hidden');

            } catch (error) {
                showAlert(`Gagal mengirim link: ${error.message}`, true);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'KIRIM LINK RESET';
            }
        });
    }
});
