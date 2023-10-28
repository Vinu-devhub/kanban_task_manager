import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "@radix-ui/themes";
import { MoreHorizontal, PenSquare, PlusCircle, Trash } from "lucide-react";

const Column = ({ column }) => {
  return (
    <div className=" min-w-full h-full flex flex-col bg-[#24262C] rounded-xl py-2   ">
      <div className=" flex justify-between px-4">
        <p className=" font-medium text-slate-400 pb-2">Column {column} (3) </p>{" "}
        <DropdownMenuRoot>
          <DropdownMenuTrigger asChild>
            <MoreHorizontal
              className={` stroke-white hover:stroke-red-600 cursor-pointer `}
              width={20}
              height={20}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className=" bg-slate-900 text-white">
            <DropdownMenuItem className=" space-x-4 cursor-pointer">
              <span className=" text-base ">Edit</span>
              <span>
                <PenSquare width={20} height={20} stroke="white" />
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className=" space-x-4 cursor-pointer" color="red">
              <span className=" text-base">Delete</span>{" "}
              <span>
                <Trash width={20} height={20} stroke="white" />
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuRoot>
      </div>
      <div className=" overflow-y-auto space-y-4 w-full p-3">
        <div className=" h-20 w-full border-2 border-dashed border-white/40 rounded-xl p-3 flex items-center justify-center gap-4 cursor-pointer ">
          <PlusCircle />
          <span className=" text-lg">Add Task</span>
        </div>
        {[1, 2, 3, 4, 4].map((item) => (
          <div
            key={item}
            className=" h-40 w-full bg-[#292B31] backdrop-filter backdrop-blur-lg bg-opacity shadow-md  rounded-xl p-3 "
          >
            Heello task
          </div>
        ))}
      </div>
    </div>
  );
};

export default Column;
