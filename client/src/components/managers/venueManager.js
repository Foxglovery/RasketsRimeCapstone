const _apiUrl = "/api/Venue";

export const GetVenues = () => {
  return fetch(_apiUrl).then((res) => res.json());
};
export const GetVenueById = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};

export const GetVenuesByServiceId = (id) => {
  return fetch(`${_apiUrl}/services/${id}`).then((res) => res.json());
}
export const CreateNewVenue = (newVenue) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newVenue),
  }).then((res) => {
    if (!res.ok) {
      return res.text().then((text) => {
        throw new Error(text || "Server responded with an error");
      });
    }
    return res.json();
  });
};

export const updateVenue = (venueId, newVenue) => {
  return fetch(`${_apiUrl}/${venueId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newVenue),
  })
}
