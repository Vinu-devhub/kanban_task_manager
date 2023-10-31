import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogRoot,
  AlertDialogTitle,
  Avatar,
  Badge,
  Button,
  Flex,
} from "@radix-ui/themes";
import { UserCircle } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../redux/slices/boardSlice";
import DropMenu from "../ui/DropMenu";
import AddTask from "./AddTask";
import DisplayTask from "./DisplayTask";

const Task = ({ columnId, task }) => {
  const [display, setDisplay] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const dispatch = useDispatch();

  const gettaskPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-[#442121] text-[#EB5757]";
      case "Medium":
        return "bg-[#30352F] text-[#F2994A]";
      case "Low":
        return "bg-[#1A3131] text-[#29A073]";
      default:
        return "";
    }
  };

  const onEdit = (e) => {
    e.stopPropagation();
    setEditTask(true);
  };

  const onDelete = (e) => {
    e.stopPropagation();
    setDeleteMode(true);
  };

  return (
    <>
      <div
        className=" max-h-36 h-full w-full bg-[#292B31] backdrop-filter backdrop-blur-lg bg-opacity shadow-md rounded-lg p-3 space-y-2 flex flex-col hover:cursor-pointer active:cursor-grab "
        onClick={() => setDisplay(true)}
      >
        <div className=" flex justify-between">
          <div>
            <Badge
              className={`${gettaskPriorityColor(
                task.priority,
              )} rounded font-semibold px-4 py-1 `}
            >
              {task.priority}
            </Badge>
          </div>
          <div>
            <DropMenu onEdit={onEdit} onDelete={onDelete} type={"vertical"} />
          </div>
        </div>
        <div className=" flex-1 flex flex-col justify-between px-1">
          <div className=" space-y-0.5 pb-2">
            <p className=" w-48 tracking-wide truncate text-lg font-medium">
              {task.title}
            </p>
            <p
              className={`w-44 text-sm tracking-wide truncate ${
                task.description ? "text-white/60" : " text-slate-700"
              } `}
            >
              {task.description ? task.description : "No Description"}
            </p>
          </div>
          <div className=" flex justify-between border-t border-white/5 pt-2 ">
            <Avatar
              size="1"
              radius="full"
              src="https://api.lorem.space/image/face"
              fallback={<UserCircle stroke="gray" />}
            />
            <Badge className=" bg-black/10 text-white rounded px-3  py-1">
              {task.date}
            </Badge>
          </div>
        </div>
      </div>
      <DisplayTask
        showTask={display}
        setShowTask={setDisplay}
        title={task.title}
        description={task.description}
        priority={task.priority}
        date={task.date}
      />
      <AddTask
        editTask={editTask}
        setEditTask={setEditTask}
        title={task.title}
        description={task.description}
        priority={task.priority}
        date={task.date}
        columnId={columnId}
      />
      <AlertDialogRoot open={deleteMode}>
        <AlertDialogContent
          style={{ maxWidth: 450 }}
          className=" bg-[#18191b] text-white"
        >
          <AlertDialogTitle>Delete Task </AlertDialogTitle>
          <AlertDialogDescription size="3">
            Are you sure? This task will no longer be accessible.
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
                dispatch(deleteTask({ columnId, taskId: task.id }));
                setDeleteMode(false);
              }}
              className=" cursor-pointer bg-red-600 hover:bg-red-800 "
            >
              Delete
            </Button>
          </Flex>
        </AlertDialogContent>
      </AlertDialogRoot>
    </>
  );
};

export default Task;
