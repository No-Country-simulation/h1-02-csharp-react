import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
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
import { HeartIcon } from "../icons";


const columnHelper = createColumnHelper();

const PatientsTable = ({ patients, onAddRecordClick }) => {
  const [params, _] = useSearchParams();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const formattedPatients = useMemo(() => {
    return patients.map((patient) => ({
      ...patient,
      fullName: `${patient.firstName} ${patient.lastName}`,
    }));
  }, [patients]);

  const filteredData = useMemo(() => {
    const search = params.get("search")?.toLowerCase() || "";
    return formattedPatients.filter((patient) =>
      Object.values(patient).some((value) =>
        String(value).toLowerCase().includes(search)
      )
    );
  }, [params.get("search"), formattedPatients]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("fullName", {
        id: "fullName",
        header: () => <span className={css.headerInfo}>Nombre Completo</span>,
        cell: ({ getValue }) => (
          <span className="w-full h-auto inline-block whitespace-nowrap overflow-hidden text-ellipsis">
            {getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("id", {
        id: "id",
        header: () => <span className={css.headerInfo}>ID</span>,
        cell: ({ getValue }) => (
          <span className="w-full h-auto inline-block whitespace-nowrap overflow-hidden text-ellipsis">
            {getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("identificationNumber", {
        id: "identificationNumber",
        header: () => <span className={css.headerInfo}>CUIL</span>,
      }),
      columnHelper.accessor("email", {
        id: "email",
        header: () => <span className={css.headerInfo}>Contacto</span>,
        minSize: 216,
      }),
      columnHelper.display({
        id: "actions",
        header: () => (
          <span className={`${css.headerInfo} no-resize`}>Acciones</span>
        ),
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => onAddRecordClick(row.original)}
              className="flex justify-center items-center gap-1 text-primary font-normal px-1 w-full"
            >
              <HeartIcon /> Agregar Record
            </button>           
          </div>
        ),
        maxSize: 150,
        minSize: 150,
      }),
    ],
    [onAddRecordClick]    
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: "off",
    defaultColumn: {
      minSize: 80,
      size: 216,
      maxSize: 300,
    },
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    autoResetPageIndex: true,
  });

  return (
    <div className={`${css.tableWrapper} items-center`}>
      <TableContainer table={table}>
        <TableHeader table={table} />
        <TableBodyWrapper table={table} />
      </TableContainer>
      <PaginationControls table={table} pagination={pagination} />
    </div>
  );
};

export default PatientsTable;
