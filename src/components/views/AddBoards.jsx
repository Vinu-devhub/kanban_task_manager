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
import { useDispatch } from "react-redux";
import { addBoard } from "../../redux/slices/boardSlice";

const AddBoards = () => {
  const [boardName, setBoardName] = useState("");
  const dispatch = useDispatch();

  const inputRef = useRef(null);

  const handleSavebtn = () => {
    if (boardName) {
      dispatch(addBoard(boardName));
      setBoardName("");
    }
  };

  return (
    <DialogRoot>
      <DialogTrigger>
        <div>
          <Button className=" w-full p-6 items-center bg-slate-800 hover:bg-slate-900 cursor-pointer mt-4 ">
            <PlusCircle width={20} height={20} />
            <p className=" text-base">Add New Board</p>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className=" bg-[#18191b] text-white">
        <DialogTitle>Add New Board</DialogTitle>
        <DialogDescription className=" pb-4">
          create a new board
        </DialogDescription>
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Board Name
            </Text>
            <TextFieldInput
              ref={inputRef}
              color="blue"
              placeholder="Enter board name"
              className=" bg-slate-950 text-white"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
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
              onClick={() => setBoardName("")}
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

export default AddBoards;
