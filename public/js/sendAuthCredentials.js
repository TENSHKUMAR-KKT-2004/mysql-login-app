document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var errorText = document.getElementById('errorText');
  
    // Clearing previous error message
    errorText.textContent = '';
    username.classList.remove('error');
    password.classList.remove('error');
  
    var enteredUsername = username.value;
    var enteredPassword = password.value;
    var loginData = {
        username: enteredUsername,
        password: enteredPassword
    };
  
    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        if (response.ok) {
            const data = await response.json();
            if (data.route === '/customer') {
                location.assign('/customer');
            } else {
                location.assign('/admin');
            }
        } else {
            const errorResponse = await response.json();
            console.log(errorResponse.error);
            errorText.textContent = 'Invalid username or password';
            username.classList.add('error');
            password.classList.add('error');
        }
    } catch (error) {
        errorText.textContent = 'An error occurred during login';
    }

    // Clear the input fields
    username.value = '';
    password.value = '';
});
