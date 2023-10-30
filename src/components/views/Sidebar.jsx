import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogRoot,
  AlertDialogTitle,
  Button,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  Flex,
} from "@radix-ui/themes";
import {
  GalleryHorizontalEnd,
  MoreHorizontal,
  PenSquare,
  Trash,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBoard,
  editBoardName,
  setActiveBoardIndex,
} from "../../redux/slices/boardSlice";
import AddBoards from "./AddBoards";

const Sidebar = () => {
  const [editName, setEditName] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editBoardIndex, setEditBoardIndex] = useState(-1);
  const [boardId, setBoardId] = useState(-1);
  const [boardName, setBoardName] = useState("");

  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    setBoardName(e.target.value);
  };

  const { boards, activeBoardIndex } = useSelector(
    (state) => state.kanban_board,
  );

  return (
    <div className=" w-72 h-full bg-[#222327] text-white p-7">
      <div className=" space-y-20">
        <div className=" text-3xl font-semibold leading-8">Projects</div>
        <div className="">
          <p className=" text-xl font-medium pl-1 pt-1">
            Boards ({boards.length})
          </p>
          <div className=" space-y-4 py-4 ">
            {boards.map((board, index) => (
              <div
                key={board.id}
                className={`flex gap-2 items-center justify-between hover:bg-slate-900 hover:ring-2 hover:ring-white outline-none ${
                  index === activeBoardIndex ? "bg-blue-600" : ""
                } ${
                  editName && editBoardIndex === index
                    ? "bg-slate-900 ring-2 ring-blue-500"
                    : ""
                }  cursor-pointer p-2 rounded-md relative`}
                onClick={() => {
                  dispatch(setActiveBoardIndex(index));
                }}
              >
                <div className=" flex items-center gap-2">
                  <GalleryHorizontalEnd width={20} height={20} />
                  {editName && editBoardIndex === index ? (
                    <input
                      value={boardName}
                      onChange={handleNameChange}
                      className=" bg-transparent border-none outline-none w-32 "
                      maxLength={20}
                      autoFocus
                      onBlur={() => {
                        setEditName(false);
                        setEditBoardIndex(-1);
                      }}
                      onKeyDown={(e) => {
                        if (e.key !== "Enter") return;
                        setEditName(false);
                        setEditBoardIndex(-1);
                        dispatch(editBoardName(boardName));
                      }}
                    />
                  ) : (
                    <p className=" w-32 text-base truncate">{board.title}</p>
                  )}
                </div>
                <DropdownMenuRoot>
                  ({board.columns.length})
                  <DropdownMenuTrigger asChild>
                    <MoreHorizontal
                      className={`${
                        index === activeBoardIndex ? "visible" : "invisible"
                      } stroke-white hover:stroke-red-600 `}
                      width={20}
                      height={20}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className=" bg-slate-900 text-white">
                    <DropdownMenuItem
                      className=" space-x-8 cursor-pointer"
                      onClick={() => {
                        setEditBoardIndex(index);
                        setBoardName(board.title);
                        setEditName(true);
                      }}
                    >
                      <span className=" text-base ">Edit</span>
                      <span>
                        <PenSquare width={20} height={20} stroke="white" />
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className=" space-x-4 cursor-pointer"
                      color="red"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDelete(true);
                        setBoardId(board.id);
                      }}
                    >
                      <span className=" text-base">Delete</span>
                      <span>
                        <Trash width={20} height={20} stroke="white" />
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenuRoot>
              </div>
            ))}
          </div>
          <AddBoards />
        </div>
      </div>
      <AlertDialogRoot open={openDelete}>
        <AlertDialogContent
          style={{ maxWidth: 450 }}
          className=" bg-[#18191b] text-white"
        >
          <AlertDialogTitle>Delete Board</AlertDialogTitle>
          <AlertDialogDescription size="3">
            Are you sure? This board will no longer be accessible.
          </AlertDialogDescription>

          <Flex gap="3" mt="4" justify="end">
            <Button
              variant="soft"
              color="gray"
              className=" bg-slate-600 text-white cursor-pointer"
              onClick={() => {
                setOpenDelete(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              color="red"
              onClick={() => {
                dispatch(deleteBoard(boardId));
                setOpenDelete(false);
              }}
              className=" cursor-pointer bg-red-600 hover:bg-red-800 "
            >
              Delete
            </Button>
          </Flex>
        </AlertDialogContent>
      </AlertDialogRoot>
    </div>
  );
};

export default Sidebar;
