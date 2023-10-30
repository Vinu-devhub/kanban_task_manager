import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogRoot,
  AlertDialogTitle,
  Button,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  Flex,
} from "@radix-ui/themes";
import { MoreHorizontal, PenSquare, PlusCircle, Trash } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteColumn, editColumn } from "../../redux/slices/boardSlice";
import Task from "./Task";

const Column = ({ column }) => {
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [columnName, setColumnName] = useState("");

  const dispatch = useDispatch();

  return (
    <div className=" min-w-full h-full flex flex-col bg-[#24262C] rounded-xl py-2   ">
      <div className=" flex justify-between px-3">
        <p className=" font-medium text-slate-400 pb-2">
          ({column.tasks.length}){" "}
          {editMode ? (
            <input
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
              className=" bg-transparent px-2 w-56 border-none outline-none ring-2 ring-blue-600 rounded text-white font-normal"
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
        <DropdownMenuRoot>
          <DropdownMenuTrigger asChild>
            <MoreHorizontal
              className={` stroke-white hover:stroke-red-600 cursor-pointer `}
              width={20}
              height={20}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className=" bg-slate-900 text-white">
            <DropdownMenuItem
              className=" space-x-4 cursor-pointer"
              onClick={() => {
                setColumnName(column.title);
                setEditMode(true);
              }}
            >
              <span className=" text-base ">Edit</span>
              <span>
                <PenSquare width={20} height={20} stroke="white" />
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className=" space-x-4 cursor-pointer"
              color="red"
              onClick={() => setDeleteMode(true)}
            >
              <span className=" text-base">Delete</span>{" "}
              <span>
                <Trash width={20} height={20} stroke="white" />
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuRoot>
      </div>
      <div className=" overflow-y-auto space-y-4 w-full h-full p-3">
        <div className=" h-20 w-full border-2 bg-[#292B31] shadow-lg border-dashed border-white/40 rounded-xl p-3 flex items-center justify-center gap-4 cursor-pointer ">
          <PlusCircle />
          <span className=" text-lg">Add Task</span>
        </div>
        {column?.tasks.map((task) => (
          <Task key={task.id} task={task} />
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
