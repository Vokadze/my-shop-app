import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ selectedSort, onSort, columns }) => {
    console.log("TableHeader.jsx columns", columns);
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };

    const returnSortCaret = (selectedSort, currentPath) => {
        if (selectedSort.path !== currentPath) return false;
        if (selectedSort.order === "asc") {
            return <i className="bi bi-caret-down-fill"></i>;
        } else {
            return <i className="bi bi-caret-up-fill"></i>;
        }
    };

    return (
        <thead>
            <tr className="border border-warning">
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        // onClick={() => handleSort(columns[column].path)}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        {...{ role: columns[column].path && "button" }}
                        scope="col"
                    >
                        {columns[column].name}{" "}
                        {returnSortCaret(selectedSort, columns[column].path)}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object
    // handleSort: PropTypes.func
    // columns: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default TableHeader;
