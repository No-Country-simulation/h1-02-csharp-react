import { memo } from "react";
import TableBody from "./TableBody";

const MemoizedTableBody = memo(
  TableBody,
  (prev, next) => prev.table.options.data === next.table.options.data
);

export default MemoizedTableBody;
