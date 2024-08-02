/* eslint-disable react/jsx-key */
import { flexRender } from "@tanstack/react-table";
import css from "../../styles/table.module.css";

function TableHeader({ table }) {
  return (
    <div className={css.thead}>
      {table.getHeaderGroups().map((headerGroup) => (
        <div key={headerGroup.id} className={css.tr}>
          {headerGroup.headers.map((header) => (
            <div
              key={header.id}
              {...{
                className: css.th,
                style: {
                  width: `calc(var(--header-${header?.id}-size) * 1px)`,
                },
              }}
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
              <div
                {...{
                  onDoubleClick: () => header.column.resetSize(),
                  onMouseDown: header.getResizeHandler(),
                  onTouchStart: header.getResizeHandler(),
                  className: `${css.resizerButton} ${
                    header.column.getIsResizing() ? css.isResizing : ""
                  }`,
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TableHeader;
