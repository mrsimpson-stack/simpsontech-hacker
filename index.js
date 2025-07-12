// Create binary rain effect
function createBinaryRain() {
    const container = document.getElementById('binaryRain');
    const digits = '01';
    const count = 100;
    
    for (let i = 0; i < count; i++) {
        const digit = document.createElement('div');
        digit.className = 'binary-digit';
        digit.textContent = digits[Math.floor(Math.random() * digits.length)];
        digit.style.left = `${Math.random() * 100}%`;
        digit.style.top = `${Math.random() * -20}%`;
        digit.style.animationDuration = `${5 + Math.random() * 10}s`;
        digit.style.animationDelay = `${Math.random() * 5}s`;
        digit.style.opacity = Math.random() * 0.5;
        container.appendChild(digit);
    }
}

// Initialize binary rain
createBinaryRain();

// Simulated database with your numbers
const numberDatabase = {
    "256764803976": {
        valid: true,
        number: "256764803976",
        local_format: "0764803976",
        international_format: "+256764803976",
        country_prefix: "+256",
        country_code: "UG",
        country_name: "Uganda",
        carrier: "MTN Uganda",
        line_type: "mobile",
        owner: "Confidential",
        registration_date: "2021-05-15"
    },
    "256748217351": {
        valid: true,
        number: "256748217351",
        local_format: "0748217351",
        international_format: "+256748217351",
        country_prefix: "+256",
        country_code: "UG",
        country_name: "Uganda",
        carrier: "Airtel Uganda",
        line_type: "mobile",
        owner: "Simpson Tech",
        registration_date: "2020-11-22"
    }
};

document.getElementById('scanBtn').addEventListener('click', scanNumber);

function loadExample(number) {
    document.getElementById('numberInput').value = number;
    document.getElementById('resultContent').innerHTML = `
        <p>> EXAMPLE LOADED: ${number}</p>
        <p>> CLICK "INITIATE SCAN" TO CONTINUE</p>
    `;
}

function scanNumber() {
    const number = document.getElementById('numberInput').value.trim();
    const resultContent = document.getElementById('resultContent');
    const scanAnimation = document.getElementById('scanAnimation');
    const scanBtn = document.getElementById('scanBtn');
    
    if (!number) {
        showResult('> ERROR: NO INPUT DETECTED', 'error');
        return;
    }
    
    // Disable button during request
    scanBtn.disabled = true;
    showLoading();
    
    try {
        // Show scanning animation
        scanAnimation.style.display = 'block';
        
        // Typewriter effect for status
        typeWriter('> INITIATING DEEP SCAN...\n> ACCESSING TELECOM DATABASE...\n> BYPASSING SECURITY PROTOCOLS...', resultContent);
        
        // Simulate scanning delay
        setTimeout(() => {
            if (numberDatabase[number]) {
                displayResults(numberDatabase[number]);
            } else {
                showResult(`> ERROR: NUMBER NOT IN DATABASE\n> ${number}\n> CONTACT SIMPSON TECH FOR ACCESS`, 'error');
            }
            
            scanBtn.disabled = false;
            scanAnimation.style.display = 'none';
        }, 3000);
    } catch (error) {
        console.error('Scan error:', error);
        showResult(`> SCAN FAILED\n> ${error.message}\n> TRY AGAIN OR CONTACT SYSTEM ADMIN`, 'error');
        scanBtn.disabled = false;
        scanAnimation.style.display = 'none';
    }
}

function showLoading() {
    document.getElementById('resultContent').innerHTML = `
        <p class="typing">> CONNECTING TO SECURE DATABASE...</p>
    `;
}

function displayResults(data) {
    const resultsHTML = `
        <p class="valid">> SCAN COMPLETE</p>
        <p>> TARGET ANALYSIS:</p>
        <div class="result-line">
            <span class="result-label">NUMBER:</span>
            <span class="result-value">${data.local_format || data.number}</span>
        </div>
        <div class="result-line">
            <span class="result-label">INTERNATIONAL:</span>
            <span class="result-value">${data.international_format}</span>
        </div>
        <div class="result-line">
            <span class="result-label">COUNTRY:</span>
            <span class="result-value">${data.country_name} (${data.country_code})</span>
        </div>
        <div class="result-line">
            <span class="result-label">CARRIER:</span>
            <span class="result-value">${data.carrier}</span>
        </div>
        <div class="result-line">
            <span class="result-label">LINE TYPE:</span>
            <span class="result-value">${data.line_type}</span>
        </div>
        <div class="result-line">
            <span class="result-label">REGISTERED:</span>
            <span class="result-value">${data.registration_date}</span>
        </div>
        <div class="result-line">
            <span class="result-label">STATUS:</span>
            <span class="result-value valid">ACTIVE</span>
        </div>
        <p>> SCAN COMPLETED AT ${new Date().toLocaleTimeString()}</p>
    `;
    
    document.getElementById('resultContent').innerHTML = resultsHTML;
}

function showResult(message, type = 'info') {
    const resultContent = document.getElementById('resultContent');
    const className = type === 'error' ? 'invalid' : 'valid';
    
    resultContent.innerHTML = `
        <p class="${className}">${message}</p>
    `;
}

function typeWriter(text, element, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function typing() {
        if (i < text.length) {
            // Handle newlines
            if (text.charAt(i) === '\n') {
                element.innerHTML += '<br>';
            } else {
                element.innerHTML += text.charAt(i);
            }
            i++;
            setTimeout(typing, speed);
        }
    }
    
    typing();
}

// Modal functionality
const paymentModal = document.getElementById('paymentModal');
const forgotPinBtn = document.getElementById('forgotPinBtn');
const simUnlockBtn = document.getElementById('simUnlockBtn');
const closeModal = document.getElementById('closeModal');
const submitPayment = document.getElementById('submitPayment');

forgotPinBtn.addEventListener('click', () => {
    document.getElementById('modalTitle').textContent = 'FORGOT PIN SERVICE';
    paymentModal.style.display = 'flex';
});

simUnlockBtn.addEventListener('click', () => {
    document.getElementById('modalTitle').textContent = 'SIM CARD UNLOCK SERVICE';
    paymentModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    paymentModal.style.display = 'none';
});

submitPayment.addEventListener('click', () => {
    const paymentNumber = document.getElementById('paymentNumber').value.trim();
    if (!paymentNumber) {
        alert('Please enter your payment phone number');
        return;
    }
    
    // Here you would normally send this to a server
    alert(`Payment proof submitted from: ${paymentNumber}\nWe will contact you within 24 hours.`);
    paymentModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === paymentModal) {
        paymentModal.style.display = 'none';
    }
});