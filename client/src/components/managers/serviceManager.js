import { appBarClasses } from "@mui/material";

const _apiUrl = "/api/Service";

export const GetServices = () => {
    return fetch(_apiUrl).then((res) => res.json());
}
export const GetActiveServices = () => {
    return fetch(`${_apiUrl}/active`).then((res) => res.json());
}
export const GetServiceById = (id) => {
    return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
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

export const updateService = (id, updateService) => {
return fetch(`${_apiUrl}/${id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(updateService),
})
}

export const DeactivateService = (id) => {
    return fetch(`${_apiUrl}/deactivate/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    })
  }
  export const ActivateService = (id) => {
    return fetch(`${_apiUrl}/activate/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    })
  }