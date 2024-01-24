const _apiUrl = "/api/Event";

export const GetEventsByUserId = (id) => {
    return fetch(`${_apiUrl}/user/{id}`).then((res) => res.json());
}

export const GetEvents = () => {
    return fetch(_apiUrl).then((res) => res.json());
}