import {
  Button,
  TextFieldInput,
  TextFieldRoot,
  TextFieldSlot,
  Tooltip,
} from "@radix-ui/themes";
import { GalleryHorizontal, PlusCircle, Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { resetBoardState } from "../../redux/slices/boardSlice";

const BoardMenu = () => {
  const dispatch = useDispatch();

  return (
    <div className=" flex items-center justify-between border-b border-gray-600 ">
      <div className=" flex gap-4 ">
        <div className=" flex items-center gap-2 border-b-2 py-2 px-2 cursor-pointer ">
          <GalleryHorizontal width={16} height={16} />
          <p className=" text-base">Board View</p>
        </div>
        <Tooltip
          content="Not Implemented"
          delayDuration={100}
          className=" p-3 "
        >
          <div className=" flex items-center gap-2 cursor-pointer">
            <PlusCircle
              width={16}
              height={16}
              className=" stroke-gray-400 bg-slate-800 rounded-full"
            />
            <p className=" text-base text-slate-400">Add View</p>
          </div>
        </Tooltip>
      </div>
      <div className=" flex items-center gap-4 pr-4 pb-2 ">
        <Tooltip
          content="Reset the application"
          delayDuration={100}
          className=" p-3"
        >
          <Button
            className=" text-white cursor-pointer bg-blue-700"
            onClick={() => {
              dispatch(resetBoardState("boardState"));
            }}
          >
            Reset
          </Button>
        </Tooltip>
        <p className=" text-white/25">Filter</p>
        <p className=" text-white/25">Sort</p>
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
