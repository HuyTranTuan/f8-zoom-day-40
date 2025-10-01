import { useContext, useEffect, useState } from "react";
import { Context } from "@/context/ReduxContext";

function useStore(){
    const store = useContext(Context);
    return store;
}

function useDispatch(){
    const store = useStore();
    return store.dispatch;
}

function useSelector(selector = state => state){
    const store = useStore();
    const [state, setState] = useState(() => {
        return selector(store.getState());
    })

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            const nextState = selector(store.getState());
            if(state !== nextState) setState(selector(store.getState()))
        })

        return unsubscribe;
    }, [selector, state, store])

    return state
}

export {useStore, useSelector, useDispatch}
