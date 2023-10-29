import { LayoutDashboard } from "lucide-react";
import { useSelector } from "react-redux";

const Header = () => {
  const { boards, activeBoardIndex } = useSelector(
    (state) => state.kanban_board,
  );

  return (
    <div className=" p-2">
      <div className=" flex gap-4">
        <LayoutDashboard width={32} height={32} />
        <h1 className=" text-2xl font-medium ">
          {boards[activeBoardIndex]?.title}
        </h1>
      </div>
    </div>
  );
};

export default Header;
