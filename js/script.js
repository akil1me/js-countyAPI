// Add form and input
let elCountForm = document.querySelector('.country__form');
let elCountInput = elCountForm.querySelector(".country__input");

// Add  Search result count
let elCountList = document.querySelector(".country__list");

// Add template
let elTemplate = document.querySelector("#country__temlate").content;

// Add spinner 
let elSpinner = document.querySelector(".country__spinner");

// Render counrtries
function renderCountry(datum) {
  elCountList.innerHTML = null;

  let elFragmentWrapper = document.createDocumentFragment();
  datum.forEach(data => {
    let newDocFragment = elTemplate.cloneNode(true);
    let itemClone = newDocFragment.querySelector(".country__item");

    itemClone.querySelector(".country__img").src = data.flags.png;
    itemClone.querySelector(".country__img").href = data.name.common;

    itemClone.querySelector(".country__title").textContent = data.name.common;

    itemClone.querySelector(".country__population").innerHTML = `<srtong class="fw-bold">Population:</srtong> ${data.population.toLocaleString('de-DE')}`;

    itemClone.querySelector(".country__area").innerHTML = `<srtong class="fw-bold">Area:</srtong> ${data.area.toLocaleString('de-DE')}`;

    itemClone.querySelector(".country__valute").innerHTML = `<srtong class="fw-bold">Valute:</srtong> ${valute(data.currencies)}`;

    elFragmentWrapper.append(itemClone);
  })

  elCountList.append(elFragmentWrapper);
}

function valute(data) {
  for (let a in data) {
    for (let b in data[a]) {
      return data[a][b];
    }
  }
}

function error(err) {
  elCountList.innerHTML = null;
  let errItem = document.createElement("li");
  errItem.className = "alert alert-danger";
  errItem.textContent = err;

  elCountList.appendChild(errItem);
}

// add fetch function
function searchCountry(countName) {
  fetch(`https://restcountries.com/v3.1/name/${countName}`)
    .then(response => {
      if (response.status != 200) {
        throw new Error(error("Kechirasiz qidirgan davlat yoq"));
      }

      return response.json();
    })
    .then(data => renderCountry(data))
    .finally(function spinnerAdd() {
      // Add remove spinner
      elSpinner.classList.add("d-none");
    });
}

function spinnerRemove() {
  elSpinner.classList.remove("d-none")
}

elCountForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  elCountList.innerHTML = null;
  spinnerRemove()

  let inputValue = elCountInput.value.toLowerCase().trim();
  searchCountry(inputValue);

  elCountInput.value = "";
})

