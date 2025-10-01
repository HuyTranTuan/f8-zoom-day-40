import {createStore} from "@/libs/redux";
import reducer from "@/store/reducer/todoReducer";

const store = createStore(reducer);

export default store;