import { PlusCircle } from "lucide-react";
import { useSelector } from "react-redux";
import Column from "./Column";

const Board = () => {
  const { boards, activeBoardIndex } = useSelector(
    (state) => state.kanban_board,
  );

  return (
    <div className=" flex-grow min-h-0 overflow-auto pt-4 pb-2 ">
      <div className=" flex  gap-4 w-80 h-full">
        <>
          {boards[activeBoardIndex].columns.map((item) => (
            <Column key={item.id} column={item} />
          ))}
        </>
        <div className=" min-w-full h-full flex flex-col gap-4 bg-[#24262C] rounded-xl py-2 items-center justify-center cursor-pointer  ">
          <PlusCircle size={100} className=" bg-slate-700 p-4 rounded-full" />
          <p className=" text-2xl font-medium text-slate-400">Add Column</p>
        </div>
      </div>
    </div>
  );
};

export default Board;
