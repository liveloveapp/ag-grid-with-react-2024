import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import data from "./data.json";

interface RowData {
  name: string;
  color: string;
}

export default function Grid() {
  const [columnDefs] = useState<ColDef<RowData>[]>([
    { headerName: "Name", field: "name" },
    { headerName: "Color", field: "color", sortable: false },
  ]);
  const [rowData] = useState<RowData[]>(data.products);
  const defaultColDef: ColDef<RowData> = {
    sortable: true,
  };

  return (
    <div className="ag-theme-quartz-auto-dark">
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={defaultColDef}
      ></AgGridReact>
    </div>
  );
}
