import {
  Button,
  DialogClose,
  DialogContent,
  DialogRoot,
  DialogTitle,
  Flex,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  Text,
  TextArea,
  TextFieldInput,
} from "@radix-ui/themes";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../../redux/slices/boardSlice";
import {
  setEditTaskId,
  setEditTaskMode,
  setNewTaskColumnId,
} from "../../redux/slices/taskSlice";

const AddTask = ({ columnId, title, description, priority }) => {
  const [values, setValues] = useState({
    inputValue: title || "",
    textareaValue: description || "",
    selectValue: priority || "",
    error: "",
  });

  const { editTaskMode, newTaskColumnId, editTaskId } = useSelector(
    (state) => state.taskState,
  );

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { inputValue, selectValue } = values;

    if (!inputValue || !selectValue) {
      setValues({ ...values, error: inputValue ? "priority" : "name" });
      return;
    }

    if (newTaskColumnId) {
      dispatch(
        addTask({
          columnId,
          title: inputValue,
          description: values.textareaValue,
          priority: selectValue,
          date: new Date().toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        }),
      );
    }

    if (editTaskId) {
      dispatch(
        editTask({
          taskId: editTaskId,
          title: inputValue,
          description: values.textareaValue,
          priority: selectValue,
          date: new Date().toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        }),
      );
    }

    dispatch(setEditTaskMode(false));
    dispatch(setNewTaskColumnId(null));
    dispatch(setEditTaskId(null));
    setValues({
      ...values,
      inputValue: "",
      textareaValue: "",
      selectValue: "",
      error: "",
    });
  };

  const handleCancel = () => {
    dispatch(setEditTaskId(null));
    dispatch(setEditTaskMode(false));
    dispatch(setNewTaskColumnId(null));
    setValues({
      ...values,
      inputValue: "",
      textareaValue: "",
      selectValue: "",
      error: "",
    });
  };

  return (
    <DialogRoot open={editTaskMode}>
      <DialogContent className=" bg-[#18191b] text-white">
        <DialogTitle>{!title ? "Add New Task" : "Edit Task"}</DialogTitle>
        <Flex direction="column" gap="4">
          <label>
            <Text as="div" size="2" mb="2" weight="bold">
              Task Name
            </Text>
            <TextFieldInput
              color="blue"
              placeholder="Enter task name"
              className=" bg-slate-950 text-white placeholder:text-white"
              name="inputValue"
              value={values.inputValue}
              onChange={handleChange}
              required
            />
            {values.error === "name" && (
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
              name="textareaValue"
              placeholder="Enter task description"
              value={values.textareaValue}
              onChange={handleChange}
            />
          </label>
          <label>
            <Text as="div" size="2" mb="2" weight="bold">
              Task Priority
            </Text>
            <SelectRoot
              value={values.selectValue}
              onValueChange={(event) => {
                setValues({ ...values, selectValue: event });
              }}
            >
              <SelectTrigger
                placeholder="Select a priority..."
                className=" w-full border cursor-pointer bg-slate-950"
              />
              {values.error === "priority" && (
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
              onClick={handleCancel}
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
