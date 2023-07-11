import { FormEvent, useState } from "react";
import { MdAdd } from "react-icons/md";

import Button from "@/lib/components/ui/Button";
import Field from "@/lib/components/ui/Field";
import Modal from "@/lib/components/ui/Modal";
import { useBrainContext } from "@/lib/context/BrainProvider/hooks/useBrainContext";

export const AddBrainModal = (): JSX.Element => {
  const [newBrainName, setNewBrainName] = useState("");
  const [isPending, setIsPending] = useState(false);

  const { createBrain } = useBrainContext();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newBrainName.trim() === "" || isPending) {
      return;
    }
    setIsPending(true);
    await createBrain(newBrainName);
    setNewBrainName("");
    setIsPending(false);
  };

  return (
    <Modal
      Trigger={
        <Button variant={"secondary"}>
          Thêm trợ lý mới
          <MdAdd className="text-xl" />
        </Button>
      }
      title="Thêm trợ lý"
      desc="Thêm trợ lý AI cho công ty của bạn"
    >
      <form
        onSubmit={(e) => void handleSubmit(e)}
        className="my-10 flex items-center gap-2"
      >
        <Field
          name="brainname"
          label="Nhập tên trợ lý"
          autoFocus
          placeholder="Vd trợ lý bán hàng"
          autoComplete="off"
          value={newBrainName}
          onChange={(e) => setNewBrainName(e.currentTarget.value)}
          className="flex-1"
        />
        <Button isLoading={isPending} className="self-end" type="submit">
          Create
          <MdAdd className="text-xl" />
        </Button>
      </form>
    </Modal>
  );
};
