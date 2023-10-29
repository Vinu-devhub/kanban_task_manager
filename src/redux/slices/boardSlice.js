import { createSlice } from "@reduxjs/toolkit";
import data from "../../../public/data.json";

let currentID = 0;

const { boards } = data;

const initialBoardState = boards.map((board) => {
  return {
    id: currentID++,
    title: board.title,
    columns: board.columns.map((column) => {
      return {
        id: currentID++,
        title: column.title,
        tasks: column.tasks.map((task) => {
          return {
            id: currentID++,
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            date: task.date,
          };
        }),
      };
    }),
  };
});

const initialState = {
  boards: initialBoardState,
  activeBoardIndex: 0,
  activeColumn: null,
  activeTask: null,
  dragState: initialBoardState,
};

const boardSlice = createSlice({
  name: "kanban_board",
  initialState: initialState,
  reducers: {
    setActiveBoardIndex: (state, action) => {
      console.log("Action dispatched: ", action);
      state.activeBoardIndex = action.payload;
    },
  },
});

export default boardSlice.reducer;

export const { setActiveBoardIndex } = boardSlice.actions;
