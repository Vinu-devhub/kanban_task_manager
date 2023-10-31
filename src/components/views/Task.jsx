import { Avatar, Badge } from "@radix-ui/themes";
import { MoreVertical, UserCircle } from "lucide-react";
import { useState } from "react";
import DisplayTask from "./DisplayTask";

const Task = ({ task }) => {
  const [display, setDisplay] = useState(false);

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
            {/* <MoreHorizontal className=" stroke-white p-1 rounded-full  cursor-pointer" /> */}
            <MoreVertical className=" stroke-white p-1 rounded-full  cursor-pointer" />
          </div>
        </div>
        <div className=" flex-1 flex flex-col justify-between px-1">
          <div className=" space-y-0.5 pb-2">
            <p className=" w-48 tracking-wide truncate text-lg font-medium">
              {task.title}
            </p>
            <p className=" w-44 text-sm tracking-wide truncate text-white/60 ">
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
    </>
  );
};

export default Task;
