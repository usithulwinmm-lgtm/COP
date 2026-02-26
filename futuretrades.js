
// Wallet Initial Data
let wallets = JSON.parse(localStorage.getItem('crypto_wallets')) || {
    fiatBalance: 10000.00,
    spotBalance: 5500.25,
    earnBalance: 1200.00,
    defiBalance: 450.00
};

let selectedWalletType = 'spotBalance';

// ၂။ ဘာသာစကားအလိုက် ပြောင်းလဲမည့် စာသားများ (ဘာသာစကား ၁၀ မျိုးလုံးအတွက်)
const i18n = {
    'en': { 'logo': 'Crypto-Onchain Pro', 'fiat-tab': 'Fiat Wallet', 'spot-tab': 'Spot Wallet', 'earn-tab': 'Earn', 'defi-tab': 'DeFi', 'bal-title': 'USDT Balance', 'deposit': 'Deposit', 'withdraw': 'Withdraw', 'transfer': 'Transfer', 'asset-header': 'Your Assets' },
    'mm': { 'logo': 'ခရစ်ပတို ပရို', 'fiat-tab': 'ငွေကြေးအိတ်', 'spot-tab': 'စပေါ့အိတ်', 'earn-tab': 'အမြတ်စု', 'defi-tab': 'ဒီဖိုင်', 'bal-title': 'USDT လက်ကျန်', 'deposit': 'ငွေသွင်း', 'withdraw': 'ငွေထုတ်', 'transfer': 'လွှဲပြောင်း', 'asset-header': 'သင်၏ပိုင်ဆိုင်မှု' },
    'th': { 'logo': 'คริปโต โปร', 'fiat-tab': 'กระเป๋าเงินเฟียต', 'spot-tab': 'สปอตวอลเล็ท', 'earn-tab': 'การออม', 'defi-tab': 'ดีไฟ', 'bal-title': 'ยอดคงเหลือ USDT', 'deposit': 'ฝากเงิน', 'withdraw': 'ถอนเงิน', 'transfer': 'โอนเงิน', 'asset-header': 'สินทรัพย์ของคุณ' },
    'jp': { 'logo': '暗号プロ', 'fiat-tab': 'フィアット', 'spot-tab': 'スポット', 'earn-tab': '収益', 'defi-tab': 'デファイ', 'bal-title': 'USDT 残高', 'deposit': '入金', 'withdraw': '出金', 'transfer': '送金', 'asset-header': 'あなたの資産' },
    'ch': { 'logo': '加密货币专业版', 'fiat-tab': '法币钱包', 'spot-tab': '现货钱包', 'earn-tab': '赚币', 'defi-tab': '去中心化金融', 'bal-title': 'USDT 余额', 'deposit': '充值', 'withdraw': '提现', 'transfer': '划转', 'asset-header': '您的资产' },
    'kr': { 'logo': '크립토 프로', 'fiat-tab': '피아트 지갑', 'spot-tab': '스팟 지갑', 'earn-tab': '적립', 'defi-tab': '디파이', 'bal-title': 'USDT 잔액', 'deposit': '입금', 'withdraw': '출금', 'transfer': '이체', 'asset-header': '내 자산' },
    'sp': { 'logo': 'Crypto Pro', 'fiat-tab': 'Billetera Fiat', 'spot-tab': 'Billetera Spot', 'earn-tab': 'Ganar', 'defi-tab': 'DeFi', 'bal-title': 'Saldo USDT', 'deposit': 'Depósito', 'withdraw': 'Retirar', 'transfer': 'Transferir', 'asset-header': 'Tus Activos' },
    'fr': { 'logo': 'Crypto Pro', 'fiat-tab': 'Portefeuille Fiat', 'spot-tab': 'Portefeuille Spot', 'earn-tab': 'Gagner', 'defi-tab': 'DeFi', 'bal-title': 'Solde USDT', 'deposit': 'Dépôt', 'withdraw': 'Retirer', 'transfer': 'Transférer', 'asset-header': 'Vos Actifs' }
};

// ၃။ Full Page Translate (ဒီ Function က i18n ထဲက data တွေကို ဆွဲထုတ်ပြီး Page ကို ပြောင်းပေးတာပါ)
function changeLanguage(code) {
    // 1. Display ကို update လုပ်မယ်
    document.getElementById('display-lang').innerText = code.toUpperCase();
    
    // 2. ရွေးချယ်လိုက်တဲ့ ဘာသာစကား translation ကို ယူမယ်
    const t = i18n[code] || i18n['en']; // မရှိရင် English ကို default ထားမယ်
    
    // 3. HTML ထဲက [data-lang] attribute ရှိတဲ့ element တိုင်းကို စာသားလိုက်လဲမယ်
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (t[key]) {
            el.innerText = t[key];
        }
    });
    
    closeLanguageModal();
}

// ၁။ ဘာသာစကား ၁၀၀ ကျော်စာရင်း (ဥပမာအချို့)
const languages = [
    { code: 'en', name: 'English' }, { code: 'mm', name: 'Myanmar (Burmese)' },
    { code: 'th', name: 'Thai' }, { code: 'jp', name: 'Japanese' },
    { code: 'ch', name: 'Chinese (Traditional)' }, { code: 'ch', name: 'Chinese (Simplified)' },
    { code: 'kr', name: 'Korean' }, { code: 'sp', name: 'Spanish' },
    { code: 'fr', name: 'French' }, { code: 'fr', name: 'French (Canada)' },


    // ကျန်ရှိသော ဘာသာစကားများကို ဆက်လက်ထည့်သွင်းနိုင်သည်
];


// ၂။ Language Modal Logic
function openLanguageModal() {
    document.getElementById('language-modal').classList.remove('hidden');
    renderLanguages(languages);
}

function closeLanguageModal() {
    document.getElementById('language-modal').classList.add('hidden');
}

function renderLanguages(list) {
    const container = document.getElementById('lang-options');
    container.innerHTML = list.map(l => `
        <button onclick="changeLanguage('${l.code}')" class="text-left p-2 hover:bg-gray-800 text-xs rounded transition text-gray-300">
            ${l.name}
        </button>
    `).join('');
}

