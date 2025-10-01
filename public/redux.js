const Redux = {
    __DO_NOT_USE__ActionTypes: {
        type: "@@F8-redux/INIT.a.b.c",
    },
    createStore(reducer, initState){
        let state = reducer(
            initState,
            this.__DO_NOT_USE__ActionTypes
        );

        const listeners = [];

        return {
            getState(){
                return state;
            },
            dispatch(action){
                state = reducer(state, action);
                listeners.forEach((listener) => listener());
            },
            subscribe(listener){
                if(typeof listener === "function"){
                    listeners.push(listener);
                }
                return () => {
                    const index =  listeners.indexOf(listener);
                    listeners.splice(index, 1);
                }
            }
        }
    }
}