import React from "react";
import classNames from "classnames";
import propTypes from "prop-types";
const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  icon,
  type,
  onChange
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
        type={type}
        className={classNames(
          "form-control form-control-lg",
          error ? "is-invalid" : ""
        )}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
InputGroup.propTypes = {
  name: propTypes.string.isRequired,
  placeholder: propTypes.string.isRequired,
  value: propTypes.string,
  icon: propTypes.string,
  error: propTypes.string,
  type: propTypes.string,
  onChange: propTypes.func.isRequired
};

InputGroup.defaultProps = {
  type: "text"
};
export default InputGroup;
