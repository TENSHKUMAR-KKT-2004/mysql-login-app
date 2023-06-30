const changePasswordForm = document.getElementById('changePasswordForm');
const errorText = document.getElementById('errorText');

changePasswordForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const mobileNumber = document.getElementById('mobileNumber').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (newPassword !== confirmPassword) {
    errorText.textContent = 'Passwords do not match';
    return;
  }

  try {
    const response = await fetch('/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mobileNumber, newPassword }),
    });

    if (response.ok) {
      const data = await response.json();
      alert(data.message);
      window.location.href = '/';
      // Redirect or perform any other necessary actions
    } else {
      const data = await response.json();
      errorText.textContent = data.error;
    }
  } catch (error) {
    console.error('Error changing password:', error);
    errorText.textContent = 'Internal server error';
  }
});
