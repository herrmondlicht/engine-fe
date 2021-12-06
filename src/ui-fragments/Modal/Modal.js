import React from "react";
import RawModal from "react-modal";
import { Card, Title } from "ui-fragments";

RawModal.setAppElement("#root");

const Modal = ({ handleClose, isOpen, children, title, style = {} }) => {
  return (
    <RawModal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Example Modal"
      className="flex bg-transparent p-2 border-0 w-full h-full justify-center items-center overflow-hidden"
      style={{
        overlay: {
          background: "rgba(0,0,0,0.5)",
          zIndex: 100,
        },
      }}
    >
      <div className="flex ">
        <Card className="flex flex-col w-full">
          {typeof title === "string" ? <Title>{title}</Title> : title}
          <div className="mt-3">{children}</div>
        </Card>
      </div>
    </RawModal>
  );
};

export { Modal };
