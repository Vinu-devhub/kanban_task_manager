import { configureStore } from "@reduxjs/toolkit";

import boardReducer from "./slices/boardSlice";
import columnReducer from "./slices/columnSilce";
import taskReducer from "./slices/taskSlice";

const store = configureStore({
  reducer: {
    kanban_board: boardReducer,
    columnState: columnReducer,
    taskState: taskReducer,
  },
});

export default store;
