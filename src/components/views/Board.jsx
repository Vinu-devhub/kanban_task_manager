import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useMemo } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActiveColumn, setColumns } from "../../redux/slices/boardSlice";
import AddColumn from "./AddColumn";
import Column from "./Column";

const Board = () => {
  const { boards, activeBoardIndex, activeColumn } = useSelector(
    (state) => state.kanban_board,
  );
  const dispatch = useDispatch();

  const columnsIds = useMemo(
    () => boards[activeBoardIndex].columns.map((col) => col.id),
    [boards, activeBoardIndex],
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  );

  const handleDragStart = (e) => {
    if (e.active.data.current?.type === "Column") {
      dispatch(setActiveColumn(e.active.data.current.column));
      return;
    }
  };

  const handleDragOver = (e) => {
    const { active, over } = e;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    dispatch(setColumns({ activeColumnId, overColumnId }));
  };

  return (
    <div className=" flex-grow min-h-0 overflow-auto pt-4 pb-2 ">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
      >
        <div className=" flex  gap-4 w-72 h-full">
          <SortableContext items={columnsIds}>
            {boards[activeBoardIndex].columns.map((item) => (
              <Column key={item.id} column={item} />
            ))}
          </SortableContext>
          <AddColumn />
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && <Column column={activeColumn} />}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );
};

export default Board;
