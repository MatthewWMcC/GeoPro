const convertLocationDataForGeolib = (locationData) => {
    return ({
        latitude: locationData.lat,
        longitude: locationData.lng
    })
}

module.exports = {
    convertLocationDataForGeolib
}