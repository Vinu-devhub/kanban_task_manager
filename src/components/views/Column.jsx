import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogRoot,
  AlertDialogTitle,
  Button,
  Flex,
} from "@radix-ui/themes";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteColumn, editColumn } from "../../redux/slices/boardSlice";
import AddTaskCard from "../ui/AddTaskCard";
import DropMenu from "../ui/DropMenu";
import AddTask from "./AddTask";
import Task from "./Task";

const Column = ({ column }) => {
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [columnName, setColumnName] = useState("");
  const [editTask, setEditTask] = useState(false);

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

  const onEdit = () => {
    setColumnName(column.title);
    setEditMode(true);
  };

  const onDelete = () => {
    setDeleteMode(true);
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
          {editMode ? (
            <input
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
              className=" bg-transparent px-2 w-52 border-none outline-none ring-2 ring-blue-600 rounded text-white font-normal"
              maxLength={25}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
                setColumnName("");
                dispatch(
                  editColumn({ columnId: column.id, title: columnName }),
                );
              }}
            />
          ) : (
            column.title
          )}
        </p>
        <DropMenu onEdit={onEdit} onDelete={onDelete} />
      </div>
      <div className=" overflow-y-auto space-y-4 w-full h-full p-3">
        <div>
          <AddTaskCard setEditTask={setEditTask} />
          <AddTask
            columnId={column.id}
            editTask={editTask}
            setEditTask={setEditTask}
          />
        </div>
        {column?.tasks.map((task) => (
          <Task key={task.id} columnId={column.id} task={task} />
        ))}
      </div>
      <AlertDialogRoot open={deleteMode}>
        <AlertDialogContent
          style={{ maxWidth: 450 }}
          className=" bg-[#18191b] text-white"
        >
          <AlertDialogTitle>Delete Column </AlertDialogTitle>
          <AlertDialogDescription size="3">
            Are you sure? This column will no longer be accessible.
          </AlertDialogDescription>

          <Flex gap="3" mt="4" justify="end">
            <Button
              variant="soft"
              color="gray"
              className=" bg-slate-600 text-white cursor-pointer"
              onClick={() => {
                setDeleteMode(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              color="red"
              onClick={() => {
                dispatch(deleteColumn(column.id));
                setDeleteMode(false);
              }}
              className=" cursor-pointer bg-red-600 hover:bg-red-800 "
            >
              Delete
            </Button>
          </Flex>
        </AlertDialogContent>
      </AlertDialogRoot>
    </div>
  );
};

export default Column;
