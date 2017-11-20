import React from 'react'

const FieldComponent = ({input, label, type, placeholder, meta}) => (
  <div className={"form-group " + (meta.error ? 'has-danger' : '')}>
    <label>{label}</label>
    <input id={label} {...input} placeholder={placeholder} type={type} className={"form-control " + ((meta.touched && meta.error) ? 'is-invalid' : '')} />
    {meta.touched &&
      (meta.error && <div className="form-control-feedback">{meta.error.map((element, index) => <div key={index}>{element}</div>)}</div>)}
  </div>
)

export default FieldComponent
