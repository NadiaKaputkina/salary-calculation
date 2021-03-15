export const registerUser = (data: any) => {
    return fetch('http://localhost:3000/profile', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        }
    )
}

