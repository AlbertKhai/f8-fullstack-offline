//Tạo store
import { combineReducers, legacy_createStore as createStore } from "redux";
import { darkModeReducer } from "./reducers/darkModeReducer";
import { toastReducer } from "./reducers/toastReducer";
import { levelReducer } from "./reducers/levelReducer";
import { liveReducer } from "./reducers/liveReducer";
import { scoreReducer } from "./reducers/scoreReducer";

const rootReducer = combineReducers({
   ui: darkModeReducer,
   toast: toastReducer,
   lv: levelReducer,
   live: liveReducer,
   tblScore: scoreReducer,
});
export const store = createStore(rootReducer);
