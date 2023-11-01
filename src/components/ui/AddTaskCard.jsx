import { PlusCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  setEditTaskMode,
  setNewTaskColumnId,
} from "../../redux/slices/taskSlice";

const AddTaskCard = ({ columnId }) => {
  const dispatch = useDispatch();

  return (
    <div
      className=" h-20 w-full border-2 bg-[#292B31] shadow-md hover:shadow-lg border-dashed border-white/40 rounded-xl p-3 flex items-center justify-center gap-4 cursor-pointer hover:scale-105 active:scale-95 duration-300"
      onClick={() => {
        dispatch(setEditTaskMode(true));
        dispatch(setNewTaskColumnId(columnId));
      }}
    >
      <PlusCircle />
      <span className=" text-lg">Add Task</span>
    </div>
  );
};

export default AddTaskCard;
