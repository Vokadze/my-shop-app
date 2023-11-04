import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    return (
        <h2>
            <span className="badge bg-primary">
                Количество продуктов: {length}
            </span>
        </h2>
    );
};

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};

export default SearchStatus;
