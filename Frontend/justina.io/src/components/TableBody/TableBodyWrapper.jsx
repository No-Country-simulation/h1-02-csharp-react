import TableBody from "./TableBody";
import MemoizedTableBody from "./MemoizedTableBody";
import Show from "../Show/Show";

const TableBodyWrapper = ({ table }) => (
  <Show
    when={table.getState().columnSizingInfo.isResizingColumn}
    fallback={<TableBody table={table} />}
  >
    <MemoizedTableBody table={table} />
  </Show>
);

export default TableBodyWrapper;
