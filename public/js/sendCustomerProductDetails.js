document.getElementById('customerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    var form = document.getElementById('customerForm');
    var errorText = document.getElementById('errorText');
    var successText = document.getElementById('successText');

    errorText.textContent = '';
    successText.textContent = '';

    try {
        const formData = {
            orderDate: form.orderDate.value,
            company: form.company.value,
            owner: form.owner.value,
            item: form.item.value,
            quantity: parseInt(form.quantity.value),
            weight: parseFloat(form.weight.value),
            shipmentRequest: form.shipmentRequest.value,
            trackingID: form.trackingID.value,
            shipmentSize: form.shipmentSize.value,
            boxCount: parseInt(form.boxCount.value),
            specification: form.specification.value,
            checklistQuantity: form.checklistQuantity.value
        };

        const response = await fetch('/customer/product/details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            successText.textContent = 'Form data sent successfully';
            console.log('Form data sent successfully');
        } else {
            const errorResponse = await response.json();
            console.log(errorResponse.error);
            errorText.textContent = 'Error occurred during form submission';
        }
    } catch (error) {
        errorText.textContent = 'An error occurred during form submission';
    }

    form.reset();
});
