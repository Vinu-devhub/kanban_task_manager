import { Avatar, Badge } from "@radix-ui/themes";
import { MoreHorizontal } from "lucide-react";

const Task = ({ task }) => {
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
    <div className=" max-h-36 h-full w-full bg-[#292B31] backdrop-filter backdrop-blur-lg bg-opacity shadow-md rounded-lg p-3 space-y-2 flex flex-col">
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
          <MoreHorizontal className=" stroke-white p-1 rounded-full bg-white/10 border-2 border-gray-500 cursor-pointer" />
        </div>
      </div>
      <div className=" flex-1 flex flex-col justify-between px-1">
        <div className=" space-y-1">
          <p className=" w-48 tracking-wide truncate text-lg font-normal">
            {task.title}
          </p>
          <p className=" w-56 text-sm tracking-wide truncate text-white/60 ">
            {task.description}
          </p>
        </div>
        <div className=" flex justify-between">
          <Avatar
            size="1"
            radius="full"
            src="https://api.lorem.space/image/face"
            // fallback={}
          />
          <Badge className=" bg-white/5 text-white rounded px-3  py-1">
            {task.date}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default Task;
