import { useSelector } from "react-redux";
import AddColumn from "./AddColumn";
import Column from "./Column";

const Board = () => {
  const { boards, activeBoardIndex } = useSelector(
    (state) => state.kanban_board,
  );

  return (
    <div className=" flex-grow min-h-0 overflow-auto pt-4 pb-2 ">
      <div className=" flex  gap-4 w-[19rem] h-full">
        <>
          {boards[activeBoardIndex].columns.map((item) => (
            <Column key={item.id} column={item} />
          ))}
        </>
        <AddColumn />
      </div>
    </div>
  );
};

export default Board;
