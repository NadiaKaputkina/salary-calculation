export const loadWorkers = () => {
    return fetch('http://localhost:3000/workers')
}

export const searchWorkers = (payload: any) => {
    return fetch(`http://localhost:3000/workers?q=${payload}`)
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
