// Search space elements
const searchInput = document.getElementById('search_input');
const searchButton = document.getElementById('search_btn');

// Data space elements
const flag = document.getElementById('flag');
const country = document.getElementById('country');
const officialName = document.getElementById('official_name');
const capital = document.getElementById('capital');
const continent = document.getElementById('continent');
const population = document.getElementById('population');
const currency = document.getElementById('currency');
const currencyShort = document.getElementById('currency_short');
const symbol = document.getElementById('symbol');
const language = document.getElementById('language');

// Searching
searchButton.addEventListener('click', function() {
    if (searchInput.value === '') {
        document.getElementById('data').style.display = 'none';
        return;
    }
    const countryName = searchInput.value;
    const url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    searchInput.value = '';

    async function getAndSetCountryObject(url){
        try{
            const response = await fetch(url);
            const data = await response.json();
            let countryObject = await data[0];
            document.getElementById('data').style.display = 'block';
            flag.src = countryObject.flags.png;
            country.innerHTML = countryObject.name.common;
            officialName.innerHTML = countryObject.name.official;
            capital.innerHTML = countryObject.capital;
            continent.innerHTML = countryObject.continents;
            population.innerHTML = countryObject.population;
            currency.innerHTML = Object.values(countryObject.currencies)[0].name;
            currencyShort.innerHTML = Object.keys(countryObject.currencies)[0];
            symbol.innerHTML = Object.values(countryObject.currencies)[0].symbol;
            language.innerHTML = Object.values(countryObject.languages);
        }catch(error){
            alert(error.message);
            document.getElementById('data').style.display = 'none';
        }
    }

    getAndSetCountryObject(url)
})