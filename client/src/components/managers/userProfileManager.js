const _apiUrl = "/api/UserProfile"

export const GetProfiles = () => {
    return fetch(_apiUrl).then((res) => res.json());
}

export const GetProfile = (id) => {
    return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
}