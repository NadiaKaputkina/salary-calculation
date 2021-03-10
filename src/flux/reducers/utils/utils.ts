export default function(initialState: any, handlers: any) {
    return (state = initialState, {type, payload}: any) => {
        return handlers[type] ? handlers[type](state, payload) : state
    }
}