import {
  Badge,
  Button,
  Card,
  Container,
  DialogClose,
  DialogContent,
  DialogRoot,
} from "@radix-ui/themes";
import { CalendarDays, CheckSquare, ListTodo, Timer } from "lucide-react";

const DisplayTask = ({
  showTask,
  setShowTask,
  title,
  description,
  priority,
  date,
}) => {
  const gettaskPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-[#442121] text-[#EB5757]";
      case "Medium":
        return "bg-[#30352F] text-[#F2994A]";
      case "Low":
        return "bg-[#1A3131] text-[#29A073]";
      default:
        return "";
    }
  };

  return (
    <DialogRoot open={showTask}>
      <DialogContent className=" bg-slate-900 space-y-4 flex flex-col items-end ">
        <Card className=" w-full bg-slate-950 text-white border-blue-600 ">
          <Container>
            <label>
              <h1 className=" text-white text-lg font-bold flex items-center gap-2 ">
                <CheckSquare width={20} height={20} /> Task Title{" "}
              </h1>
              <p className=" min-h-max p-2 my-4 shadow rounded-md ring-2 ring-rose-700  ">
                {title}
              </p>
            </label>
            <label>
              <h1 className=" text-white text-lg font-bold flex items-center gap-2 ">
                <ListTodo />
                Task Description
              </h1>
              <p
                className={` ${
                  description ? "min-h-max" : " h-20"
                } p-4 my-4 shadow rounded-md ring-2 ring-rose-700`}
              >
                {description ? description : "No Description"}
              </p>
            </label>
            <div className=" flex justify-between">
              <label>
                <h1 className=" text-white text-base font-bold flex items-center gap-1 pb-2 ">
                  <Timer width={20} height={20} />
                  Task Priority
                </h1>
                <Badge
                  className={`${gettaskPriorityColor(
                    priority,
                  )} rounded font-semibold px-4 py-1.5 ml-6 `}
                >
                  {priority}
                </Badge>
              </label>
              <label>
                <h1 className=" text-white text-base font-bold flex items-center gap-2 pb-2 ">
                  <CalendarDays width={20} height={20} />
                  Task Date
                </h1>
                <Badge className=" bg-slate-800 text-white rounded px-3 py-2">
                  {date}
                </Badge>
              </label>
            </div>
          </Container>
        </Card>
        <DialogClose>
          <Button
            onClick={() => setShowTask(false)}
            className=" w-28  bg-rose-600 cursor-pointer"
          >
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </DialogRoot>
  );
};

export default DisplayTask;
