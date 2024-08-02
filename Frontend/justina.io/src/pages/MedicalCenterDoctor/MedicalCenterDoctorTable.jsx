/* eslint-disable react/jsx-key */
import { useState } from "react";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import TableBodyWrapper from "../../components/TableBody/TableBodyWrapper";
import css from "../../styles/table.module.css";
import TableHeader from "../../components/TableHeader/TableHeader";
import PaginationControls from "../../components/PaginationControls/PaginationControls";
import TableContainer from "../../components/TableContainer/TableContainer";
import { DOCTOR_LIST_MOCKED } from "../../constants/mocks";

const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor("fullName", {
    //cell: (info) => info.getValue(),
    id: "fullName",
    header: () => <span className={css.headerInfo}>Nombre Completo</span>,
  }),
  columnHelper.accessor("id", {
    //cell: (info) => info.getValue(),
    id: "id",
    header: () => <span className={css.headerInfo}>ID</span>,
  }),
  columnHelper.accessor("identification", {
    id: "identification",
    //cell: (info) => info.getValue(),
    header: () => <span className={css.headerInfo}>N# de Cuil</span>,
  }),
  columnHelper.accessor("email", {
    id: "email",
    //cell: (info) => info.getValue(),
    header: () => <span className={css.headerInfo}>Contacto</span>,
    minSize: 216,
  }),
];

const MedicalCenterDoctorTable = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const table = useReactTable({
    data: DOCTOR_LIST_MOCKED,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: "onChange",
    defaultColumn: {
      minSize: 80,
      size: 216,
      maxSize: 300,
    },
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    autoResetPageIndex: false,
  });

  return (
    <div className={css.tableWrapper}>
      <TableContainer table={table}>
        <TableHeader table={table} />
        <TableBodyWrapper table={table} />
        <PaginationControls table={table} pagination={pagination} />
      </TableContainer>
    </div>
  );
};

export default MedicalCenterDoctorTable;
