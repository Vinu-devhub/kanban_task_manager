import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showTaskId: null,
  showTask: false,
  editTaskId: null,
  newTaskColumnId: null,
  editTaskMode: false,
  deleteTaskId: null,
  deleteTaskColumnId: null,
  deleteTaskMode: false,
};

const taskSlice = createSlice({
  name: "taskState",
  initialState,
  reducers: {
    setNewTaskColumnId: (state, action) => {
      state.newTaskColumnId = action.payload;
    },
    setShowTaskId: (state, action) => {
      state.showTaskId = action.payload;
    },
    setShowTask: (state) => {
      state.showTask = !state.showTask;
    },
    setEditTaskId: (state, action) => {
      state.editTaskId = action.payload;
    },
    setEditTaskMode: (state) => {
      state.editTaskMode = !state.editTaskMode;
    },
    setDeleteTaskId: (state, action) => {
      state.deleteTaskId = action.payload;
    },
    setDeleteTaskColumnId: (state, action) => {
      state.deleteTaskColumnId = action.payload;
    },
    setDeleteTaskMode: (state) => {
      state.deleteTaskMode = !state.deleteTaskMode;
    },
  },
});

export default taskSlice.reducer;

export const {
  setNewTaskColumnId,
  setShowTask,
  setEditTaskMode,
  setDeleteTaskMode,
  setShowTaskId,
  setEditTaskId,
  setDeleteTaskId,
  setDeleteTaskColumnId,
} = taskSlice.actions;
