import Board from "./Board";
import BoardMenu from "./BoardMenu";

const KanbanBoard = () => {
  return (
    <div className=" flex-grow flex flex-col min-h-0 ">
      <BoardMenu />
      <Board />
    </div>
  );
};

export default KanbanBoard;
