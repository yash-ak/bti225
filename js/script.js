document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contact-form");
    
    form.addEventListener("submit", function(event) {
      let isValid = true;
      
      // Clear previous error messages
      const errorMessages = form.querySelectorAll(".error-message");
      errorMessages.forEach(message => message.textContent = "");
      
      // Validation for First Name and Last Name fields
      const firstNameInput = form.querySelector("#first-name");
      const lastNameInput = form.querySelector("#last-name");
      const nameRegex = /^[a-zA-Z .]+$/;
      if (!nameRegex.test(firstNameInput.value)) {
        isValid = false;
        displayErrorMessage(firstNameInput, "Please enter a valid first name.");
      }
      if (!nameRegex.test(lastNameInput.value)) {
        isValid = false;
        displayErrorMessage(lastNameInput, "Please enter a valid last name.");
      }
      
      // Validation for ZIP/Postal Code based on selected Country
      const countrySelect = form.querySelector("#country");
      const zipCodeInput = form.querySelector("#zip-code");
      if (countrySelect.value === "ca" && !isValidCanadianPostalCode(zipCodeInput.value)) {
        isValid = false;
        displayErrorMessage(zipCodeInput, "Please enter a valid Canadian postal code.");
      }
      
      // Validation for Phone field
      const phoneInput = form.querySelector("#phone");
      const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
      if (phoneInput.value && !phoneRegex.test(phoneInput.value)) {
        isValid = false;
        displayErrorMessage(phoneInput, "Please enter a valid phone number (e.g., (123) 456-7890).");
      }
      
      if (!isValid) {
        event.preventDefault();
      }
    });
    
    function displayErrorMessage(input, message) {
      const errorMessage = document.createElement("p");
      errorMessage.classList.add("error-message");
      errorMessage.textContent = message;
      input.parentNode.appendChild(errorMessage);
    }
    
    function isValidCanadianPostalCode(postalCode) {
      const postalCodeRegex = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
      return postalCodeRegex.test(postalCode);
    }
  });
  
  
  const url = "https://restcountries.com/v3.1/independent?status=true";

fetch(url)
  .then(response => response.json())
  .then(data => {
    const countriesTable = document.getElementById("countries-table");
    const countries = data.map(country => country.name.common);
    
    const tableRows = countries.map(country => `<tr><td>${country}</td></tr>`).join("");
    countriesTable.innerHTML = tableRows;
  })
  .catch(error => console.error("Error fetching data:", error));
