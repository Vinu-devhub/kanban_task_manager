import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Avatar, Badge } from "@radix-ui/themes";
import { UserCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../redux/slices/boardSlice";
import {
  setDeleteTaskColumnId,
  setDeleteTaskId,
  setDeleteTaskMode,
  setEditTaskId,
  setEditTaskMode,
  setShowTask,
  setShowTaskId,
} from "../../redux/slices/taskSlice";
import DeleteModal from "../ui/DeleteModal";
import DropMenu from "../ui/DropMenu";
import AddTask from "./AddTask";
import DisplayTask from "./DisplayTask";

const Task = ({ columnId, task }) => {
  const {
    showTask,
    deleteTaskMode,
    showTaskId,
    editTaskId,
    deleteTaskId,
    deleteTaskColumnId,
  } = useSelector((state) => state.taskState);

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
    dispatch(setEditTaskId(task.id));
    dispatch(setEditTaskMode(true));
  };

  const onDelete = (e) => {
    e.stopPropagation();
    dispatch(setDeleteTaskMode(true));
    dispatch(setDeleteTaskId(task.id));
    dispatch(setDeleteTaskColumnId(columnId));
  };

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
      columnId,
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
        className=" max-h-36 h-full w-full bg-transparent border-2 border-dashed border-white rounded-lg p-3 space-y-2 flex flex-col justify-between items-center  "
      >
        <p className=" text-lg text-gray-500 font-medium">
          Drop your task here...
        </p>
      </div>
    );
  }

  const handleCancel = () => {
    dispatch(setDeleteTaskMode(false));
    dispatch(setDeleteTaskId(null));
  };

  const handleDelete = () => {
    dispatch(
      deleteTask({
        columnId: deleteTaskColumnId,
        taskId: deleteTaskId,
      }),
    );
    dispatch(setDeleteTaskMode(false));
    dispatch(setDeleteTaskId(null));
    dispatch(setDeleteTaskColumnId(null));
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className=" bg-[#292B31] text-white shadow-md rounded-lg p-3 space-y-2 flex flex-col cursor-pointer "
        onClick={() => {
          dispatch(setShowTaskId(task.id));
          dispatch(setShowTask(showTask));
        }}
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
              // src="https://api.lorem.space/image/face"
              fallback={<UserCircle stroke="gray" />}
            />
            <Badge className=" bg-black/10 text-white rounded px-3  py-1">
              {task.date}
            </Badge>
          </div>
        </div>
      </div>
      {showTaskId === task.id && (
        <DisplayTask
          title={task.title}
          description={task.description}
          priority={task.priority}
          date={task.date}
        />
      )}
      {editTaskId === task.id && (
        <AddTask
          title={task.title}
          description={task.description}
          priority={task.priority}
          columnId={columnId}
        />
      )}

      <DeleteModal
        openModal={deleteTaskMode}
        deleteTitle={"task"}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default Task;
