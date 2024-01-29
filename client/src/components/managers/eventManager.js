const _apiUrl = "/api/Event";

export const GetEventsByUserId = (id) => {
    return fetch(`${_apiUrl}/user/{id}`).then((res) => res.json());
}

export const GetEventById = (id) => {
    return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
}
export const GetEventToUpdateById = (id) => {
    return fetch(`${_apiUrl}/update/${id}`).then((res) => res.json());
}

export const GetEvents = () => {
    return fetch(_apiUrl).then((res) => res.json());
}
export const UpdateEvent = (eventId, newEvent) => {
return fetch(`${_apiUrl}/${eventId}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(newEvent),
})
}

export const AdminCancelEvent = (id) => {
    return fetch(`${_apiUrl}/AdminCancel/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
    })
}

export const ApproveEvent = (id) => {
    return fetch(`${_apiUrl}/approve/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
    })
}
export const RejectEvent = (id) => {
    return fetch(`${_apiUrl}/reject/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
    })
}

export const DeleteEvent = (id) => {
    return fetch(`${_apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
    })
}

export const CreateEvent = (newEvent) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(newEvent),
    }).then((res) => res.json());
}