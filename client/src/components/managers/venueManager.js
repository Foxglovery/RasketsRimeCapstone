const _apiUrl = "/api/Venue"

export const GetVenues = () => {
    return fetch(_apiUrl).then((res) => res.json());
}