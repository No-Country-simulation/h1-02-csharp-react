import { useMemo } from "react";
import css from "../../styles/table.module.css";

export default function TableContainer({ table, children }) {
  const columnSizeVars = useMemo(() => {
    const headers = table.getFlatHeaders();
    const colSizes = {};

    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      colSizes[`--header-${header.id}-size`] = header.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
    }
    return colSizes;
  }, [table.getState().columnSizingInfo, table.getState().columnSizing]);

  return (
    <div
      {...{
        className: `${css.divTable} shadow-glass-effect rounded-[16px]`,
        style: {
          ...columnSizeVars,
          width: table.getTotalSize(),
        },
      }}
    >
      {children}
    </div>
  );
}
