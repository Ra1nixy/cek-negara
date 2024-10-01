document.getElementById('searchBtn').addEventListener('click', function() {
    const countryName = document.getElementById('countryInput').value.trim();
    const countryInfo = document.getElementById('countryInfo');
  
    if (countryName === '') {
      alert('Please enter a country name');
      return;
    }
  
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then(response => response.json())
      .then(data => {
        if (data.status === 404) {
          countryInfo.innerHTML = '<p class="text-center text-danger">Country not found.</p>';
          return;
        }
  
        const country = data[0];
        countryInfo.innerHTML = `
          <div class="col-md-8 country-card">
            <div class="row">
              <div class="col-md-6">
                <img src="${country.flags.png}" alt="${country.name.common} flag">
              </div>
              <div class="col-md-6 country-details">
                <h2>${country.name.common}</h2>
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Subregion:</strong> ${country.subregion}</p>
                <p><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
                <p><strong>Currency:</strong> ${Object.keys(country.currencies).map(key => country.currencies[key].name).join(', ')}</p>
              </div>
            </div>
          </div>
        `;
      })
      .catch(error => {
        countryInfo.innerHTML = '<p class="text-center text-danger">Error fetching data. Please try again later.</p>';
      });
  });
  