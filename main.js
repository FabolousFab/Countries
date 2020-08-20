fetch('https://restcountries.eu/rest/v2/regionalbloc/eu?fields=name;capital;population;area')
.then(function (response) {
    return response.json()
}).then(function (data) {
    console.log(data)
})