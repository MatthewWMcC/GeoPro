const fetch = require("node-fetch");

const getNumberOfLocationResults = async() => {
    const data = await fetch('http://geodb-free-service.wirefreethought.com/v1/geo/countries?limit=1&hateoasMode=off')
    .then(response => response.json())
    .then(data => data.metadata.totalCount)
    return data
}

const getRandomLocationData = async(limit, resultsToChooseFrom) => {
    let numOfCitiesInCountry = 0;
    let countryCode = '';
    while (numOfCitiesInCountry <= 0){
        const offset = getRandomInt(limit);

        countryCode = await fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/countries?limit=1&offset=${offset}&hateoasMode=off`)
        .then(response => response.json())
        .then(data => data.data[0].code)

        numOfCitiesInCountry = await fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=1&types=CITY&hateoasMode=off&countryIds=${countryCode}`)
        .then(response => response.json())
        .then(data => data.metadata.totalCount)
        .then(num => num <= resultsToChooseFrom || resultsToChooseFrom >= 20 ? num : resultsToChooseFrom)
    }

    const offsetCity = getRandomInt(numOfCitiesInCountry);

    const data = await fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=1&types=CITY&offset=${offsetCity}&hateoasMode=off&countryIds=${countryCode}&sort=-population`)
    .then(response => response.json())
    .then(data => data.data[0])

    return {
        city: data.city,
        region: data.region,
        country: data.country,
        lat: data.latitude,
        lng: data.longitude,
        wikiId: data.wikiDataId,
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


module.exports = {
    getNumberOfLocationResults,
    getRandomLocationData
}