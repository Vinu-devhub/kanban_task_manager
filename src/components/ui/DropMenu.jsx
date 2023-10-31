import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "@radix-ui/themes";
import { MoreHorizontal, MoreVertical, PenSquare, Trash } from "lucide-react";

const DropMenu = ({ onEdit, onDelete, type }) => {
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger asChild>
        {type === "vertical" ? (
          <MoreVertical
            className={` stroke-white hover:stroke-red-600 cursor-pointer `}
            width={20}
            height={20}
          />
        ) : (
          <MoreHorizontal
            className={` stroke-white hover:stroke-red-600 cursor-pointer `}
            width={20}
            height={20}
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" bg-slate-900 text-white">
        <DropdownMenuItem
          className=" space-x-4 cursor-pointer"
          onClick={onEdit}
        >
          <span className=" text-base ">Edit</span>
          <span>
            <PenSquare width={20} height={20} stroke="white" />
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className=" space-x-4 cursor-pointer"
          color="red"
          onClick={onDelete}
        >
          <span className=" text-base">Delete</span>{" "}
          <span>
            <Trash width={20} height={20} stroke="white" />
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
};

export default DropMenu;
