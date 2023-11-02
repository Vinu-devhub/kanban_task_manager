import { configureStore } from "@reduxjs/toolkit";

import boardReducer, { localStorageMiddleware } from "./slices/boardSlice";
import columnReducer from "./slices/columnSilce";
import taskReducer from "./slices/taskSlice";

const store = configureStore({
  reducer: {
    kanban_board: boardReducer,
    columnState: columnReducer,
    taskState: taskReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    localStorageMiddleware,
  ],
});

export default store;