function searchLanguage() {
    const term = document.getElementById('lang-search').value.toLowerCase();
    const filtered = languages.filter(l => l.name.toLowerCase().includes(term));
    renderLanguages(filtered);
}

// Variable များကို ထိပ်ဆုံးတွင် တစ်ကြိမ်သာ ကြေညာပါ
// localStorage မှ portfolio data ကို ဖတ်ယူခြင်း
let portfolio = JSON.parse(localStorage.getItem('portfolio')) || { "USDT": 200000.00 };
let allPairs = [];
let filteredPairs = [];
let currentPage = 1;
const itemsPerPage = 10;
let currentPrice = [];
let selectedCoinName = "BTC";
let isPairSelected = false; // User က တစ်ခုခု ရွေးပြီးပြီလား သိရန်
// ကုဒ်အသစ်ဖြင့် အစားထိုးရန်
let tradeHistory = JSON.parse(localStorage.getItem('tradeHistory')) || [];

// Page စဖွင့်ချိန်မှာ သိမ်းထားတဲ့ History တွေကို ဇယားထဲမှာ ပြပေးရန်

window.onload = function() {
    renderStoredHistory();
    updateTopBalance(); // Balance ကို စဖွင့်ချင်း update လုပ်ရန်
};

// ၁။ Binance API မှ Data အားလုံးကို စတင်ခေါ်ယူခြင်း (24h Change အပါအဝင်)
async function fetchFullMarketData() {
    try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/24hr');
        const data = await response.json();
        allPairs = data.filter(item => item.symbol.endsWith('USDT'));
        
        // Search Filter မရှိလျှင် အားလုံးပြရန်
        const searchTerm = document.getElementById('market-search').value.toUpperCase();
        if (!searchTerm) {
            filteredPairs = allPairs;
        } else {
            filteredPairs = allPairs.filter(item => item.symbol.includes(searchTerm));
        }
        
        renderMarketTable();
    } catch (error) {
        console.error("Market Data Fetch Error:", error);
    }
}

// ၄။ Search လုပ်ဆောင်ချက်
document.getElementById('market-search').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toUpperCase();
    filteredPairs = allPairs.filter(item => item.symbol.replace('USDT', '').includes(searchTerm));
    currentPage = 1;
    renderMarketTable();
});

// ၅။ Pagination Logic
function updatePagination() {
    const totalPages = Math.ceil(filteredPairs.length / itemsPerPage) || 1;
    document.getElementById('page-info').innerText = `Page ${currentPage} of ${totalPages}`;
    document.getElementById('prev-page').disabled = (currentPage === 1);
    document.getElementById('next-page').disabled = (currentPage === totalPages);
}

document.getElementById('next-page').addEventListener('click', () => {
    if (currentPage * itemsPerPage < filteredPairs.length) {
        currentPage++;
        renderMarketTable();
    }
});

document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderMarketTable();
    }
});

// Interval များ သတ်မှတ်ခြင်း
setInterval(updateOrderBook, 800);
setInterval(updateMarketPrices, 1000); // ၁ စက္ကန့်တစ်ခါ စျေးနှုန်း Update
setInterval(fetchFullMarketData, 60000); // ၁ မိနစ်တစ်ခါ Data အားလုံး Refresh

// Initial Load
fetchFullMarketData();

