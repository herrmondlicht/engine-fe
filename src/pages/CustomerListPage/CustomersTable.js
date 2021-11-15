import React, { useMemo } from "react";
import Delete from "@heroicons/react/solid/TrashIcon";
import { useHistory } from "react-router-dom";

import { Table } from "components";
import { Button, BUTTON_VARIANTS } from "ui-fragments";

const CustomersTable = ({ data, onDelete }) => {
  const history = useHistory();
  const columns = useMemo(
    () => [
      {
        Header: "Placa",
        accessor: row => {
          return row?.customer_cars?.license_plate;
        },
      },
      {
        Header: "Modelo",
        accessor: row => {
          return row?.cars?.model;
        },
      },
      {
        Header: "Cliente",
        accessor: row => {
          return row?.customers?.fullname;
        },
      },
      {
        Header: "Ano do Veículo",
        accessor: row => {
          return row?.cars?.manufacture_year;
        },
      },
      {
        Header: "Ações",
        id: "actions",
        Cell: ({ row }) => (
          <div className="flex justify-end">
            <Button
              variant={BUTTON_VARIANTS.GHOST}
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                onDelete({ id: row?.original?.customer_cars?.id });
              }}
            >
              <Delete className="text-error-1 w-7 h-7" />
            </Button>
          </div>
        ),
      },
    ],
    [onDelete]
  );
  return (
    <Table
      data={data}
      columns={columns}
      onRowClick={row => history.push(`/customers/${row?.customer_cars.id}`)}
    />
  );
};

export { CustomersTable };
