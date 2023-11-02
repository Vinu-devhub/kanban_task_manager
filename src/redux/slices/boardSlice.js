import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const data = {
  boards: [
    {
      id: uuidv4(),
      title: "Board_1",
      columns: [
        {
          id: uuidv4(),
          title: "Column_1",
          tasks: [
            {
              id: uuidv4(),
              title: "Welcome to First Task ",
              description:
                "This is a test task description. Check it out: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad neque atque ipsum ea aspernatur repellat minus quisquam ex iste non.",
              status: "To Do",
              priority: "Low",
              date: new Date().toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }),
            },
          ],
        },
      ],
    },
  ],
};

const { boards } = data;

const initialBoardState = boards.map((board) => {
  return {
    id: uuidv4(),
    title: board.title,
    columns: board.columns.map((column) => {
      return {
        id: uuidv4(),
        title: column.title,
        tasks: column.tasks.map((task) => {
          return {
            id: uuidv4(),
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

const saveBoardStateToLocalStorage = (state) => {
  localStorage.setItem("boardState", JSON.stringify(state));
};

const getBoardStateFromLocalStorage = () => {
  const state = localStorage.getItem("boardState");
  return state ? JSON.parse(state).kanban_board : null;
};

const boardState = {
  boards: initialBoardState,
  activeBoardIndex: 0,
  activeColumn: null,
  activeTask: null,
  dragState: initialBoardState,
};

const initialState = getBoardStateFromLocalStorage() || boardState;

const boardSlice = createSlice({
  name: "kanban_board",
  initialState: initialState,
  reducers: {
    resetBoardState: (state, action) => {
      localStorage.removeItem(action.payload);
      return boardState;
    },
    setActiveBoardIndex: (state, action) => {
      state.activeBoardIndex = action.payload;
    },
    addBoard: (state, action) => {
      const newBoard = {
        id: uuidv4(),
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
        id: uuidv4(),
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
      const newTask = {
        id: uuidv4(),
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
  resetBoardState,
} = boardSlice.actions;

// Create a middleware function to handle localStorage integration
export const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Define the actions that you want to sync with localStorage
  const localStorageActions = [
    "kanban_board/setActiveBoardIndex",
    "kanban_board/setActiveColumn",
    "kanban_board/setColumns",
    "kanban_board/addBoard",
    "kanban_board/editBoardName",
    "kanban_board/deleteBoard",
    "kanban_board/addColumn",
    "kanban_board/editColumn",
    "kanban_board/deleteColumn",
    "kanban_board/addTask",
    "kanban_board/editTask",
    "kanban_board/deleteTask",
    "kanban_board/setActiveTask",
    "kanban_board/setTasks",
  ];

  if (localStorageActions.includes(action.type)) {
    saveBoardStateToLocalStorage(store.getState());
  }

  return result;
};
