function setFee() {
    const paymentMethod = document.getElementById('paymentMethod').value;
    let paymentMethodFee = 1.85;

    switch (paymentMethod) {
        case 'bkash':
            paymentMethodFee = 1.85;
            break;
        case 'nagad':
            paymentMethodFee = 1.49;
            break;
        case 'rocket':
            paymentMethodFee = 1.67;
            break;
        case 'upay':
            paymentMethodFee = 1.4;
            break;
        case 'bank':
            paymentMethodFee = 0;
            break;
        default:
            paymentMethodFee = 0;
    }

    document.getElementById('paymentMethodFee').value = paymentMethodFee;
}

function calculate() {
    const bdtAmount1xBet = parseFloat(document.getElementById('bdtAmount1xBet').value);
    const usdtDeposited = parseFloat(document.getElementById('usdtDeposited').value);

    const bdtAmount = parseFloat(document.getElementById('bdtAmount').value);
    const usdtPrice = parseFloat(document.getElementById('usdtPrice').value);
    const paymentMethodFee = parseFloat(document.getElementById('paymentMethodFee').value);

    const usdtNeeded = usdtDeposited + (usdtDeposited * 0.005);
    const cashDesk1xBet = (bdtAmount1xBet - (bdtAmount1xBet * 0.01)).toFixed(2);
    const bdtPerUsdt1xBet = (bdtAmount1xBet / usdtNeeded).toFixed(2);

    const chargeInTaka = bdtAmount * (paymentMethodFee / 100);
    const totalBdtNeeded = bdtAmount + chargeInTaka;
    const usdtReceived = bdtAmount / usdtPrice;
    const usdtRateAfterFee = totalBdtNeeded / usdtReceived;

    const comparison = (usdtRateAfterFee - bdtPerUsdt1xBet) * usdtNeeded.toFixed(2);

    let comparisonText = '';
    let comparisonResult = Math.abs(comparison).toFixed(2);

    if (usdtRateAfterFee < bdtPerUsdt1xBet) {
        comparisonText = 'Profit';
        comparisonResult = '+' + comparisonResult;
    } else if (usdtRateAfterFee > bdtPerUsdt1xBet) {
        comparisonText = 'Loss';
        comparisonResult = '-' + comparisonResult;
    } else {
        comparisonText = 'No profit or loss';
    }
    

    const resultBuyy = `
    <span class="close-btn" onclick="closeResult()">Close</span>
        <h2>Buy Calculator Result</h2>
        <p>Charge in Taka: ${chargeInTaka.toFixed(2)} BDT</p>
        <p>Total BDT needed: ${totalBdtNeeded.toFixed(2)} BDT</p>
        <p>USDT received: ${usdtReceived.toFixed(8)} USDT</p>
        <p>USDT Buyrate after fee: ${usdtRateAfterFee.toFixed(2)} BDT</p>
        <h2>1xBet Calculator Result</h2>
        <p>Total USDT Needed to Pay: ${usdtNeeded.toFixed(8)} USDT</p>
        <p>Cash Desk (BDT): ${cashDesk1xBet} BDT</p>
        <p>BDT per USDT offered by 1xBet: ${bdtPerUsdt1xBet} BDT</p>
        <h2>Comparison</h2>
        <p>${comparisonText}: <span class="${comparisonText === 'Profit' ? 'green' : 'red'}">${comparisonResult} BDT</span></p>
    `;

    document.getElementById('resultBuyy').innerHTML = resultBuyy;
}
// Function to toggle the result pop-up
function toggleResult() {
    var result = document.getElementById("resultBuyy");
    if (result.style.display === "block") {
        result.style.display = "none";
    } else {
        result.style.display = "block";
    }
}
function closeResult() {
    var result = document.querySelector('.result');
    result.style.display = 'none';
}

function calculateAndToggle() {
    // Call the calculate function
    calculate();
    // Call the toggleResult function
    toggleResult();
}
