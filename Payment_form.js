// payment_form.js

// Create the form container
document.addEventListener("DOMContentLoaded", function() {
    const app = document.getElementById('app');
    const formContainer = document.createElement('div');
    formContainer.className = 'form-container';

    // Create the form as a template literal
    const formHtml = `
        <style>
            .form-container {
                display: flex;
                justify-content: space-between;
                padding: 20px;
            }
            .preview {
                border: 1px solid #ccc;
                padding: 20px;
                max-width: 200px;
            }
            .preview h2 {
                margin-top: 0;
            }
            .error {
                color: red;
                font-size: 12px;
            }
        </style>
        <div>
            <form id="paymentForm">
                <label for="cardName">Name on Card:</label><br>
                <input type="text" id="cardName" name="cardName" required>
                <div id="cardNameError" class="error"></div><br>
                
                <label for="cardNumber">Card Number:</label><br>
                <input type="text" id="cardNumber" name="cardNumber" required>
                <div id="cardNumberError" class="error"></div><br>
                
                <label for="expiryDate">Expiry Date (MM/YY):</label><br>
                <input type="text" id="expiryDate" name="expiryDate" required>
                <div id="expiryDateError" class="error"></div><br>
                
                <label for="cvv">CVV:</label><br>
                <input type="text" id="cvv" name="cvv" required>
                <div id="cvvError" class="error"></div><br>
                
                <input type="submit" value="Submit">
            </form>
        </div>
        <div class="preview">
            <h2>Preview</h2>
            <p><strong>Name on Card:</strong> <span id="previewCardName"></span></p>
            <p><strong>Card Number:</strong> <span id="previewCardNumber"></span></p>
            <p><strong>Expiry Date:</strong> <span id="previewExpiryDate"></span></p>
            <p><strong>CVV:</strong> <span id="previewCVV"></span></p>
        </div>
    `;

    // Set the inner HTML of the form container
    formContainer.innerHTML = formHtml;

    // Append the form container to the app div
    app.appendChild(formContainer);

    // JavaScript functions for updating and validating the form
    function updatePreview() {
        document.getElementById('previewCardName').innerText = document.getElementById('cardName').value;
        document.getElementById('previewCardNumber').innerText = document.getElementById('cardNumber').value;
        document.getElementById('previewExpiryDate').innerText = document.getElementById('expiryDate').value;
        document.getElementById('previewCVV').innerText = document.getElementById('cvv').value;
    }

    function validateForm(event) {
        event.preventDefault();
        let isValid = true;

        // Clear previous error messages
        document.getElementById('cardNameError').innerText = '';
        document.getElementById('cardNumberError').innerText = '';
        document.getElementById('expiryDateError').innerText = '';
        document.getElementById('cvvError').innerText = '';

        // Validate Name on Card
        const cardName = document.getElementById('cardName').value;
        if (!cardName.trim()) {
            document.getElementById('cardNameError').innerText = 'Name on card is required';
            isValid = false;
        }

        // Validate Card Number (simple check for 16 digits)
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s+/g, '');
        const cardNumberPattern = /^\d{16}$/;
        if (!cardNumberPattern.test(cardNumber)) {
            document.getElementById('cardNumberError').innerText = 'Card number must be 16 digits';
            isValid = false;
        }

        // Validate Expiry Date (MM/YY format)
        const expiryDate = document.getElementById('expiryDate').value;
        const expiryDatePattern = /^(0[1-9]|1[0-2])\/(\d{2})$/;
        if (!expiryDatePattern.test(expiryDate)) {
            document.getElementById('expiryDateError').innerText = 'Invalid expiry date format';
            isValid = false;
        }

        // Validate CVV (3 or 4 digits)
        const cvv = document.getElementById('cvv').value;
        const cvvPattern = /^\d{3,4}$/;
        if (!cvvPattern.test(cvv)) {
            document.getElementById('cvvError').innerText = 'CVV must be 3 or 4 digits';
            isValid = false;
        }

        // If valid, alert success message instead of form submission
        if (isValid) {
            alert('Form submitted successfully!');
        }
    }

    // Attach event listeners
    document.getElementById('paymentForm').addEventListener('submit', validateForm);
    document.getElementById('cardName').addEventListener('input', updatePreview);
    document.getElementById('cardNumber').addEventListener('input', updatePreview);
    document.getElementById('expiryDate').addEventListener('input', updatePreview);
    document.getElementById('cvv').addEventListener('input', updatePreview);
});
