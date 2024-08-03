/* eslint-disable react/jsx-key */
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
import useGetAllDoctors from "../../hooks/useGetAllDoctors";
import RemoveDoctorButton from "../../components/RemoveDoctorButton/RemoveDoctorButton";

const columnHelper = createColumnHelper();

const MedicalCenterDoctorTable = () => {
  const [params, _] = useSearchParams();
  const { doctors } = useGetAllDoctors();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const filteredData = useMemo(() => {
    const search = params.get("search")?.toLowerCase() || "";
    return doctors.filter((doctor) =>
      Object.values(doctor).some((value) =>
        String(value).toLowerCase().includes(search)
      )
    );
  }, [params.get("search"), doctors]);
  const columns = useMemo(
    () => [
      columnHelper.accessor("fullName", {
        id: "fullName",
        header: () => <span className={css.headerInfo}>Nombre Completo</span>,
      }),
      columnHelper.accessor("id", {
        id: "id",
        header: () => <span className={css.headerInfo}>ID</span>,
        cell: ({ getValue }) => (
          <span className="w-full h-full inline-block whitespace-nowrap overflow-hidden text-ellipsis">
            {getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("identification", {
        id: "identification",
        header: () => <span className={css.headerInfo}>N# de Cuil</span>,
      }),
      columnHelper.accessor("email", {
        id: "email",
        header: () => <span className={css.headerInfo}>Contacto</span>,
        minSize: 216,
      }),
      columnHelper.display({
        id: "actions",
        header: () => <span className="no-style"></span>,
        cell: ({ row }) => <RemoveDoctorButton id={row.original.id} />,
        maxSize: 45,
        minSize: 45,
      }),
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
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
    autoResetPageIndex: true,
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
