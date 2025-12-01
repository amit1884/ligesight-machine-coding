import { useState, type ReactNode, Fragment } from "react";
import { sortData } from "../../utils";
import "./table.css";
import Pagination from "../Pagination";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => ReactNode;
  sortable?: boolean;
  width?: number | string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];

  isExpanded?: (row: T) => boolean;
  renderExpanded?: (row: T) => ReactNode;
  onRowClick?: (row: T) => void;

  pageSize?: number;
  showHead?: boolean;
}

export function Table<T>({
  data,
  columns,
  isExpanded,
  renderExpanded,
  onRowClick,
  pageSize = 10,
  showHead = true,
}: TableProps<T>) {
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  
  // --- THE FIX: Maintain internal state for page size ---
  const [internalPageSize, setInternalPageSize] = useState<number>(pageSize);

  let sortedData = data;
  if (sortKey) {
    sortedData = sortData(sortedData, sortKey, sortDir);
  }

  // Use internalPageSize for calculations
  const totalPages = Math.ceil(data.length / internalPageSize);
  const start = (page - 1) * internalPageSize;
  const currentData = sortedData.slice(start, start + internalPageSize);


  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    const key = col.key as keyof T;

    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };
  return (
    <div className="table-wrapper">
      <table className="custom-table">
        {showHead && (
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  style={{ width: col.width }}
                  className={col.sortable ? "sortable" : ""}
                  onClick={() => handleSort(col)}
                >
                  {col.header}
                  {sortKey === col.key && (
                    <span className="sort-arrow">
                      {sortDir === "asc" ? " ▲" : " ▼"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
        )}

        <tbody>
          {currentData.map((row, index) => (
            <Fragment key={start + index}>
              <tr
                className="parent-row"
                onClick={() => onRowClick?.(row)}
                style={{ cursor: onRowClick ? "pointer" : "default" }}
              >
                {columns.map((col) => (
                  <td key={String(col.key)}>
                    {col.render ? col.render(row) : (row as any)[col.key]}
                  </td>
                ))}
              </tr>

              {isExpanded?.(row) && renderExpanded && (
                <tr className="child-row">
                  <td colSpan={columns.length} className="child-indent">
                    {renderExpanded(row)}
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onChange={(p) => setPage(p)}
        maxVisible={5}
        pageSizeOptions={[5, 10, 20, 50]}
        
        // --- THE FIX: Pass the STATE variable, not the default prop ---
        currentPageSize={internalPageSize}
        
        onPageSizeChange={(size) => {
          setPage(1);
          setInternalPageSize(size);
        }}
      />
    </div>
  );
}