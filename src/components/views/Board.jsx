import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveColumn,
  setActiveTask,
  setColumns,
  setTasks,
} from "../../redux/slices/boardSlice";
import AddColumn from "./AddColumn";
import Column from "./Column";
import Task from "./Task";

const Board = () => {
  const [dragTaskColumnId, setDragTaskColumnId] = useState();

  const { boards, activeBoardIndex, activeColumn, activeTask } = useSelector(
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

    if (e.active.data.current?.type === "Task") {
      dispatch(setActiveTask(e.active.data.current.task));
      return;
    }
  };

  const handleDragEnd = (e) => {
    setDragTaskColumnId(null);
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = e;

    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    // Column swapping not happening on task drop
    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    dispatch(setColumns({ activeColumnId, overColumnId }));
  };

  const handleDragOver = (e) => {
    const { active, over } = e;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    const activeTaskColumnId = active.data.current?.columnId;
    const overTaskColumnId = over.data.current?.columnId;

    // setDragTaskColumnId(activeTaskColumnId);

    // let overTaskId;

    // if (isActiveATask && isOverATask) {
    //   overTaskId = over.data.current?.task.id;
    // }

    if (isActiveATask && isOverATask) {
      dispatch(
        setTasks({
          columnId: activeTaskColumnId,
          activeTaskId: active.id,
          overTaskId: over.id,
          overColumnId:
            activeTaskColumnId === overTaskColumnId
              ? activeTaskColumnId
              : overTaskColumnId, // Add the overColumnId to the payload
        }),
      );
    }

    // Dropping a task over a column
    const isOverAColumn = over.data.current?.type === "Column";

    if (
      (isActiveATask && isOverAColumn) ||
      activeTaskColumnId !== overTaskColumnId
    ) {
      dispatch(
        setTasks({
          columnId: activeTaskColumnId,
          activeTaskId: active.id,
          overColumnId: over.id,
          overTaskId: null, //
        }),
      );
    }
  };

  return (
    <div className=" flex-grow min-h-0 overflow-auto pt-4 pb-2 ">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
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
            {activeTask && (
              <Task columnId={dragTaskColumnId} task={activeTask} />
            )}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );
};

export default Board;
