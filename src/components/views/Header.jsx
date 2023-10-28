import { LayoutDashboard } from "lucide-react";

const Header = () => {
  return (
    <div className=" p-2">
      <div className=" flex gap-4">
        <LayoutDashboard width={32} height={32} />
        <h1 className=" text-2xl font-medium ">Board_1</h1>
      </div>
    </div>
  );
};

export default Header;
