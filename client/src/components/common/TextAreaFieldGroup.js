import React from "react";
import classNames from "classnames";
import propTypes from "prop-types";
const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange
}) => {
  return (
    <div className="form-group">
      <textarea
        className={classNames(
          "form-control form-control-lg",
          error ? "is-invalid" : ""
        )}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
TextAreaFieldGroup.propTypes = {
  name: propTypes.string.isRequired,
  placeholder: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  info: propTypes.string.isRequired,
  error: propTypes.string,
  onChange: propTypes.func.isRequired
};
export default TextAreaFieldGroup;
