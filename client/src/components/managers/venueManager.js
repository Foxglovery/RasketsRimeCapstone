const _apiUrl = "/api/Venue";

export const GetVenues = () => {
  return fetch(_apiUrl).then((res) => res.json());
};
export const GetActiveVenues = () => {
  return fetch(`${_apiUrl}/active`).then((res) => res.json());
};
export const GetVenueById = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};

export const GetVenuesByServiceId = (id) => {
  return fetch(`${_apiUrl}/services/${id}`).then((res) => res.json());
};
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
  });
};

export const DeactivateVenue = (id) => {
  return fetch(`${_apiUrl}/deactivate/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });
};
export const ActivateVenue = (id) => {
  return fetch(`${_apiUrl}/activate/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });
};

export const DeleteVenue = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });
}