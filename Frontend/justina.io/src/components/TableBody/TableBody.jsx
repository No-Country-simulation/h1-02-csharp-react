/* eslint-disable react/jsx-key */
import css from "../../styles/table.module.css";
import { flexRender } from "@tanstack/react-table";

function TableBody({ table }) {
  return (
    <div className={css.tbody}>
      {table.getRowModel().rows.map((row) => (
        <div key={row.id} className={css.tr}>
          {row.getVisibleCells().map((cell) => (
            <div
              key={cell.id}
              {...{
                className: `${css.td} td`,
                style: {
                  width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
                },
              }}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TableBody;
