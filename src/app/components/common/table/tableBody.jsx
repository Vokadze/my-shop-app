import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const TableBody = ({ data, columns }) => {
    const renderContent = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component;
            if (typeof component === "function") {
                return component(item);
            }
            return component;
        }
        return _.get(item, columns[column].path);
    };

    return (
        <tbody className="d-flex flex-column">
            {data.map((item) => (
                <tr
                    key={item.id}
                    className="d-flex flex-row justify-content-start border mb-2"
                >
                    {Object.keys(columns).map((column) => (
                        <td
                            key={column}
                            className="d-flex flex-column justify-content-center"
                        >
                            {renderContent(item, column)}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired
    // columnsInfo: PropTypes.object.isRequired
};

export default TableBody;