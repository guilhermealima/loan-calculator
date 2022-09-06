let loading = document.getElementById('loading');
let results = document.getElementById('results-card');

// Listener for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    e.preventDefault();
    showLoading();
    setTimeout(calculateResults, 3000, e);
});

function showLoading(){
    results.style.display = 'none';
    loading.style.display = 'flex';
}

function calculateResults(e){
    //UI variables
    const uiAmount = document.getElementById('amount');
    const uiInterest = document.getElementById('interest');
    const uiYears = document.getElementById('years');
    const uiMonthlyPayment = document.getElementById('monthly-payment');
    const uiTotalPayment = document.getElementById('total-payment');
    const uiTotalInterest = document.getElementById('total-interest');
    
    const principal = parseFloat(uiAmount.value);
    const calculatedInterest = parseFloat(uiInterest.value) / 100 / 12;
    const calculatedPayments = parseFloat(uiYears.value) * 12;

    // Compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)){
        uiMonthlyPayment.value = monthly.toFixed(2);
        uiTotalPayment.value = (monthly * calculatedPayments).toFixed(2);
        uiTotalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        
        //disabling loading and enabling results
        loading.style.display = 'none';
        results.style.display = 'block';
    }
    else{
        showError('Please check your numbers.');

        //disabling loading and disabling results
        loading.style.display = 'none';
        results.style.display = 'none';    
    }
}

//Show error message
function showError(message){
    clearError();

    //Creating a section
    const errorSection = document.createElement('section');

    //Getting elements, we want the alert before the title Loan Calculator
    const card = document.getElementById('calculator-card');
    const heading = document.querySelector('.heading');

    //Add classes
    errorSection.className = 'alert';

    //Create text node and append to section
    errorSection.appendChild(document.createTextNode(message));

    //inserting alert before heading
    card.insertBefore(errorSection, heading);

    //clear error after some seconds
    setTimeout(clearError, 5000); // 5 seconds, 5000 miliseconds
}

function clearError(){
    document.querySelector('.alert')?.remove();
}