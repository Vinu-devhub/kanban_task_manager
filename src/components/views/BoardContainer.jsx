import Header from "./Header";
import KanbanBoard from "./KanbanBoard";

const BoardContainer = () => {
  return (
    <div className=" w-full h-full flex-1 flex flex-col bg-[#2A2B2F] text-white p-5 space-y-4 overflow-hidden">
      <Header />
      <KanbanBoard />
    </div>
  );
};

export default BoardContainer;
