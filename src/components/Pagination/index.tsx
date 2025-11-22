import CustomDropdown from "../CustomDropDown";
import "./pagination.css";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onChange: (page: number) => void;
    maxVisible?: number;

    // new
    pageSizeOptions?: number[];
    currentPageSize?: number;
    onPageSizeChange?: (size: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onChange,
    maxVisible = 10,
    pageSizeOptions,
    currentPageSize,
    onPageSizeChange,
}: PaginationProps) {
    if (totalPages <= 1 && !pageSizeOptions) return null;

    const pages: (number | "...")[] = [];
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (start === 1) end = Math.min(totalPages, maxVisible);
    else if (end === totalPages) start = Math.max(1, totalPages - maxVisible + 1);

    if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) pages.push(i);

    if (end < totalPages) {
        if (end < totalPages - 1) pages.push("...");
        pages.push(totalPages);
    }

    return (
        <div className="pagination-container">
            {/* LEFT SIDE (page numbers) */}
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button
                    className="nav-btn"
                    disabled={currentPage === 1}
                    onClick={() => onChange(currentPage - 1)}
                >
                    Prev
                </button>

                {pages.map((p, i) =>
                    p === "..." ? (
                        <span key={i} className="ellipsis">
                            …
                        </span>
                    ) : (
                        <button
                            key={i}
                            className={`page-btn ${currentPage === p ? "active" : ""}`}
                            onClick={() => onChange(p as number)}
                        >
                            {p}
                        </button>
                    )
                )}

                <button
                    className="nav-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => onChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>

            {/* RIGHT SIDE: PAGE SIZE DROPDOWN */}
            {pageSizeOptions && onPageSizeChange && (
                <div className="pageSize-container">
                    <label style={{ color: "#374151", fontSize: 13 }}>Show</label>
                    <CustomDropdown
                        options={pageSizeOptions.map((n) => ({
                            label: n.toString(),
                            value: n
                        }))}
                        value={currentPageSize}
                        onChange={(val) => onPageSizeChange(Number(val))}
                        width={90}
                    />
                </div>
            )}
        </div>
    );
}
