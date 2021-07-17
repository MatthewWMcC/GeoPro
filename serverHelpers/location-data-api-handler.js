const fetch = require("node-fetch");

const getNumberOfLocationResults = async() => {
    //console.log("start")
    const data = await fetch('http://geodb-free-service.wirefreethought.com/v1/geo/countries?limit=1&hateoasMode=off')
    .then(response => response.json())
    .then(data => data.metadata.totalCount)
    //console.log("end")
    return data
}

const getRandomLocationData = async(limit, resultsToChooseFrom) => {
    let numOfCitiesInCountry = 0;
    let countryCode = '';
    while (numOfCitiesInCountry <= 0){
        const offset = getRandomInt(limit);
        //console.log("start")
        countryCode = await fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/countries?limit=1&offset=${offset}&hateoasMode=off`)
        .then(response => response.json())
        .then(data => data.data[0].code)
        //console.log("end")
        //console.log(countryCode, offset)

        //console.log("start")
        numOfCitiesInCountry = await fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=1&types=CITY&hateoasMode=off&countryIds=${countryCode}`)
        .then(response => response.json())
        .then(data => data.metadata.totalCount)
        .then(num => num <= resultsToChooseFrom || resultsToChooseFrom >= 20 ? num : resultsToChooseFrom)
        //console.log("end")
    }

    const offsetCity = getRandomInt(numOfCitiesInCountry);

    //console.log("start")
    const data = await fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=1&types=CITY&offset=${offsetCity}&hateoasMode=off&countryIds=${countryCode}&sort=-population`)
    .then(response => response.json())
    .then(data => data.data[0])
    //console.log("end")

    return {
        city: data.city,
        region: data.region,
        country: data.country,
        lat: data.latitude,
        lng: data.longitude,
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


module.exports = {
    getNumberOfLocationResults,
    getRandomLocationData
}