// တခြား UI Logics (Delivery, Risk Box, Trade History) ကို ဆက်လက်ထားရှိပါ...
// [အောက်က ကုဒ်များကို မဖျက်ပါနှင့်]
document.querySelectorAll('.c-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.c-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

document.getElementById('toggle-history').addEventListener('click', function() {
    const container = document.getElementById('history-container');
    if (container.style.display === "none" || container.style.display === "") {
        container.style.display = "block";
        this.innerText = "Hide";
    } else {
        container.style.display = "none";
        this.innerText = "View All";
    }
});

// ၄။ renderMarketTable function ရဲ့ အောက်ဆုံးမှာ setupTradeButtons() ကို ခေါ်ပေးရပါမယ်
function renderMarketTable() {
    const tbody = document.getElementById('market-body');
    if (!tbody) return;
    tbody.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredPairs.slice(startIndex, endIndex);

    currentData.forEach(item => {
        const symbol = item.symbol;
        const name = symbol.replace('USDT', '');
        const price = parseFloat(item.lastPrice).toLocaleString(undefined, { minimumFractionDigits: 2 });
        const change = parseFloat(item.priceChangePercent).toFixed(2);

        const row = `
            <tr>
                <td>
                    <div class="pair-info">
                        <div>
                            <span class="pair-name">${name}</span><span class="pair-sub">/USDT</span>
                        </div>
                    </div>
                </td>
                <td class="price-cell">${price}</td>
                <td class="${change >= 0 ? 'up' : 'red'}">${change >= 0 ? '+' : ''}${change}%</td>
                <td class="text-right"><button class="trade-btn">Trade</button></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });

    updatePagination();
    setupTradeButtons(); // ဒီနေရာမှာ ပြန်ခေါ်ပေးတာက အရေးကြီးပါတယ် (Table page ပြောင်းတိုင်း အလုပ်လုပ်ဖို့)
}


// ၁။ Buy/Sell ခလုတ်များအတွက် Event Listener ထည့်ခြင်း
document.querySelector('.sell').addEventListener('click', () => addTradeToHistory('Sell/Short'));

// ၃။ History Search လုပ်ဆောင်ချက် (ရိုက်လိုက်တာနဲ့ Filter လုပ်ပေးမည်)
document.getElementById('history-search').addEventListener('input', function(e) {
    const term = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#history-body tr');
    
    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(term) ? "" : "none";
    });
});

// ၁။ ထိပ်ဆုံးမှာ Variable တစ်ခု ထည့်ပေးပါ (BTC Price ကို ခြေရာခံရန်)


// ၂။ updateMarketPrices function ထဲမှာ BTC စျေးကို Order Book ဆီ ပို့ပေးမယ့် logic ထည့်ပါ
async function updateMarketPrices() {
    try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/price');
        const data = await response.json();
        const usdtPrices = data.filter(d => d.symbol.endsWith('USDT'));
        
        allPairs.forEach(pair => {
            const updated = usdtPrices.find(u => u.symbol === pair.symbol);
            if (updated) pair.lastPrice = updated.price;
        });

        // --- အသစ်ထည့်ရန် အပိုင်း ---
        // အကယ်၍ User က ဘာမှ မရွေးရသေးရင် BTC ရဲ့ Real Market Price ကို ယူမယ်
        if (!isPairSelected) {
            const btcData = usdtPrices.find(u => u.symbol === "BTCUSDT");
            if (btcData) {
                currentPrice = parseFloat(btcData.price);
            }
        }
        // ------------------------

        const rows = document.querySelectorAll('#market-body tr');
        const startIndex = (currentPage - 1) * itemsPerPage;
        const currentData = filteredPairs.slice(startIndex, startIndex + itemsPerPage);

        rows.forEach((row, index) => {
            if (currentData[index]) {
                const priceCell = row.querySelector('.price-cell');
                const newPrice = parseFloat(currentData[index].lastPrice).toLocaleString(undefined, { minimumFractionDigits: 2 });
                if (priceCell && priceCell.innerText !== newPrice) {
                    priceCell.innerText = newPrice;
                }
            }
        });
    } catch (e) { console.log("Price Update Error"); }
}

// ၁။ Coin Amount ရိုက်တဲ့အခါ USDT ကို တွက်ပေးခြင်း
document.getElementById('coin-amount').addEventListener('input', function() {
    const coinQty = parseFloat(this.value);
    const price = parseFloat(document.getElementById('order-price').value);
    
    if (!isNaN(coinQty) && price > 0) {
        const totalUsdt = coinQty * price;
        document.getElementById('order-amount').value = totalUsdt.toFixed(2);
    } else {
        document.getElementById('order-amount').value = "";
    }
});

// ၂။ USDT Amount ရိုက်တဲ့အခါ Coin အရေအတွက်ကို ပြန်တွက်ပေးခြင်း
document.getElementById('order-amount').addEventListener('input', function() {
    const usdtAmt = parseFloat(this.value);
    const price = parseFloat(document.getElementById('order-price').value);
    
    if (!isNaN(usdtAmt) && price > 0) {
        const coinQty = usdtAmt / price;
        document.getElementById('coin-amount').value = coinQty.toFixed(6);
    } else {
        document.getElementById('coin-amount').value = "";
    }
});

function addTradeToHistory(type) {
    const price = parseFloat(document.getElementById('order-price').value);
    const amount = parseFloat(document.getElementById('coin-amount').value) || 0;
    const totalUSDT = parseFloat(document.getElementById('order-amount').value) || 0;
    const side = type.toLowerCase().includes('buy') ? 'buy' : 'sell';

    if (amount <= 0 || totalUSDT <= 0) {
        showNotification("Please enter a valid amount!");
        return;
    }

    // ၁။ LocalStorage ထဲမှ Portfolio Data ကို လှမ်းယူခြင်း
    // Portfolio.html က သုံးတဲ့ key name က 'portfolio' ဖြစ်ရပါမယ်
    let currentPortfolio = JSON.parse(localStorage.getItem('portfolio')) || {};
    
    // ၂။ လက်ရှိ ရွေးချယ်ထားတဲ့ Coin Name (ဥပမာ- BTC, ETH)
    const coinSymbol = selectedCoinName; 

    // ၃။ ရောင်းချခြင်း (Sell) အတွက် စစ်ဆေးချက်
    if (side === 'sell') {
        // အရေးကြီးဆုံးအပိုင်း- Your Asset ထဲမှာ ရှိမရှိ နှင့် လက်ကျန် ရှိမရှိ စစ်ဆေးခြင်း
        if (!currentPortfolio.hasOwnProperty(coinSymbol) || currentPortfolio[coinSymbol] <= 0) {
    showNotification(`Your ${coinSymbol} balance is insufficient!`); 
    return;
}

        if (currentPortfolio[coinSymbol] < amount) {
            // လက်ကျန်ရှိသော်လည်း ရောင်းမည့်ပမာဏထက် နည်းနေလျှင်
            showNotification(`Your ${coinSymbol} Balance is insufficient!`);
            return;
        }

        // လက်ကျန်ရှိပါက နှုတ်ယူပြီး USDT ထဲပေါင်းမည်
        currentPortfolio[coinSymbol] -= amount;
        currentPortfolio["USDT"] = (currentPortfolio["USDT"] || 0) + totalUSDT;
    } 
    
    // ၄။ ဝယ်ယူခြင်း (Buy) အတွက် စစ်ဆေးချက်
    else if (side === 'buy') {
        if (!currentPortfolio["USDT"] || currentPortfolio["USDT"] < totalUSDT) {
            showNotification("Your USDT Balance is insufficient!");
            return;
        }
        currentPortfolio["USDT"] -= totalUSDT;
        currentPortfolio[coinSymbol] = (currentPortfolio[coinSymbol] || 0) + amount;
    }

    // --- ကျန်ရှိသည့် အပိုင်းများ (ပြောင်းလဲမှုမရှိပါ) ---
    const now = new Date();
    const dateTimeFormatted = `${now.toLocaleDateString()} ${now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    
    const tradeData = {
        date: dateTimeFormatted,
        asset: `${coinSymbol}/USDT`,
        side: side,
        price: price.toLocaleString(undefined, {minimumFractionDigits: 2}),
        amount: amount.toFixed(6),
        total: totalUSDT.toFixed(2)
    };

    let history = JSON.parse(localStorage.getItem('tradeHistory')) || [];
    history.unshift(tradeData);
    
    // LocalStorage ထဲသို့ အချက်အလက်များ ပြန်သိမ်းခြင်း
    localStorage.setItem('tradeHistory', JSON.stringify(history));
    localStorage.setItem('portfolio', JSON.stringify(currentPortfolio));
    
    if (typeof renderStoredHistory === "function") renderStoredHistory();
    if (typeof updateTopBalance === "function") updateTopBalance();
    

}

// USDT Amount ကို ကိုယ်တိုင်ရိုက်နေချိန်မှာလည်း Risk Amount ပါ လိုက်ပြောင်းစေရန်
document.getElementById('order-amount').addEventListener('input', function() {
    const activeRiskBox = document.querySelector('.r-box.active');
    const price = parseFloat(document.getElementById('order-price').value);
    const usdtAmt = parseFloat(this.value);

    // Coin Amount ကို အရင်ကအတိုင်း တွက်ချက်ပေးဆဲဖြစ်သည်
    if (!isNaN(usdtAmt) && price > 0) {
        document.getElementById('coin-amount').value = (usdtAmt / price).toFixed(6);
    }

    // Risk Amount ကိုပါ တစ်ခါတည်း update လုပ်ပေးခြင်း
    if (activeRiskBox && !isNaN(usdtAmt)) {
        const percentValue = parseFloat(activeRiskBox.getAttribute('data-val')) / 100;
        document.getElementById('risk-amount-input').value = (usdtAmt * percentValue).toFixed(2);
    }
});

// ၁။ TP/SL နှင့် Iceberg Toggle Logic
document.getElementById('tp-sl-check').addEventListener('change', function() {
    document.getElementById('tp-sl-fields').style.display = this.checked ? 'block' : 'none';
});

document.getElementById('iceberg-check').addEventListener('change', function() {
    document.getElementById('iceberg-fields').style.display = this.checked ? 'block' : 'none';
});

// ၂။ Trading Pair Search Dropdown Logic
document.getElementById('pair-search').addEventListener('input', function(e) {
    const term = e.target.value.toUpperCase();
    const results = allPairs.filter(p => p.symbol.includes(term)).slice(0, 10);
    const listDiv = document.getElementById('pair-list-results');
    
    listDiv.innerHTML = results.map(p => `
        <div class="pair-item" onclick="selectPair('${p.symbol}', ${p.lastPrice})">
            ${p.symbol.replace('USDT', '/USDT')}
        </div>
    `).join('');
});

function selectPair(symbol, price) {
    selectedCoinName = symbol.replace('USDT', '');
    selectedPairPrice = parseFloat(price);
    
    document.getElementById('current-pair-display').innerText = symbol.replace('USDT', '/USDT') + " ▾";
    document.getElementById('order-price').value = selectedPairPrice.toFixed(2);
    // Dropdown ပိတ်ရန်
    document.querySelector('.dropdown-content').classList.remove('show');
}

// Trading Pair Selector Logic
function updatePairList(searchTerm = "") {
    const listDiv = document.getElementById('pair-list-results');
    if (!listDiv) return;

    // Filter pairs based on search
    const filtered = allPairs.filter(p => p.symbol.includes(searchTerm.toUpperCase()));

    listDiv.innerHTML = filtered.map(p => `
        <div class="pair-item" onclick="selectPair('${p.symbol}', ${p.lastPrice})">
            <span>${p.symbol.replace('USDT', '/USDT')}</span>
            <span style="color: #848e9c; font-size: 11px;">${parseFloat(p.lastPrice).toFixed(2)}</span>
        </div>
    `).join('');
}

// Pair တစ်ခုကို ရွေးချယ်လိုက်သောအခါ
function selectPair(symbol, price) {
    selectedCoinName = symbol.replace('USDT', '');
    selectedPairPrice = parseFloat(price);
    
    // Display update (အဖြူရောင်စာသားဖြင့်ပြမည်)
    document.getElementById('current-pair-display').innerHTML = `<span style="color: white;">${symbol.replace('USDT', '/USDT')}</span>`;
    document.getElementById('order-price').value = selectedPairPrice.toFixed(2);
    
    // Dropdown ကို ခေတ္တပိတ်ရန် (CSS hover ကြောင့် အလိုလိုပိတ်မည် သို့မဟုတ် class ဖယ်နိုင်သည်)
    document.getElementById('pair-search').value = "";
    updatePairList(); // list ကို reset လုပ်ထားရန်
}

// အစပိုင်းတွင် Pair အားလုံးကို Load လုပ်ထားရန် (fetch ပြီးချိန်တွင် ခေါ်ပေးပါ)
// fetchFullMarketData function ရဲ့ အဆုံးမှာ updatePairList(); ကို ထည့်ထားပေးပါ။

// Dropdown Toggle လုပ်ခြင်း
const pairDropdownBtn = document.getElementById('pair-dropdown-btn');
const dropdownWrapper = document.querySelector('.dropdown');

pairDropdownBtn.addEventListener('click', function() {
    dropdownWrapper.classList.toggle('active');
    if (dropdownWrapper.classList.contains('active')) {
        updatePairList(""); // Dropdown ပွင့်တာနဲ့ အားလုံးကို ပြမယ်
        document.getElementById('pair-search').focus();
    }
});

// Pair List ကို Update လုပ်ပေးတဲ့ Function
function updatePairList(searchTerm = "") {
    const listDiv = document.getElementById('pair-list-results');
    if (!listDiv) return;

    const filtered = allPairs.filter(p => p.symbol.includes(searchTerm.toUpperCase()));

    listDiv.innerHTML = filtered.map(p => {
        const change = parseFloat(p.priceChangePercent).toFixed(2);
        return `
            <div class="pair-item" onclick="selectPair('${p.symbol}', ${p.lastPrice}, '${change}')">
                <span>${p.symbol.replace('USDT', '/USDT')}</span>
                <span style="color: ${change >= 0 ? '#00ffad' : '#ff3b3b'}">${change >= 0 ? '+' : ''}${change}%</span>
            </div>
        `;
    }).join('');
}

// Search Box မှာ ရိုက်တဲ့အခါ Filter လုပ်ခြင်း
document.getElementById('pair-search').addEventListener('input', function(e) {
    updatePairList(e.target.value);
});

// Pair တစ်ခုကို ရွေးချယ်လိုက်တဲ့အခါ
function selectPair(symbol, price, change) {
    selectedCoinName = symbol.replace('USDT', '');
    selectedPairPrice = parseFloat(price);
    
    // Display Update
    document.getElementById('current-pair-name').innerText = symbol.replace('USDT', '/USDT');
    const changeSpan = document.getElementById('current-pair-change');
    changeSpan.innerText = (change >= 0 ? '+' : '') + change + '%';
    changeSpan.style.color = change >= 0 ? '#00ffad' : '#ff3b3b'; // User တောင်းဆိုချက်အရ Change ကို အရောင်ပြောင်းပေးခြင်း
    
    document.getElementById('order-price').value = selectedPairPrice.toFixed(2);
    
    // Dropdown ပိတ်ရန်
    dropdownWrapper.classList.remove('active');
    document.getElementById('pair-search').value = "";
}


// ၁။ Pair တစ်ခုကို ရွေးချယ်လိုက်တဲ့အခါ လုပ်ဆောင်မယ့် Function ကို ပြင်ဆင်ခြင်း
// Pair တစ်ခုကို ရွေးချယ်လိုက်တဲ့အခါ လုပ်ဆောင်မယ့် Function
function selectPair(symbol, price, change) {
    selectedCoinName = symbol.replace('USDT', '');
    selectedPairPrice = parseFloat(price);
    currentPrice = selectedPairPrice; // Order Book စျေးနှုန်းကိုပါ ပြောင်းလဲရန်
    isPairSelected = true; // User က pair ရွေးထားကြောင်း သတ်မှတ်

    // --- UI Update: Pair Display ---
    document.getElementById('current-pair-name').innerText = symbol.replace('USDT', '/USDT');
    const changeSpan = document.getElementById('current-pair-change');
    changeSpan.innerText = (change >= 0 ? '+' : '') + change + '%';
    changeSpan.style.color = change >= 0 ? '#00ffad' : '#ff3b3b';

    // --- UI Update: Order Form ---
    document.getElementById('order-price').value = selectedPairPrice.toFixed(2);
    document.getElementById('selected-coin-symbol').innerText = selectedCoinName;
    
    // Amount တွေကို Reset လုပ်ပေးခြင်း (Pair အသစ်အတွက်)
    document.getElementById('coin-amount').value = "";
    document.getElementById('order-amount').value = "";
    document.getElementById('risk-amount-input').value = "0.00";

    // --- UI Update: Dropdown ပိတ်ရန် (ဒီအပိုင်းကို ပြင်ဆင်ထားပါသည်) ---
    const dropdownWrapper = document.querySelector('.dropdown');
    if (dropdownWrapper) {
        dropdownWrapper.classList.remove('active');
    }
    
    // Search Box ကို Reset လုပ်ခြင်း
    const pairSearchInput = document.getElementById('pair-search');
    if (pairSearchInput) {
        pairSearchInput.value = "";
    }

    // --- Order Book ကို ချက်ချင်း Update လုပ်ရန် ---
    updateOrderBook(); 
}

// ၂။ Trade Button (Market Overview ထဲက ခလုတ်) အတွက်လည်း ထိုနည်းအတိုင်း ချိတ်ဆက်ပေးရန်
function setupTradeButtons() {
    document.querySelectorAll('.trade-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const pairNameFull = row.querySelector('.pair-name').innerText; // BTC
            const symbol = pairNameFull + "USDT";
            const pairPrice = parseFloat(row.querySelector('.price-cell').innerText.replace(/,/g, ''));
            
            // 24h Change ကို Table ထဲမှ ရယူရန်
            const changeText = row.querySelector('td:nth-child(3)').innerText.replace('%', '');
            
            // အပေါ်က selectPair function ကိုပဲ ပြန်သုံးပြီး UI အားလုံး update လုပ်မယ်
            selectPair(symbol, pairPrice, changeText);

            // Form ဆီသို့ Scroll ဆင်းပေးခြင်း
            document.querySelector('.trading-tools').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// ၃။ updateOrderBook function ထဲမှာ currentPrice အတိုင်း real-time ပြောင်းနေဖို့
function updateOrderBook() {
    const askContainer = document.getElementById('asks');
    const bidContainer = document.getElementById('bids');
    if (!askContainer || !bidContainer) return;

    // စျေးနှုန်း အနည်းငယ် လှုပ်ခတ်နေစေရန်
    let volatility = (Math.random() - 0.5) * (currentPrice * 0.0005); 
    currentPrice += volatility;

    document.getElementById('mid-price').innerText = currentPrice.toLocaleString(undefined, {minimumFractionDigits: 2});
    
    // Input Box ထဲမှာ စျေးနှုန်းကို User က ကိုယ်တိုင် ရိုက်မနေမှသာ Auto-update လုပ်မယ်
    if(document.activeElement.id !== "order-price") {
        document.getElementById('order-price').value = currentPrice.toFixed(2);
    }

    let askHTML = ''; let bidHTML = '';
    // စျေးနှုန်းအလိုက် Order Book list ကို ပြောင်းလဲခြင်း
    for (let i = 6; i >= 1; i--) {
        askHTML += `<div class="row red"><span>${(currentPrice + i * (currentPrice * 0.0001)).toFixed(2)}</span><span>${(Math.random() * 2).toFixed(3)}</span></div>`;
    }
    for (let i = 1; i <= 6; i++) {
        bidHTML += `<div class="row green"><span>${(currentPrice - i * (currentPrice * 0.0001)).toFixed(2)}</span><span>${(Math.random() * 2).toFixed(3)}</span></div>`;
    }
    askContainer.innerHTML = askHTML;
    bidContainer.innerHTML = bidHTML;
}


// ၂။ Trade History Logic ပြင်ဆင်ခြင်း
function updateTradeHistoryTable() {
    const tbody = document.getElementById('trade-history-body'); 
    if (!tbody) return;
    tbody.innerHTML = "";
    
    // Filter to only show Buy and Sell sides
    const displayTrades = tradeHistory.filter(trade => 
        trade.side.toLowerCase() === 'buy' || trade.side.toLowerCase() === 'sell'
    ).slice().reverse(); 

    displayTrades.forEach(trade => {
        const row = `<tr>
            <td>${trade.time}</td>
            <td>${trade.pair}</td>
            <td>${trade.type}</td>
            <td class="${trade.side.toLowerCase() === 'buy' ? 'text-green-400' : 'text-red-400'}">${trade.side}</td>
            <td>${trade.price}</td>
            <td>${trade.riskAmount || '0.00'}</td> 
            <td style="color: #00ffad;">Success</td> 
        </tr>`;
        tbody.innerHTML += row;
    });
}

// ၃။ Hide Button နှိပ်တဲ့အခါ History 5 ခု ပြန်ပေါ်လာစေရန်
document.querySelector('.hide-btn').addEventListener('click', function() {
    // လက်ရှိ Table Body ကို Clear လုပ်ပြီး ၅ ခု ပြန်ဖြည့်မယ်
    updateTradeHistoryTable();
    alert("Showing last 5 history records.");
});

// futuretrades.js ထဲက handleOrderTypeChange ကို ဒီအတိုင်း အစားထိုးကြည့်ပါ
function handleOrderTypeChange() {
    const typeSelect = document.getElementById('order-type-select');
    if (!typeSelect) return;

    const type = typeSelect.value;
    const container = document.getElementById('dynamic-inputs-container');
    const priceRow = document.getElementById('price-input-row');
    
    // selectedCoinName မရှိခဲ့ရင် 'BTC' လို့ default ထားမယ်
    const coinSymbol = (typeof selectedCoinName !== 'undefined' && selectedCoinName) ? selectedCoinName : "BTC";
    
    if (!container) return;

    container.innerHTML = ""; // အဟောင်းတွေကို အရင်ဖျက်မယ်
    if (priceRow) priceRow.style.display = "flex"; // Price box ကို ပုံမှန်အတိုင်း ပြထားမယ်

    switch (type) {
        case "Market":
            if (priceRow) priceRow.style.display = "none";
            break;
        case "Stop Limit":
            container.innerHTML = `
                <div class="input-row"><label>Stop</label><input type="text" placeholder="Stop (USDT)"></div>
                <div class="input-row"><label>Limit</label><input type="text" placeholder="Limit (USDT)"></div>
            `;
            break;
        case "Stop Market":
            container.innerHTML = `<div class="input-row"><label>Stop</label><input type="text" placeholder="Stop (USDT)"></div>`;
            break;
        case "Trailing Stop":
            container.innerHTML = `
                <div class="input-row"><label>T/D (%)</label><input type="text" id="td-input-box" placeholder="Trailing Delta"></div>
                <div class="risk-boxes">
                    <div class="r-box" onclick="document.getElementById('td-input-box').value='0.5%'">0.5%</div>
                    <div class="r-box" onclick="document.getElementById('td-input-box').value='1%'">1%</div>
                    <div class="r-box" onclick="document.getElementById('td-input-box').value='1.5%'">1.5%</div>
                    <div class="r-box" onclick="document.getElementById('td-input-box').value='2%'">2%</div>
                    <div class="r-box" onclick="document.getElementById('td-input-box').value='5%'">5%</div>
                    
                </div>
            `;
            break;
        case "OCO":
            container.innerHTML = `
                <div class="input-row"><label>TP Limit</label><input type="text" placeholder="TP Limit (USDT)"></div>
                <div class="input-row"><label>SL Trigger</label><input type="text" placeholder="SL Trigger (USDT)"></div>
                <div class="input-row"><label>SL Limit</label><input type="text" placeholder="SL Limit"></div>
            `;
            break;
        case "TWAP":
    container.innerHTML = `
        <div class="input-row"><label>Total Size</label><input type="text" id="twap-total-size" placeholder="Total Size"></div>
        <div class="risk-boxes">
            <div class="r-box twap-asset-btn active" onclick="selectTwapAsset(this)">${coinSymbol}</div>
            <div class="r-box twap-asset-btn" onclick="selectTwapAsset(this)">USDT</div>
        </div>
        <div class="input-row"><label>Total Time</label><input type="text" id="twap-total-time" placeholder="Total Time"></div>
        <div class="risk-boxes">
            <div class="r-box time-btn" onclick="selectTwapTime(this, '30m')">30m</div>
            <div class="r-box time-btn" onclick="selectTwapTime(this, '1h')">1h</div>
            <div class="r-box time-btn" onclick="selectTwapTime(this, '6h')">6h</div>
            <div class="r-box time-btn" onclick="selectTwapTime(this, '12h')">12h</div>
        </div>
        <div class="choice-item" style="margin: 10px 0;">
            <input type="checkbox" id="optional-param-check" onchange="toggleOptionalParams()">
            <label for="optional-param-check" style="cursor:pointer">Optional Parameters</label>
        </div>
        <div id="optional-params-fields" style="display: none; border-left: 2px; padding-left: 10px;">
            <div class="input-row"><label>Delay</label><input type="text" placeholder="Delay Start Time"></div>
            <div class="input-row"><label>Limit</label><input type="text" placeholder="Limit Price (USDT)"></div>
        </div>
    `;
    break;    }
}

// ၃။ Buy/Sell နှိပ်လျှင် Trade History ထဲသို့ ထည့်ရန်
// Buy/Sell နှိပ်လျှင် Trade History ထဲသို့ ထည့်ရန်နှင့် Balance စစ်ဆေးရန်
function executeTrade(side) {
    const type = document.getElementById('order-type-select').value;
    const pair = (typeof selectedCoinName !== 'undefined' && selectedCoinName) ? selectedCoinName + "/USDT" : "BTC/USDT";
    const price = document.getElementById('order-price').value || currentPrice;
    
    // User ရိုက်ထည့်လိုက်သော USDT ပမာဏ (Total) ကို ယူပါ
    const orderAmountUSDT = parseFloat(document.getElementById('order-amount').value);
    const coinAmount = document.getElementById('coin-amount').value || "0.00";
    
    // ၁။ ပမာဏ ရိုက်ထည့်ခြင်း ရှိမရှိ စစ်ဆေးခြင်း
    if (isNaN(orderAmountUSDT) || orderAmountUSDT <= 0) {
        return;
    }

    // ၂။ လက်ရှိ Balance နှင့် တိုက်စစ်ခြင်း
    // portfolio["USDT"] သည် ထိပ်ဆုံးတွင် ကြေညာထားသော လက်ကျန်ငွေ ဖြစ်သည်
    const currentBalance = portfolio["USDT"] || 0;

    if (orderAmountUSDT > currentBalance) {
        // alert အစား Notification function ကို သုံးလိုက်ပါ
        return; 
    }

    // ၄။ Trade History ထဲသို့ ထည့်ခြင်း
    const now = new Date();
    const dateTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second: '2-digit'})}`;

    const newTrade = {
        time: dateTime,
        pair: pair,
        type: type,
        side: side,
        price: price,
        riskAmount: coinAmount, // Coin အရေအတွက်
        status: "Success"
        
    };

    tradeHistory.push(newTrade);
    localStorage.setItem('tradeHistory', JSON.stringify(tradeHistory)); 
    updateTradeHistoryTable();
    
    // ကုန်သွယ်မှု အောင်မြင်သည့် နေရာတွင် alert အစား အောက်ပါအတိုင်း ပြောင်းပါ
    showNotification1(`Your trade was successful!`);
}

// HTML ထဲက Button တွေနဲ့ ချိတ်ဆက်ရန် (ဒါကို window.onload ထဲမှာ ထည့်ထားပါ)
document.querySelector('.action-btns .buy').onclick = () => executeTrade('Buy');
document.querySelector('.action-btns .sell').onclick = () => executeTrade('Sell');

// ၁။ TWAP Asset (BTC/USDT) Select လုပ်ရန်
function selectTwapAsset(element) {
    // ၎င်း box ထဲမှာရှိတဲ့ asset button အားလုံးကို active ဖြုတ်မယ်
    const parent = element.parentElement;
    parent.querySelectorAll('.r-box').forEach(btn => btn.classList.remove('active'));
    // နှိပ်လိုက်တဲ့ button ကို active လုပ်မယ်
    element.classList.add('active');
}

// ၂။ TWAP Time Select လုပ်ရန်
function selectTwapTime(element, time) {
    const parent = element.parentElement;
    parent.querySelectorAll('.r-box').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
    
    // Total Time input ထဲကို တန်ဖိုးထည့်မယ်
    const timeInput = document.getElementById('twap-total-time');
    if(timeInput) timeInput.value = time;
}

// ၃။ Optional Parameters Toggle (ID ကို သေချာစစ်ပါ)
function toggleOptionalParams() {
    const checkbox = document.getElementById('optional-param-check');
    const fields = document.getElementById('optional-params-fields');
    if (checkbox && fields) {
        fields.style.display = checkbox.checked ? "block" : "none";
    }
}

// အပြင်ဘက်ကို နှိပ်ရင် Dropdown ပိတ်ရန်
window.addEventListener('click', function(e) {
    if (!dropdownWrapper.contains(e.target)) {
        dropdownWrapper.classList.remove('active');
    }
});

//
function openFuturesModal() {
    document.getElementById('futures-modal').style.display = 'flex';
}

function closeFuturesModal() {
    document.getElementById('futures-modal').style.display = 'none';
}

function closeModalOnOutsideClick(event) {
    const modal = document.getElementById('futures-modal');
    if (event.target === modal) {
        closeFuturesModal();
    }
}

function checkAgreements() {
    const agreeRules = document.getElementById('agree-rules').checked;
    const agreeRisks = document.getElementById('agree-risks').checked;
    const openBtn = document.getElementById('open-now-btn');

    if (agreeRules && agreeRisks) {
        openBtn.disabled = false;
        openBtn.classList.remove('open-now-disabled');
        openBtn.classList.add('open-now-active');
    } else {
        openBtn.disabled = true;
        openBtn.classList.remove('open-now-active');
        openBtn.classList.add('open-now-disabled');
    }
}


// Market Overview ကို အဖွင့်အပိတ်လုပ်မည့် Function
function toggleMarketOverview() {
    const marketSection = document.getElementById('market-overview-section');
    const dropdownIcon = document.getElementById('dropdown-icon');
    const mainDropdownIcon = document.getElementById('main-dropdown-icon');

    if (marketSection.style.display === "none") {
        marketSection.style.display = "block";
        dropdownIcon.classList.add('rotated');
        if(mainDropdownIcon) mainDropdownIcon.classList.add('rotated');
    } else {
        marketSection.style.display = "none";
        dropdownIcon.classList.remove('rotated');
        if(mainDropdownIcon) mainDropdownIcon.classList.remove('rotated');
    }
}

// Search Box ဘေးက Icon ကို နှိပ်ရင်လည်း အလုပ်လုပ်စေရန်
document.getElementById('market-toggle-btn').addEventListener('click', toggleMarketOverview);

// Function to handle Profile Dropdown
function toggleProfileDropdown(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('profile-dropdown');
    dropdown.classList.toggle('hidden');
}

// Delivery Selection Function
function selectDelivery(element, time, profit) {
    // အရင် active ဖြစ်နေတဲ့ item ထဲက active class ကို ဖြုတ်မယ်
    document.querySelectorAll('.delivery-item').forEach(item => {
        item.classList.remove('active');
    });

    // အခုနှိပ်လိုက်တဲ့ item ကို active class ထည့်မယ် (နှစ်ခုစလုံးကို select လုပ်ပြီးသားဖြစ်သွားမယ်)
    element.classList.add('active');

    // လိုအပ်ရင် တန်ဖိုးတွေကို variable ထဲ သိမ်းထားနိုင်ပါတယ်
    document.getElementById('selected-delivery-time').value = time;
    document.getElementById('selected-delivery-profit').value = profit;

    console.log(`Selected: Time=${time}, Profit=${profit}`);
}

function renderStoredHistory() {
    const tbody = document.getElementById('history-body');
    if (!tbody) return;
    
    tbody.innerHTML = "";
    // မူလ data ကို localStorage ကနေ ဒီအတိုင်း ခေါ်ယူထားမယ် (ဘာမှ မပြင်ပါ)
    let history = JSON.parse(localStorage.getItem('tradeHistory')) || [];

    // Table ထဲ ထည့်ခါနီးမှ Buy နဲ့ Sell သာပါဝင်အောင် display အတွက်ပဲ filter လုပ်မယ်
    history.forEach(trade => {
        const sideValue = trade.side ? trade.side.toLowerCase() : "";
        
        // Buy, Sell, Long, Short စတဲ့ စကားလုံးတွေ ပါမှသာ Table Row ကို ဆောက်မယ်
        if (sideValue.includes('buy') || sideValue.includes('sell') || 
            sideValue.includes('long') || sideValue.includes('short')) {
            
            const row = `
                <tr>
                    <td>${trade.date}</td>
                    <td>${trade.asset}</td>
                    <td class="${(sideValue.includes('buy') || sideValue.includes('long')) ? 'up' : 'red'}">
                        ${trade.side.toUpperCase()}
                    </td>
                    <td>${trade.price}</td>
                    <td>${trade.amount}</td>
                    <td>${trade.total}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        }
        // Deposit, Withdraw, Transfer စတာတွေဆိုရင် ဒီ Loop ထဲမှာ ဘာမှမလုပ်ဘဲ ကျော်သွားပါလိမ့်မယ်
    });
}

