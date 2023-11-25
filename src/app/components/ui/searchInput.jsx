import React from "react";
import PropTypes from "prop-types";

const SearchInput = ({ type, name, placeholder, onChange, value }) => {
    return (
        <div className="d-flex flex-column px-0">
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                className="mb-2 text-center border"
                onChange={onChange}
                value={value}
            />
        </div>
    );
};

SearchInput.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string
};

export default SearchInput;
