import { TextFieldInput, TextFieldRoot, TextFieldSlot } from "@radix-ui/themes";
import { GalleryHorizontal, PlusCircle, Search } from "lucide-react";

const BoardMenu = () => {
  return (
    <div className=" flex items-center justify-between border-b border-gray-600 ">
      <div className=" flex gap-4 ">
        <div className=" flex items-center gap-2 border-b-2 py-4 px-2 cursor-pointer ">
          <GalleryHorizontal width={16} height={16} />
          <p className=" text-base">Board View</p>
        </div>
        <div className=" flex items-center gap-2 cursor-pointer">
          <PlusCircle
            width={16}
            height={16}
            className=" stroke-gray-400 bg-slate-800 rounded-full"
          />
          <p className=" text-base text-slate-400">Add View</p>
        </div>
      </div>
      <div className=" flex items-center gap-4 pr-4 ">
        <p>Filter</p>
        <p>Sort</p>
        <div>
          <TextFieldRoot>
            <TextFieldSlot className="bg-blue-700 rounded-tl-md rounded-bl-md ">
              <Search height={16} width={16} color="white" />
            </TextFieldSlot>
            <TextFieldInput
              variant="soft"
              color="blue"
              placeholder="Search..."
              className=" text-white placeholder:text-white bg-blue-700 rounded-tr-md rounded-br-md pr-4 "
            />
          </TextFieldRoot>
        </div>
      </div>
    </div>
  );
};

export default BoardMenu;