function updateTopBalance() {
    // Portfolio ထဲရှိ asset အားလုံး၏ စုစုပေါင်းတန်ဖိုး (Net Worth) ကို တွက်ချက်ခြင်း သို့မဟုတ် 
    // USDT လက်ကျန်ကိုသာ ပြလိုပါက အောက်ပါအတိုင်း သုံးနိုင်သည်
    const usdtBalance = portfolio["USDT"] || 0;
    const formattedBalance = usdtBalance.toLocaleString(undefined, {minimumFractionDigits: 2});

    document.querySelectorAll('#wallet-balance').forEach(el => {
        el.innerText = formattedBalance;
    });
}

function showNotification(message) {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = 'float-notification';
    notification.innerText = message;

    container.appendChild(notification);

    // ၃ စက္ကန့်ပြည့်ရင် HTML ထဲကနေ လုံးဝဖျက်ထုတ်မယ်
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function showNotification1(message) {
    const container = document.getElementById('notification-container1');
    const notification = document.createElement('div');
    notification.className = 'float-notification1';
    notification.innerText = message;

    container.appendChild(notification);

    // ၃ စက္ကန့်ပြည့်လျှင် HTML ထဲမှ ဖျက်ထုတ်မည်
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// futuretrades.js ရဲ့ အောက်ဆုံးမှာ ထည့်ပါ
function applyMaxAmount() {
    // ၁။ လက်ရှိ ရွေးထားတဲ့ Coin Symbol ကို Label ကနေ ယူမယ် (ဥပမာ- BTC)
    const coinSymbol = document.getElementById('selected-coin-symbol').innerText;
    
    // ၂။ portfolio object ထဲမှာ အဲ့ဒီ coin ရှိမရှိ စစ်မယ်၊ မရှိရင် 0 လို့ ယူမယ်
    // ဒီနေရာမှာ portfolio object က မူရင်းအတိုင်းပဲ ရှိနေရပါမယ်
    const balance = (typeof portfolio !== 'undefined' && portfolio[coinSymbol]) ? portfolio[coinSymbol] : 0;
    
    // ၃။ Input Box ထဲကို အရေအတွက် ထည့်ပေးမယ်
    const amountInput = document.getElementById('coin-amount');
    if (amountInput) {
        amountInput.value = balance;
        
        // ၄။ Total USDT တွက်ချက်မှုရှိရင် အလုပ်လုပ်အောင် event ပေးပို့မယ်
        amountInput.dispatchEvent(new Event('input'));
    }
}

// --- Checkout Modal မပွင့်ခင် Balance အရင်စစ်ဆေးသည့် Logic ---
function openCheckout() {
    const coinQty = document.getElementById('coin-amount').value;
    const totalUsdt = document.getElementById('order-amount').value;
    const coinName = selectedCoinName;

    // ၁။ ပမာဏ ရိုက်ထည့်ခြင်း ရှိမရှိ အရင်စစ်ဆေးခြင်း
    if (!coinQty || coinQty <= 0) {
        showNotification("Please enter a valid amount!");
        return;
    }

    // ၂။ လက်ရှိ Wallet Balance ကို Portfolio ထဲမှ စစ်ဆေးခြင်း
    // (မှတ်ချက် - portfolio object သည် global variable အဖြစ် ကြေညာထားပြီးသားဖြစ်ရမည်)
    let currentPortfolio = JSON.parse(localStorage.getItem('portfolio')) || { "USDT": 0 };
    let availableUSDT = parseFloat(currentPortfolio["USDT"]) || 0;
    let requiredUSDT = parseFloat(totalUsdt);

    // ၃။ အရေးကြီးဆုံးအချက်- Balance မလုံလောက်လျှင် Notification ပြပြီး ဒီမှာတင် ရပ်တန့်မည်
    if (availableUSDT < requiredUSDT) {
        showNotification("Your Balance is insufficient!"); // Float notification ပြသခြင်း
        return; // Checkout Modal ကို ဆက်မဖွင့်တော့ပါ
    }

    // ၄။ Balance လုံလောက်မှသာ Checkout Modal ကို ပြသမည်
    document.getElementById('checkout-coin-name').innerText = `${coinName}/USDT`;
    document.getElementById('checkout-coin-qty').innerText = coinQty;
    document.getElementById('checkout-total-usdt').innerText = `${totalUsdt} USDT`;
    
    document.getElementById('checkout-modal').classList.remove('hidden');
}

// ၃။ Checkout Modal ပိတ်ခြင်း
function closeCheckout() {
    document.getElementById('checkout-modal').classList.add('hidden');
    document.getElementById('payment-options').classList.add('hidden');
}

// ၄။ Payment Methods ရွေးချယ်မှု ပြသခြင်း
function togglePaymentMethods() {
    const options = document.getElementById('payment-options');
    options.classList.toggle('hidden');
}

function selectPayment(type, name) {
    selectedWalletType = type; // Global variable ကို update လုပ်မယ်
    document.getElementById('payment-name').innerText = name;
    togglePaymentMethods();
}

function confirmCheckoutTrade() {
    // ၁။ Trade ကို တစ်ကြိမ်ပဲ လုပ်ဆောင်ရန် ခေါ်ယူခြင်း
    if (typeof addTradeToHistory === "function") {
        addTradeToHistory('Buy/Long');
    } else {
        // အကယ်၍ addTradeToHistory မရှိလျှင် executetrade logic ကို ဒီမှာ တိုက်ရိုက်ထည့်ပါ
        console.log("Executing trade...");
    }

    // ၂။ ဒေတာနှစ်ခါ မဝင်စေရန် modal ကို ချက်ချင်းပိတ်ခြင်း
    closeCheckout();
    
    // ၃။ Notification ပြခြင်း
    if (typeof showNotification1 === "function") {
        showNotification1("Trade Executed Successfully!");
    }
}