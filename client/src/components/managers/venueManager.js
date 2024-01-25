const _apiUrl = "/api/Venue"

export const GetVenues = () => {
    return fetch(_apiUrl).then((res) => res.json());
}
export const GetVenueById = (id) => {
    return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
}