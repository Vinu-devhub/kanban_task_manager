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
      state.activeBoardIndex = action.payload;
    },
    addBoard: (state, action) => {
      const newBoard = {
        id: currentID++,
        title: action.payload,
        columns: [],
      };
      state.boards = [...state.boards, newBoard];
    },
    editBoardName: (state, action) => {
      const editedName = action.payload;
      state.boards[state.activeBoardIndex].title = editedName;
    },
    deleteBoard: (state, action) => {
      state.activeBoardIndex = 0;
      state.boards = state.boards.filter(
        (board) => board.id !== action.payload,
      );
    },
    addColumn: (state, action) => {
      const newColumn = {
        id: currentID++,
        title: action.payload.columnName,
        tasks: [],
      };
      state.boards[state.activeBoardIndex] = {
        ...state.boards[state.activeBoardIndex],
        columns: [...state.boards[state.activeBoardIndex].columns, newColumn],
      };
    },
    editColumn: (state, action) => {
      const editedColumn = action.payload.columnId;
      state.boards[state.activeBoardIndex].columns = state.boards[
        state.activeBoardIndex
      ].columns.map((column) => {
        if (column.id === editedColumn) {
          return { ...column, title: action.payload.title };
        }
        return column;
      });
    },
    deleteColumn: (state, action) => {
      state.boards[state.activeBoardIndex] = {
        ...state.boards[state.activeBoardIndex],
        columns: state.boards[state.activeBoardIndex].columns.filter(
          (column) => column.id !== action.payload,
        ),
      };
    },
    setActiveColumn: (state, action) => {
      state.activeColumn = action.payload;
    },
    setColumns: (state, action) => {
      const activeColumnIndex = state.boards[
        state.activeBoardIndex
      ].columns.findIndex(
        (column) => column.id === action.payload.activeColumnId,
      );

      const overColumnIndex = state.boards[
        state.activeBoardIndex
      ].columns.findIndex(
        (column) => column.id === action.payload.overColumnId,
      );

      // Perform the move operation
      const columns = [...state.boards[state.activeBoardIndex].columns];
      const [movedColumn] = columns.splice(activeColumnIndex, 1);
      columns.splice(overColumnIndex, 0, movedColumn);

      // Update the state with the new columns array
      state.boards[state.activeBoardIndex].columns = columns;

      return state;
    },
    addTask: (state, action) => {
      console.log("Column Id: ", action.payload);

      const newTask = {
        id: currentID++,
        title: action.payload.title,
        description: action.payload.description,
        priority: action.payload.priority,
        date: action.payload.date,
      };

      const columns = state.boards[state.activeBoardIndex].columns;

      const column = columns.find(
        (column) => column.id === action.payload.columnId,
      );

      column.tasks = [...column.tasks, newTask];
    },
    editTask: (state, action) => {
      const editedTaskId = action.payload.taskId;

      const editedTask = {
        title: action.payload.title,
        description: action.payload.description,
        priority: action.payload.priority,
        date: action.payload.date,
      };

      state.boards[state.activeBoardIndex].columns = state.boards[
        state.activeBoardIndex
      ].columns.map((column) => {
        return {
          ...column,
          tasks: column.tasks.map((task) => {
            if (task.id === editedTaskId) {
              return { ...task, ...editedTask };
            }
            return task;
          }),
        };
      });
    },
    deleteTask: (state, action) => {
      const column = state.boards[state.activeBoardIndex].columns.find(
        (column) => column.id === action.payload.columnId,
      );

      const updatedTasks = column.tasks.filter(
        (task) => task.id !== action.payload.taskId,
      );

      column.tasks = updatedTasks;
    },
    setActiveTask: (state, action) => {
      state.activeTask = action.payload;
    },

    setTasks: (state, action) => {
      const { columnId, activeTaskId, overTaskId, overColumnId } =
        action.payload;

      const activeColumn = state.boards[state.activeBoardIndex].columns.find(
        (column) => column.id === columnId,
      );

      const overColumn = state.boards[state.activeBoardIndex].columns.find(
        (column) => column.id === overColumnId,
      );

      if (!activeColumn || !overColumn) {
        return state;
      }

      let activeTaskIndex;

      if (activeColumn) {
        activeTaskIndex = activeColumn.tasks.findIndex(
          (task) => task.id === activeTaskId,
        );
      }

      let overTaskIndex;

      if (overColumn) {
        overTaskIndex = overColumn.tasks.findIndex(
          (task) => task.id === overTaskId,
        );
      }

      if (activeTaskIndex === -1) {
        return state;
      }

      // const activeTask = activeColumn?.tasks[activeTaskIndex];

      let activeColumnTasks;

      if (activeColumn) {
        activeColumnTasks = [...activeColumn.tasks];
      }

      let overColumnTasks;

      if (overColumn) {
        overColumnTasks = [...overColumn.tasks];
      }

      const tasks = [...activeColumnTasks];
      const [movedTask] = tasks.splice(activeTaskIndex, 1);

      // if (overTaskIndex === -1) {
      //   overColumn.tasks.push(movedTask);
      // }

      if (columnId === overColumnId) {
        tasks.splice(overTaskIndex, 0, movedTask);

        activeColumn.tasks = tasks;

        state.boards[state.activeBoardIndex].columns = state.boards[
          state.activeBoardIndex
        ].columns.map((column) => {
          if (column.id === activeColumn.id) {
            return activeColumn;
          } else if (column.id === overColumn.id) {
            return overColumn;
          }
          return column;
        });
      }

      if (columnId !== overColumnId) {
        overColumnTasks.splice(overTaskIndex, 0, movedTask);

        activeColumn.tasks = tasks;

        if (overTaskId) {
          overColumn.tasks = overColumnTasks;
        } else {
          overColumn.tasks = [...overColumn.tasks, movedTask];
        }

        state.boards[state.activeBoardIndex].columns = state.boards[
          state.activeBoardIndex
        ].columns.map((column) => {
          if (column.id === activeColumn.id) {
            return activeColumn;
          } else if (column.id === overColumn.id) {
            return overColumn;
          }
          return column;
        });
      }
    },
  },
});

export default boardSlice.reducer;

export const {
  setActiveBoardIndex,
  addBoard,
  editBoardName,
  deleteBoard,
  addColumn,
  editColumn,
  deleteColumn,
  setActiveColumn,
  setColumns,
  addTask,
  editTask,
  deleteTask,
  setActiveTask,
  setTasks,
} = boardSlice.actions;
