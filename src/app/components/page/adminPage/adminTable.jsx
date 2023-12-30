import React from "react";
import PropTypes from "prop-types";

import AdminHeader from "./adminHeader";
import AdminBody from "./adminBody";

const AdminTable = ({ onSort, selectedSort, columns, data, children }) => {
    return (
        <table className="table table-borderless mx-2">
            {children || (
                <>
                    <AdminHeader {...{ onSort, selectedSort, columns }} />
                    <AdminBody {...{ columns, data }} />
                </>
            )}
        </table>
    );
};

AdminTable.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    columns: PropTypes.object,
    data: PropTypes.array,
    children: PropTypes.array
};

export default AdminTable;
