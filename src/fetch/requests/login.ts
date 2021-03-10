export default (dispatch: any, getState: any) => {
    return fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then((response) => response.json())
}