const orderForm = document.getElementById('orderForm');
const errorText = document.getElementById('errorText');

orderForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const orderDate = document.getElementById('orderDate').value;
  const item = document.getElementById('item').value;
  const count = document.getElementById('count').value;
  const weight = document.getElementById('weight').value;
  const requests = document.getElementById('requests').value;

  try {
    const response = await fetch('/product/add-details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderDate, item, count, weight, requests }),
    });

    if (response.ok) {
      const data = await response.json();
      alert(data.message);
      // Redirect or perform any other necessary actions
    } else {
      const data = await response.json();
      errorText.textContent = data.error;
    }
  } catch (error) {
    console.error('Error adding order details:', error);
    errorText.textContent = 'Internal server error';
  }
  orderForm.reset();
});
