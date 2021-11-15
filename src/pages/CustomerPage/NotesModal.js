import React from "react";

import { Button, Modal, Text } from "ui-fragments";

const NotesModal = ({ notes, setNote }) => {
  return (
    <Modal
      handleClose={() => setNote(null)}
      isOpen={!!notes}
      title="Observações"
    >
      <div className="flex w-80 flex-col gap-5">
        <div className="flex justify-center items-center p-4 border border-solid rounded-lg">
          <Text>{notes}</Text>
        </div>
        <div className="flex items-end justify-end">
          <Button onClick={() => setNote(null)}>Fechar</Button>
        </div>
      </div>
    </Modal>
  );
};

export { NotesModal };
