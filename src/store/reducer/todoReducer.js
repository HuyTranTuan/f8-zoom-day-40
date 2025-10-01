import store from "../store";

const innitialState = {
    tasks: [],
    loading: false,
    error: null,
}

const reducer = (state = innitialState, action) => {
    switch(action.type){
        case "ADD_TASK":
            return {
                ...state,
                tasks: [ action.payload, ...state.tasks]
            };
        case "UPDATE_TASK":
            return {
                ...state,
                tasks: [store.getState().tasks.map(task => {
                    return task.id === action.payload.id ? action.payload : task;
                })]
            };
        case "DELETE_TASK":
            return {
                ...state,
                tasks: [store.getState().tasks.map(task => {
                    return task.id !== action.payload.id;
                })]
            };
        case "SET_TASKS":
            return {
                ...state,
                tasks: action.payload
            };
        default: 
            return {
                ...state,
            }
    }
}

export default reducer;