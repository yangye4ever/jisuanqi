document.addEventListener('DOMContentLoaded', function() {
    const headPriceInput = document.getElementById('head-price');
    const neckPriceInput = document.getElementById('neck-price');
    const targetPriceOutput = document.getElementById('target-price');
    const stopPriceOutput = document.getElementById('stop-price');
    const buyPriceOutput = document.getElementById('buy-price');
    const rewardRatioOutput = document.getElementById('reward-ratio');
    const calculateButton = document.getElementById('calculate-button');
    const notFifteenTimesButton = document.getElementById('not-fifteen-times-button');

    function calculatePrices() {
        const headPrice = parseFloat(headPriceInput.value);
        const neckPrice = parseFloat(neckPriceInput.value);

        if (isNaN(headPrice) || isNaN(neckPrice)) {
            alert('请输入有效的价格');
            return;
        }

        const targetPrice = neckPrice - headPrice + neckPrice;
        const stopPrice = neckPrice;
        const buyPrice = 1.03 * neckPrice;
        const rewardRatio = (targetPrice - buyPrice) / (buyPrice - stopPrice);

        updateOutputs(targetPrice, stopPrice, buyPrice, rewardRatio);
    }

    function notEnoughFifteenTimes() {
        const neckPrice = parseFloat(neckPriceInput.value);
        const targetPrice = parseFloat(targetPriceOutput.textContent);

        if (isNaN(neckPrice) || isNaN(targetPrice)) {
            alert('请输入有效的价格');
            return;
        }

        const newBuyPrice = (targetPrice - neckPrice) / 16 + neckPrice;
        const newRewardRatio = (targetPrice - newBuyPrice) / (newBuyPrice - neckPrice);

        updateOutputs(targetPrice, neckPrice, newBuyPrice, newRewardRatio, true);
    }

    function updateOutputs(targetPrice, stopPrice, buyPrice, rewardRatio, updateBuyPriceOnly = false) {
        targetPriceOutput.textContent = targetPrice.toFixed(2);
        stopPriceOutput.textContent = stopPrice.toFixed(2);
        buyPriceOutput.textContent = buyPrice.toFixed(2);
        rewardRatioOutput.textContent = rewardRatio.toFixed(4);

        if (updateBuyPriceOnly) {
            buyPriceOutput.style.color = '#d9534f';
        } else {
            targetPriceOutput.style.color = 'green';
            stopPriceOutput.style.color = 'blue';
            rewardRatioOutput.style.color = 'purple';
            buyPriceOutput.style.color = '#d9534f';
        }
    }

    calculateButton.addEventListener('click', calculatePrices);
    notFifteenTimesButton.addEventListener('click', notEnoughFifteenTimes);
});