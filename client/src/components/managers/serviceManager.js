const _apiUrl = "/api/Service";

export const GetServices = () => {
    return fetch(_apiUrl).then((res) => res.json());
}

export const AvailableServicesByVenueId = (venueId) => {
    return fetch(`${_apiUrl}/available/${venueId}`).then((res) => res.json());
}