import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogRoot,
  AlertDialogTitle,
  Button,
  Flex,
} from "@radix-ui/themes";

const DeleteModal = ({
  openModal,
  deleteTitle,
  handleCancel,
  handleDelete,
}) => {
  return (
    <AlertDialogRoot open={openModal}>
      <AlertDialogContent
        style={{ maxWidth: 450 }}
        className=" bg-[#18191b] text-white"
      >
        <AlertDialogTitle>
          Delete <span className=" capitalize font-bold">{deleteTitle}</span>{" "}
        </AlertDialogTitle>
        <AlertDialogDescription size="3">
          Are you sure? This {deleteTitle} will no longer be accessible.
        </AlertDialogDescription>

        <Flex gap="3" mt="4" justify="end">
          <Button
            variant="soft"
            color="gray"
            className=" bg-slate-600 text-white cursor-pointer"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="solid"
            color="red"
            onClick={handleDelete}
            className=" cursor-pointer bg-red-600 hover:bg-red-800 "
          >
            Delete
          </Button>
        </Flex>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
};

export default DeleteModal;
