const fetch = require("node-fetch");

const getNumberOfLocationResults = async() => {
    console.log("start")
    const data = await fetch('http://geodb-free-service.wirefreethought.com/v1/geo/countries?limit=1&hateoasMode=off')
    .then(response => response.json())
    .then(data => data.metadata.totalCount)
    console.log("end")
    return data
}

const getRandomLocationData = async(limit, room) => {
    let numOfCitiesInCountry = 0;
    let countryCode = '';
    while (numOfCitiesInCountry <= 0){
        const offset = getRandomInt(limit);
        console.log("start")
        countryCode = await fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/countries?limit=1&offset=${offset}&hateoasMode=off`)
        .then(response => response.json())
        .then(data => data.data[0].code)
        console.log("end")
        console.log(countryCode, offset)

        console.log("start")
        numOfCitiesInCountry = await fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=1&types=CITY&hateoasMode=off&countryIds=${countryCode}`)
        .then(response => response.json())
        .then(data => data.metadata.totalCount)
        console.log("end")
    }
    
    const offsetCity = getRandomInt(numOfCitiesInCountry);

    console.log("start")
    const data = await fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=1&types=CITY&offset=${offsetCity}&hateoasMode=off&countryIds=${countryCode}`)
    .then(response => response.json())
    .then(data => data.data[0])
    console.log("end")

    return {
        city: data.city,
        region: data.region,
        country: data.country
    }
}

function getRandomInt(max) {
    console.log(max)
    return Math.floor(Math.random() * max);
}


module.exports = {
    getNumberOfLocationResults,
    getRandomLocationData
}