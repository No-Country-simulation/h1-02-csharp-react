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
    //Al hacer el tolowercase antes se evita ejecutarlo en cada iteracion del filtro
    const search = params.get("search")?.toLowerCase() || "";
    //Filtra los valores por cualquer atributo del objeto
    return doctors.filter((doctor) =>
      Object.values(doctor).some((value) =>
        String(value).toLowerCase().includes(search)
      )
    );
  }, [params.get("search"), doctors]);
  //Necesita estar dentro del componente porque el boton para eliminar usa un hook para que funcione
  //Si no tienes un campo de este esilo mejor sacarlo  fuera
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
      columnHelper.accessor("identification", {
        id: "identification",
        header: () => <span className={css.headerInfo}>N# de Cuil</span>,
      }),
      columnHelper.accessor("email", {
        id: "email",
        header: () => <span className={css.headerInfo}>Contacto</span>,
        minSize: 216, //Siempre va a tener como minimo este tamaño
      }),
      columnHelper.display({
        id: "actions",
        //La clase no-resize ponee en display none el rezieButton para que no se pueda modificar
        header: () => (
          <span className={`${css.headerInfo} no-resize`}>Eliminar</span>
        ),
        cell: ({ row }) => <RemoveDoctorButton id={row.original.id} />,
        maxSize: 80,
        minSize: 80,
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
      minSize: 80, //Valor minimo de las columnas (Se puede modificar desde columns)
      size: 216, //Valor por defecto de las columnas (Se puede modificar desde columns)
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

export default MedicalCenterDoctorTable;
