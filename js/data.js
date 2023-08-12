document.addEventListener("DOMContentLoaded", function() {
    const countryTable = document.getElementById("country-table");
  
    fetch("https://restcountries.com/v3.1/independent?status=true")
      .then(response => response.json())
      .then(data => {
        const countries = data.map((country, index) => ({
          number: index + 1,
          name: country.name.common || "N/A",
          flag: country.flags.svg || "N/A",
          coatOfArms: country.coatOfArms || "N/A",
          nativeName: country.name.official || "N/A",
          capital: country.capital || "N/A",
          region: country.region || "N/A"
        }));
  
        const tableMarkup = generateTableMarkup(countries);
        countryTable.innerHTML = tableMarkup;
      })
      .catch(error => {
        countryTable.innerHTML = "<p>Error fetching data.</p>";
        console.error("Error fetching data:", error);
      });
  
    function generateTableMarkup(countries) {
      return `
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Flag</th>
              <th>Coat of Arms</th>
              <th>Native Name</th>
              <th>Capital</th>
              <th>Region</th>
            </tr>
          </thead>
          <tbody>
            ${countries.map(country => `
              <tr>
                <td>${country.number}</td>
                <td>${country.name}</td>
                <td><img src="${country.flag}" alt="${country.name} Flag" width="30"></td>
                <td><img src="${country.coatOfArms.png}" alt="${country.name} Flag" width="30"></td>
                <td>${country.nativeName}</td>
                <td>${country.capital}</td>
                <td>${country.region}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    }
  });
  