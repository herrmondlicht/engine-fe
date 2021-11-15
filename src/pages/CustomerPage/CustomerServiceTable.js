import React, { useMemo } from "react";
import Delete from "@heroicons/react/solid/TrashIcon";
import Annotation from "@heroicons/react/solid/AnnotationIcon";

import { useHistory } from "react-router";

import { Table } from "components";
import { Button, BUTTON_VARIANTS } from "ui-fragments";
import { toBRL } from "utils";

const CustomerServiceTable = ({ data = [], onDelete, onNotesClick }) => {
  const history = useHistory();
  const columns = useMemo(
    () => [
      {
        Header: "Mão de Obra",
        accessor: row => {
          return toBRL(row?.service_price);
        },
      },
      {
        Header: "Preço das peças",
        accessor: row => {
          return toBRL(row?.service_items_price);
        },
      },
      {
        Header: "Desconto",
        accessor: row => {
          return toBRL(row?.discount ?? 0);
        },
      },
      {
        Header: "Data",
        accessor: row => {
          return new Date(row?.created_at)?.toLocaleDateString("pt-BR", {
            timeZone: "UTC",
          });
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
                onNotesClick?.(row?.original);
              }}
            >
              <Annotation className="w-7 h-7" />
            </Button>
            <Button
              variant={BUTTON_VARIANTS.GHOST}
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                onDelete?.(row?.original);
              }}
            >
              <Delete className="text-error-1 w-7 h-7" />
            </Button>
          </div>
        ),
      },
    ],
    [onDelete, onNotesClick]
  );

  return (
    <Table
      data={data}
      columns={columns}
      onRowClick={row =>
        history.push(`/services/${row?.id}`, {
          redirect: `/customers/${row?.customer_car_id}`,
        })
      }
    />
  );
};

export { CustomerServiceTable };
