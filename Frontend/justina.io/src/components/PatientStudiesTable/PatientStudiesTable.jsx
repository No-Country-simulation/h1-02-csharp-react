/* eslint-disable react/jsx-key */
import downloadIcon from '../../assets/icons/downloadIcon.svg'
import { useState, useMemo } from "react";
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
import useGetPatientStudies from "../../hooks/useGetPatientStudies";
import { useEffect } from "react";

const columnHelper = createColumnHelper();

const PatientStudiesTable = () => {
  const { patientStudies, handleGetPatientStudies } = useGetPatientStudies();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  useEffect(() => {
    handleGetPatientStudies();
  }, []);

  const columns = useMemo(
    () => [
      columnHelper.accessor("num", {
        id: "num",
        header: () => <span className={css.headerInfo}>N°</span>,
        cell: ({ getValue }) => (
          <span className="w-full h-auto inline-block whitespace-nowrap overflow-hidden text-ellipsis">
            {getValue()}
          </span>
        ),
        minSize: 50,
        maxSize: 50,
      }),
      columnHelper.accessor("name", {
        id: "name",
        header: () => <span className={css.headerInfo}>Nombre</span>,
        cell: ({ getValue }) => (
          <span className="w-full h-auto inline-block whitespace-nowrap overflow-hidden text-ellipsis">
            {getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("date", {
        id: "date",
        header: () => <span className={css.headerInfo}>Fecha</span>,
      }),
      columnHelper.accessor("download", {
        id: "download",
        //La clase no-resize ponee en display none el rezieButton para que no se pueda modificar
        header: () => (
          <span className={`${css.headerInfo} no-resize`}>Descarga</span>
        ),
        cell: ({ getValue }) => (
          <span className="w-full h-auto flex justify-center items-center">
            <a href={getValue()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full outline-none border-none bg-transparent">
            <img src={downloadIcon} alt="Descargar" className="h-8 w-8 rounded-full shadow-custom" />
          </a>
          </span>
        )
      }),
    ],
    []
  );

  const table = useReactTable({
    data: patientStudies || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: "onChange",
    defaultColumn: {
      minSize: 80, //Valor minimo de las columnas (Se puede modificar desde columns)
      size: 250, //Valor por defecto de las columnas (Se puede modificar desde columns)
      maxSize: 300, //Valor maximo de las columnas (Se puede modificar desde columns)
    },
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
    autoResetPageIndex: true, //Reiniciar la paginacion, cuanda el valor de data cambie
  });

  return (
    <div className={css.tableWrapper}>
      <TableContainer table={table}>
        <TableHeader table={table} />
        <TableBodyWrapper table={table} />
      </TableContainer>
      <PaginationControls table={table} pagination={pagination} />
    </div>
  );
};

export default PatientStudiesTable;
