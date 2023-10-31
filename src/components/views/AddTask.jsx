import {
  Button,
  DialogClose,
  DialogContent,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Flex,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  Text,
  TextArea,
  TextFieldInput,
} from "@radix-ui/themes";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/slices/boardSlice";

const AddTask = ({ columnId }) => {
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectValue(event);
  };

  const handleSubmit = (e) => {
    if (!inputValue || !selectValue) {
      e.preventDefault();
      setError(`${!inputValue ? "name" : "priority"}`);
      return;
    }

    dispatch(
      addTask({
        columnId,
        title: inputValue,
        description: textareaValue,
        priority: selectValue,
        date: new Date().toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      }),
    );

    setInputValue("");
    setTextareaValue("");
    setSelectValue("");
    setError("");
  };

  return (
    <DialogRoot>
      <DialogTrigger>
        <div className=" h-20 w-full border-2 bg-[#292B31] shadow-md hover:shadow-lg border-dashed border-white/40 rounded-xl p-3 flex items-center justify-center gap-4 cursor-pointer hover:scale-105 active:scale-95 duration-300">
          <PlusCircle />
          <span className=" text-lg">Add Task</span>
        </div>
      </DialogTrigger>
      <DialogContent className=" bg-[#18191b] text-white">
        <DialogTitle>Add New Task</DialogTitle>
        <Flex direction="column" gap="4">
          <label>
            <Text as="div" size="2" mb="2" weight="bold">
              Task Name
            </Text>
            <TextFieldInput
              color="blue"
              placeholder="Enter task name"
              className=" bg-slate-950 text-white placeholder:text-white"
              value={inputValue}
              onChange={handleInputChange}
              required
            />
            {error === "name" && (
              <span className=" text-red-500">Task name is required *</span>
            )}
          </label>
          <label>
            <Text as="div" size="2" mb="2" weight="bold">
              Task Description
            </Text>
            <TextArea
              size="3"
              variant="classic"
              color="blue"
              placeholder="Enter task description"
              value={textareaValue}
              onChange={handleTextareaChange}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="2" weight="bold">
              Task Priority
            </Text>
            <SelectRoot value={selectValue} onValueChange={handleSelectChange}>
              <SelectTrigger
                placeholder="Select a priority..."
                className=" w-full border cursor-pointer bg-slate-950"
              />
              {error === "priority" && (
                <span className=" text-red-500">
                  Please select a priority *
                </span>
              )}
              <SelectContent
                className=" bg-slate-950 text-white"
                position="popper"
                side="bottom"
              >
                <SelectItem value="High" className=" cursor-pointer">
                  High
                </SelectItem>
                <SelectItem value="Medium" className=" cursor-pointer">
                  Medium
                </SelectItem>
                <SelectItem value="Low" className=" cursor-pointer">
                  Low
                </SelectItem>
              </SelectContent>
            </SelectRoot>
          </label>
        </Flex>
        <Flex gap="3" mt="4" justify="end">
          <DialogClose>
            <Button
              variant="soft"
              className=" bg-slate-600 text-white cursor-pointer"
            >
              Cancel
            </Button>
          </DialogClose>
          <DialogClose>
            <Button
              onClick={handleSubmit}
              className=" bg-blue-600 cursor-pointer"
            >
              Save
            </Button>
          </DialogClose>
        </Flex>
      </DialogContent>
    </DialogRoot>
  );
};

export default AddTask;
