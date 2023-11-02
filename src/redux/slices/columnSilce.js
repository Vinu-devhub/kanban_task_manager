import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editColumnId: null,
  editColumnMode: false,
  deleteColumnId: null,
  deleteColumnMode: false,
  columnName: "",
};

const columnSlice = createSlice({
  name: "columnState",
  initialState,
  reducers: {
    setEditColumnId: (state, action) => {
      state.editColumnId = action.payload;
    },
    setEditColumnMode: (state, action) => {
      state.editColumnMode = action.payload;
    },
    setDeleteColumnId: (state, action) => {
      state.deleteColumnId = action.payload;
    },
    setDeleteColumnMode: (state, action) => {
      state.deleteColumnMode = action.payload;
    },
    setColumnName: (state, action) => {
      state.columnName = action.payload;
    },
  },
});

export default columnSlice.reducer;

export const {
  setEditColumnMode,
  setDeleteColumnMode,
  setDeleteColumnId,
  setColumnName,
  setEditColumnId,
} = columnSlice.actions;
