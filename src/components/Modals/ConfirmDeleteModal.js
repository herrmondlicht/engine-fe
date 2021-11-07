import React from "react";
import { Modal, Button, Text, BUTTON_VARIANTS } from "ui-fragments";

function ConfirmDeleteModal({
  handleClose,
  isOpen,
  onConfirmationClick,
  isLoading,
}) {
  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Excluir">
      <div>
        <div>
          <Text>
            Tem certeza que quer excluir? Essa ação não poderá ser revertida
          </Text>
        </div>
        <div className="mt-4 flex gap-3 justify-end">
          <Button
            variant={BUTTON_VARIANTS.ERROR}
            onClick={handleClose}
            showVariantIcon={false}
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirmationClick}
            variant={BUTTON_VARIANTS.GHOST}
            showLoader={isLoading}
          >
            Excluir
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDeleteModal;
