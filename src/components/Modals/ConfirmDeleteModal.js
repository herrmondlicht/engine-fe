import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";

function ConfirmDeleteModal({ handleClose, isOpen, onConfirmationClick }) {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Excluir</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Tem certeza que quer excluir o cliente? Essa ação não poderá ser
          revertida
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Não
        </Button>
        <Button onClick={onConfirmationClick} color="primary" autoFocus>
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteModal;
