import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteColumn, editColumn } from "../../redux/slices/boardSlice";
import {
  setColumnName,
  setDeleteColumnId,
  setDeleteColumnMode,
  setEditColumnId,
  setEditColumnMode,
} from "../../redux/slices/columnSilce";
import AddTaskCard from "../ui/AddTaskCard";
import DeleteModal from "../ui/DeleteModal";
import DropMenu from "../ui/DropMenu";
import AddTask from "./AddTask";
import Task from "./Task";

const Column = ({ column }) => {
  const {
    columnName,
    editColumnMode,
    deleteColumnMode,
    editColumnId,
    deleteColumnId,
  } = useSelector((state) => state.columnState);

  const { editTaskMode, newTaskColumnId } = useSelector(
    (state) => state.taskState,
  );

  const tasksIds = useMemo(() => {
    return column.tasks.map((task) => task.id);
  }, [column.tasks]);

  const dispatch = useDispatch();

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className=" min-w-full h-full flex flex-col bg-transparent rounded-2xl py-2 border-dashed border-2 border-blue-600   "
      ></div>
    );
  }

  const handleChange = (e) => {
    dispatch(setColumnName(e.target.value));
  };

  const onEdit = () => {
    dispatch(setEditColumnId(column.id));
    dispatch(setColumnName(column.title));
    dispatch(setEditColumnMode(true));
  };

  const onDelete = () => {
    dispatch(setDeleteColumnMode(true));
    dispatch(setDeleteColumnId(column.id));
  };

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    dispatch(setEditColumnMode(false));
    dispatch(setColumnName(""));
    dispatch(setEditColumnId(null));
    dispatch(editColumn({ columnId: column.id, title: columnName }));
  };

  const handleCancel = () => {
    dispatch(setDeleteColumnMode(false));
    dispatch(setDeleteColumnId(null));
  };

  const handleDelete = () => {
    dispatch(deleteColumn(deleteColumnId));
    dispatch(setDeleteColumnMode(false));
    dispatch(setDeleteColumnId(null));
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className=" min-w-full h-full flex flex-col bg-[#24262C] rounded-xl py-2   "
    >
      <div
        {...attributes}
        {...listeners}
        className=" flex justify-between px-3"
      >
        <p className=" font-medium text-slate-400 pb-2">
          ({column.tasks.length}){" "}
          {editColumnMode && editColumnId === column.id ? (
            <input
              value={columnName}
              onChange={handleChange}
              className=" bg-transparent px-2 w-52 border-none outline-none ring-2 ring-blue-600 rounded text-white font-normal"
              maxLength={25}
              autoFocus
              onBlur={() => {
                dispatch(setEditColumnMode(false));
              }}
              onKeyDown={handleKeyDown}
            />
          ) : (
            column.title
          )}
        </p>
        <DropMenu onEdit={onEdit} onDelete={onDelete} />
      </div>
      <div className=" overflow-y-auto space-y-4 w-full h-full p-3">
        <div>
          <AddTaskCard columnId={column.id} />
          {editTaskMode && newTaskColumnId === column.id && (
            <AddTask columnId={newTaskColumnId} />
          )}
        </div>
        <SortableContext items={tasksIds}>
          {column?.tasks.map((task) => (
            <Task key={task.id} columnId={column.id} task={task} />
          ))}
        </SortableContext>
      </div>
      <DeleteModal
        openModal={deleteColumnMode}
        deleteTitle={"column"}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Column;
