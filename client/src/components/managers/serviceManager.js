const _apiUrl = "/api/Service";

export const GetServices = () => {
    return fetch(_apiUrl).then((res) => res.json());
}

export const AvailableServicesByVenueId = (venueId) => {
    return fetch(`${_apiUrl}/available/${venueId}`).then((res) => res.json());
}
export const CreateNewService = (newService) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(newService),
    }).then((res) => {
        if (!res.ok) {
            return res.text().then(text => {
                throw new Error(text || "Server responded with an error");
            });
        }
        return res.json();
    });
}