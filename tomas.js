const url = "https://restcountries.eu/rest/v2/regionalbloc/eu?fields=name;capital;area;population;borders;flag;latlng";
const localJson = "./assets/countries.json";
const API_KEY = "AIzaSyBLyA6kHmk8Vfbe63pwJo0ydUktXAr14no";
const newRow = document.createElement("tr");
const tbody = document.getElementById("table-body");
let tHeadRow = document.getElementById("table-head").rows[0].cells.length;
let newTableData = document.createElement("td");

let countries;

fetch(localJson)
    .then(resp => resp.json())
    .then(data => initialize(data))
    .catch(error => alert("Could not found API: ", error));

function initialize(countriesData) {
    countries = countriesData;
    console.log(countries);
    countries.forEach(country => {

        let row = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.setAttribute("class", "first-row");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");
        let td6 = document.createElement("td");
        let td7 = document.createElement("td");

        td1.innerHTML = country.name;
        td2.innerHTML = country.capital;
        td3.innerHTML = ckeckingIfNullAndFormatNumber(country.population);
        td4.innerHTML = ckeckingIfNullAndFormatNumber(country.area);
        td5.innerHTML = calculateDensity(country.population, country.area);
        td6.innerHTML = country.borders.length;
        td7.innerHTML = `<img src= ${country.flag} onclick="changeLocation(${country.latlng[0]}, ${country.latlng[1]})">`;

        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);
        row.appendChild(td4);
        row.appendChild(td5);
        row.appendChild(td6);
        row.appendChild(td7);

        tbody.appendChild(row);
    });
}

function calculateDensity(pop, area) {
    if ((area == null) || (pop == null)) {
        return "N/A"
    }
    return truncateDecimal(pop / area);
}

function truncateDecimal(x) {
    return Number.parseFloat(x).toFixed(3);
}

function ckeckingIfNullAndFormatNumber(number) {
    if (number != null) {
        return formatToUK(number)
    }
    return "N/A"
}

function formatToUK(number) {
    return number.toLocaleString('en-GB');
}

function changeLocation(lat, long) {
    console.log(long);
  document.getElementById('map').src = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${lat},${long}&zoom=10`;
}

/*function changeLocation(lat, long) {
    
}*/