export const loadEmployees = () => {
    return fetch('http://localhost:3000/workers')
}

export const loadWorkersWithQuery = (queryParams: any) => {
    const {
        q,
        limit,
        page
    } = queryParams

    return fetch(`http://localhost:3000/workers?q=${q}&_page=${page}&_limit=${limit}`)
}

export const loadTotalCountWithQuery = (queryParams: any) => {
    return fetch(`http://localhost:3000/workers?q=${queryParams.q}`)
}

export const addEmployee = (data: any) => {
    return fetch('http://localhost:3000/workers', {
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
