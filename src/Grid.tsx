import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useMemo, useState } from "react";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import data from "./data.json";

interface RowData {
  id: number;
  accountId: number;
  customerId: number;
  dateOfOrder: Date;
  account: {
    id: number;
    customerId: number;
    accountNumber: string;
    name: string;
    amount: string;
  };
  customer: {
    name: string;
  };
  orderItems: {
    orderId: number;
    productId: number;
    quantity: number;
  }[];
}

export default function Grid() {
  const [columnDefs] = useState<ColDef<RowData>[]>([
    {
      headerName: "Customer Name",
      field: "customer.name",
      filter: true,
    },
    {
      headerName: "Account No",
      field: "account.accountNumber",
      filter: "agNumberColumnFilter",
    },
    {
      headerName: "Date of Order",
      field: "dateOfOrder",
      filter: "agDateColumnFilter",
    },
    {
      headerName: "Total",
      filter: "agNumberColumnFilter",
    },
  ]);
  const rowData = useMemo<RowData[]>(() => {
    return data.orders.map((order) => ({
      ...order,
      // create Date object value for dateOfOrder field
      dateOfOrder: new Date(`${order.dateOfOrder.slice(0, 10)}T00:00:00.0`),
      account: data.accounts.find((account) => account.id === order.accountId)!,
      customer: data.customers.find(
        (customer) => customer.id === order.customerId
      )!,
      orderItems: data.orderItems.filter((item) => item.orderId === order.id),
    }));
  }, [data]);

  return (
    <div className="ag-theme-quartz-auto-dark">
      <AgGridReact columnDefs={columnDefs} rowData={rowData}></AgGridReact>
    </div>
  );
}
