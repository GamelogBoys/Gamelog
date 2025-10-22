const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

function toggleMenu() {
  const menu = document.getElementById("slideMenu");
  if (menu.style.transform === "translateX(0%)") {
    menu.style.transform = "translateX(120%)"; // hide
  } else {
    menu.style.transform = "translateX(0%)";   // show
  }
}
const form = document.getElementById('myForm');
const input = document.getElementById('Email');
const errorMessageDiv = document.getElementById('error-message');

// 2. Define your custom message
const CUSTOM_MESSAGE = "❌ Please enter the email id.";

// 3. Attach an event listener to the form submission
form.addEventListener('submit', (event) => {
    // 🛑 ALWAYS prevent the default form submission first
    event.preventDefault(); 

    // Get the current value of the input, trimmed of whitespace
    const inputValue = input.value.trim();

    if (inputValue === "") {
        // --- VALIDATION FAILED ---
        
        // a. Display the error message div
        errorMessageDiv.style.display = 'block';
        
        // b. Set your custom text
        errorMessageDiv.textContent = CUSTOM_MESSAGE; 
        
        // c. Optional: Add a visual cue to the input field
        input.classList.add('input-error');

    } else {
        const form = document.getElementById('myForm');
        const input = document.getElementById('Password');
        const errorMessageDiv = document.getElementById('error-message');

        // 2. Define your custom message
        const CUSTOM_MESSAGE = "❌ Please enter correct password.";

        // 3. Attach an event listener to the form submission
        form.addEventListener('submit', (event) => {
            // 🛑 ALWAYS prevent the default form submission first
            event.preventDefault(); 

            // Get the current value of the input, trimmed of whitespace
            const inputValue = input.value.trim();

                if (inputValue === "") {
                    // --- VALIDATION FAILED ---
        
                    // a. Display the error message div
                    errorMessageDiv.style.display = 'block';
        
                    // b. Set your custom text
                    errorMessageDiv.textContent = CUSTOM_MESSAGE; 
        
                // c. Optional: Add a visual cue to the input field
                input.classList.add('input-error');

            } else {
                // --- VALIDATION SUCCESS ---
        
                // a. Hide and clear the error message
                errorMessageDiv.style.display = 'none';
                errorMessageDiv.textContent = '';
        
                // b. Clean up the input field styling
                input.classList.remove('input-error');
        
                // c. Final Step: If you need to redirect or actually submit the form, do it here.
                // If you still want to redirect:
                window.location.href = 'profile.html'; 
        
                // OR, if you want the form to submit normally after validation:
                // form.submit();
            }
        });
    }
});
