import {
  Calendar,
  KanbanSquare,
  Layers,
  LayoutGrid,
  LogOut,
  MoreHorizontal,
  UploadCloud,
  User2,
} from "lucide-react";
import AppLogo from "../../assets/icons/AppLogo";

const MiniSidebar = () => {
  return (
    <div className=" w-20 h-full flex flex-col justify-between items-center py-2 pb-6 bg-[#1C1D22] px-4">
      <div className=" space-y-6">
        <div className=" p-2">
          <MoreHorizontal stroke="white" />
        </div>
        <div className=" stroke-white p-2">
          <AppLogo />
        </div>
        <div className=" space-y-4">
          <div className=" bg-slate-700 rounded-full cursor-pointer p-2 ">
            <LayoutGrid stroke="white" />
          </div>
          <div className=" hover:bg-slate-700 hover:rounded-full  cursor-pointer p-2 ">
            <User2 stroke="white" />
          </div>
          <div className=" hover:bg-slate-700 hover:rounded-full cursor-pointer p-2 ">
            <Calendar stroke="white" />
          </div>
          <div className=" hover:bg-slate-700 hover:rounded-full cursor-pointer p-2 ">
            <KanbanSquare stroke="white" />
          </div>
          <div className=" hover:bg-slate-700 hover:rounded-full cursor-pointer p-2 ">
            <UploadCloud stroke="white" />
          </div>
          <div className=" hover:bg-slate-700 hover:rounded-full cursor-pointer p-2 ">
            <Layers stroke="white" />
          </div>
        </div>
      </div>
      <div className=" cursor-pointer">
        <LogOut stroke="white" />
      </div>
    </div>
  );
};

export default MiniSidebar;
