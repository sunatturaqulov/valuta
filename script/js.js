const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const convertBtn = document.getElementById('convertBtn');
const resultText = document.getElementById('resultText');
const swapBtn = document.getElementById('swapBtn');

const API_URL = "https://open.er-api.com/v6/latest/";

async function convertCurrency() {
    const amountValue = amountInput.value;
    const fromValue = fromCurrency.value;
    const toValue = toCurrency.value;

    if (amountValue === "" || amountValue <= 0) {
        resultText.innerText = "Iltimos, to'g'ri miqdor kiriting";
        return;
    }

    resultText.innerText = "Yuklanmoqda...";

    try {
        const response = await fetch(`${API_URL}${fromValue}`);
        const data = await response.json();

        if (data.result === "success") {
           
            const rate = data.rates[toValue];
            const total = (amountValue * rate).toFixed(2);

          
            resultText.innerText = `${amountValue} ${fromValue} = ${total} ${toValue}`;
        } else {
            resultText.innerText = "Kursni yuklashda xatolik yuz berdi.";
        }
    } catch (error) {
        resultText.innerText = "Internet aloqasini tekshiring!";
        console.error("Xatolik:", error);
    }
}

convertBtn.addEventListener('click', convertCurrency);


window.addEventListener('load', convertCurrency);

swapBtn.addEventListener('click', () => {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    convertCurrency(); 
});