import React from "react";

const Table = ({ columns, data }) => {
  return (
    <table className="h-full w-full table-auto">
      <thead>
        <tr className="my-5">
          <td>Placa</td>
          <td>Modelo</td>
          <td>Cliente</td>
          <td>Ano do veículo</td>
          <td />
        </tr>
      </thead>
      <tbody>
        {data.map(
          (
            { cars: car, customers: customer, customer_cars: customerCar },
            index
          ) => (
            <tr
              onClick={() =>
                history.push(`/customers/${customer.id}/cars/${customerCar.id}`)
              }
              key={customerCar.id}
              className={`hover:bg-gray-300 cursor-pointer ${
                index % 2 ? "bg-gray-100" : ""
              }`}
            >
              <td>{customerCar.license_plate}</td>
              <td>{car.model}</td>
              <td>{customer.fullname}</td>
              <td>{car.manufacture_year}</td>
              <td>
                <div className="flex justify-end"></div>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export { Table };
