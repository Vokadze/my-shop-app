import React from "react";
import PropTypes from "prop-types";

const SelectFieldAdmin = ({
    label,
    value,
    name,
    onChange,
    defaultOption,
    options,
    error
}) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const getInputClasses = () => {
        return (
            "form-select border border-warning" + (error ? " is-invalid" : "")
        );
    };

    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  value: options[optionName].name,
                  id: options[optionName].id
              }))
            : options;

    return (
        <>
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select
                className={getInputClasses()}
                id={name}
                name={name}
                value={value}
                style={{ background: "#dee2e6" }}
                onChange={handleChange}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionsArray &&
                    optionsArray.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.name}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </>
    );
};

SelectFieldAdmin.propTypes = {
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    name: PropTypes.string,
    onChange: PropTypes.func,
    defaultOption: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    error: PropTypes.string
};

export default SelectFieldAdmin;
