import React from "react";
import { useHistory } from "react-router-dom";

import { AddServiceButton } from "components";
import { Button, BUTTON_VARIANTS, Modal, Text } from "ui-fragments";

const CreateServiceModal = ({ handleClose, customerCarId, isOpen }) => {
  const history = useHistory();
  return (
    <Modal isOpen={isOpen} handleClose={handleClose} title="Cliente Adicionado">
      <div>
        <div className="my-5">
          <Text>
            Você pode adicionar uma ordem de serviço para esse cliente
          </Text>
        </div>
        <div className="mt-4 flex gap-3 justify-end">
          <Button
            variant={BUTTON_VARIANTS.GHOST}
            onClick={handleClose}
            showVariantIcon={false}
          >
            Cancelar
          </Button>
          <AddServiceButton
            customerCarId={customerCarId}
            onServiceAdd={data =>
              history.push(`/services/${data.id}`, {
                redirect: `/customers/${customerCarId}`,
              })
            }
          >
            <Text>Adicionar Também o Serviço</Text>
          </AddServiceButton>
        </div>
      </div>
    </Modal>
  );
};

export { CreateServiceModal };
