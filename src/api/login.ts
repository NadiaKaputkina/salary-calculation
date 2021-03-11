export const userLogin = (data: any) => {
    return fetch(`http://localhost:3000/profile/?username=${data.username}&password=${data.password}`)
}

export const userLogout = () => {
    return fetch('https://jsonplaceholder.typicode.com/posts/1')
}