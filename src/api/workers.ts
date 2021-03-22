import { prepareApiUrl } from "../helpers/urlHelpers";
const baseUrl = 'http://localhost:3000/workers'

export const loadEmployees = () => {
    return fetch('http://localhost:3000/workers')
}

export const loadWorkersWithQuery = (queryParams: any) => {

    return fetch(prepareApiUrl(baseUrl, queryParams))
}

export const loadTotalCountWithQuery = (queryParams: any) => {
    return fetch(`${baseUrl}?q=${queryParams.q}`)
}

export const addEmployee = (data: any) => {
    return fetch(`${baseUrl}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        }
    )
}

export const deleteEmployee = (data: any) => {
    return fetch(`http://localhost:3000/workers/${data.id}/`, {
            method: 'DELETE',
            body: JSON.stringify(data.id),
        }
    )
}
