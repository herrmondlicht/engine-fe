import React from "react";
import { Input, Card, Button } from "ui-fragments";

const CustomerForm = () => {
  return (
    <div>
      <Card>
        <p className="text-sm text-gray-600">Nova OS</p>
        <div className="my-3">
          <p className="text-2xl font-bold">Dados do Cliente</p>
        </div>
        <div className="mt-3">
          <div className="flex">
            <div className="w-1/3">
              <Input fw label="CPF" placeholder="CPF" />
            </div>
            <div className="ml-12 w-full">
              <Input fw label="Endereço" placeholder="Endereço" />
            </div>
          </div>
          <div className="flex mt-3">
            <div className="w-1/3">
              <Input fw label="Email" placeholder="Email" />
            </div>
            <div className="ml-12 w-full flex">
              <div className="w-full">
                <Input fw label="Nome" placeholder="Nome" />
              </div>
              <div className="ml-12 w-full">
                <Input fw label="Telefone" placeholder="Telefone" />
              </div>
            </div>
          </div>
          <div className="mt-12 flex justify-end">
            <Button>Registrar Usuário</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export { CustomerForm };
