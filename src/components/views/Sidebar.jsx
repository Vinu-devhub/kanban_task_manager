import {
  Button,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "@radix-ui/themes";
import {
  GalleryHorizontalEnd,
  MoreHorizontal,
  PenSquare,
  PlusCircle,
  Trash,
} from "lucide-react";
import { useState } from "react";
import boardData from "../../../public/data.json";

const Sidebar = () => {
  const [clicked, setClicked] = useState(0);

  const data = boardData.boards;

  return (
    <div className=" w-80 h-full bg-[#222327] text-white p-7">
      <div className=" space-y-20">
        <div className=" text-3xl font-semibold leading-8">Projects</div>
        <div className="">
          <p className=" text-xl font-medium pl-1 pt-1">
            Boards ({data.length})
          </p>
          <div className=" space-y-4 py-4 ">
            {data.map((item, index) => (
              <div
                key={item.id}
                className={`flex gap-2 items-center justify-between hover:bg-slate-900 outline-none hover:ring-2 hover:ring-blue-700 ${
                  index === clicked ? "bg-blue-600" : ""
                }  cursor-pointer p-2 rounded-md relative`}
                onClick={() => setClicked(index)}
              >
                <div className=" flex items-center gap-2">
                  <GalleryHorizontalEnd width={20} height={20} />
                  <p className=" w-32 text-base truncate">
                    {item.title} &nbsp;
                  </p>
                </div>
                <DropdownMenuRoot>
                  ({item.columns.length})
                  <DropdownMenuTrigger asChild>
                    <MoreHorizontal
                      className={`${
                        index === clicked ? "visible" : "invisible"
                      } stroke-white hover:stroke-red-600 `}
                      width={20}
                      height={20}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className=" bg-[#2A2B2F] text-white">
                    <DropdownMenuItem className=" space-x-8 cursor-pointer">
                      <span className=" text-base ">Edit</span>
                      <span>
                        <PenSquare width={20} height={20} stroke="white" />
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className=" space-x-10 cursor-pointer"
                      color="red"
                    >
                      <span className=" text-base">Delete</span>{" "}
                      <span>
                        <Trash width={20} height={20} stroke="white" />
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenuRoot>
              </div>
            ))}
          </div>
          <div>
            <Button className=" w-full p-6 items-center bg-slate-800 hover:bg-slate-900 cursor-pointer mt-4 ">
              <PlusCircle width={20} height={20} />
              <p className=" text-base">Add New Board</p>
            </Button>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Sidebar;
