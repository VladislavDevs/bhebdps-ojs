(function() {
    const requestUrl = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';
    
    const loader = document.getElementById('loader');
    const itemsContainer = document.getElementById('items');

    function setLoaderActive(isActive) {
        if (isActive) {
            loader.classList.add('loader_active');
        } else {
            loader.classList.remove('loader_active');
        }
    }
    
    function createCurrencyItem(charCode, value) {
        const item = document.createElement('div');
        item.className = 'item';
        
        const codeDiv = document.createElement('div');
        codeDiv.className = 'item__code';
        codeDiv.textContent = charCode;
        
        const valueDiv = document.createElement('div');
        valueDiv.className = 'item__value';
        valueDiv.textContent = value;
        
        const currencyDiv = document.createElement('div');
        currencyDiv.className = 'item__currency';
        currencyDiv.textContent = 'руб.';
        
        item.appendChild(codeDiv);
        item.appendChild(valueDiv);
        item.appendChild(currencyDiv);
        
        return item;
    }
    
    function displayCurrencies(valuteData) {
        itemsContainer.innerHTML = '';
        
        for (const currencyCode in valuteData) {
            const currency = valuteData[currencyCode];
            const charCode = currency.CharCode;
            const value = currency.Value;
            
            const currencyItem = createCurrencyItem(charCode, value);
            itemsContainer.appendChild(currencyItem);
        }
    }
    
    async function fetchExchangeRates() {
        try {
            setLoaderActive(true);
            
            const response = await fetch(requestUrl);
            
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data && data.response && data.response.Valute) {
                displayCurrencies(data.response.Valute);
            } else {
                throw new Error('Неверный формат данных от сервера');
            }
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
            itemsContainer.innerHTML = '<div class="error">Не удалось загрузить курсы валют. Попробуйте позже.</div>';
        } finally {
            setLoaderActive(false);
        }
    }

    fetchExchangeRates();
})();