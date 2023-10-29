import { Badge } from "@radix-ui/themes";
import { GripVertical, MoreHorizontal } from "lucide-react";
import React from "react";

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
    <div className=" max-h-36 h-full w-full bg-[#292B31] backdrop-filter backdrop-blur-lg bg-opacity shadow-md  rounded-xl p-3 space-y-4 flex flex-col justify-between  ">
      <div className=" flex justify-between p-1">
        <div className=" space-y-3">
          <p className=" w-56 truncate text-lg font-medium">{task.title}</p>
          <p className=" w-60 truncate text-white/60 ">{task.description}</p>
        </div>
        <div>
          <MoreHorizontal className=" stroke-white p-1 rounded-full bg-white/10 border-2 border-gray-500 cursor-pointer" />
        </div>
      </div>
      <div className=" flex justify-between px-1">
        <Badge
          className={`${gettaskPriorityColor(task.priority)} rounded-md px-4 `}
        >
          {task.priority}
        </Badge>
        <Badge className=" bg-white/5 text-[#989CAA]  rounded-full px-6 py-2">
          {task.date}
        </Badge>
      </div>
    </div>
  );
};

export default Task;
