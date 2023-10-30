import {
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Flex,
  Text,
  TextFieldInput,
} from "@radix-ui/themes";
import { PlusCircle } from "lucide-react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addColumn } from "../../redux/slices/boardSlice";

const AddColumn = () => {
  const [columnName, setColumnName] = useState("");
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const { boards, activeBoardIndex } = useSelector(
    (state) => state.kanban_board,
  );

  const handleSavebtn = () => {
    if (columnName) {
      dispatch(addColumn({ columnName, boardId: boards[activeBoardIndex].id }));
      setColumnName("");
    }
  };

  return (
    <DialogRoot>
      <DialogTrigger>
        <div className=" min-w-full h-full flex flex-col gap-4 bg-[#24262C] rounded-xl py-2 items-center justify-center cursor-pointer  ">
          <PlusCircle size={100} className=" bg-slate-700 p-4 rounded-full" />
          <p className=" text-2xl font-medium text-slate-400">Add Column</p>
        </div>
      </DialogTrigger>
      <DialogContent className=" bg-[#18191b] text-white">
        <DialogTitle>Add New Column</DialogTitle>
        <DialogDescription className=" pb-4">
          create a new column
        </DialogDescription>
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Column Name
            </Text>
            <TextFieldInput
              ref={inputRef}
              color="blue"
              placeholder="Enter column name"
              className=" bg-slate-950 text-white"
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  inputRef.current.click();
                }
              }}
            />
          </label>
        </Flex>
        <Flex gap="3" mt="4" justify="end">
          <DialogClose>
            <Button
              variant="soft"
              className=" bg-slate-600 text-white cursor-pointer"
              onClick={() => setColumnName("")}
            >
              Cancel
            </Button>
          </DialogClose>
          <DialogClose ref={inputRef}>
            <Button
              onClick={handleSavebtn}
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

export default AddColumn;
