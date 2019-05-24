import React from 'react';
import { compose } from 'redux';

import { withUsers, withValueList, withUsers2, withValueList2 } from './apollo'

const Radio = ({ children, ...rest }) => (
  <label className="radio">
    <input type="radio" {...rest} />
    {' '}
    {children}
  </label>
)

const RadioView = ({ fieldId, editable, fieldData = {}, valueList, options: { inline }, placeholder, description, errors, setCurrentFieldData }) => (
  <div className="field is-narrow" title={placeholder}>
    <ul className="control">
      {Object.keys(valueList).map((key, idx) => {
        const id = `${key}_${idx}`
        const checked = fieldData.value === key
        const cb = (
          <Radio
            key={key}
            id={id}
            value={key}
            name={fieldId}
            checked={checked}
            onChange={() => setCurrentFieldData({ value: key, label: valueList[key] })}
          >
            {valueList[key]}
          </Radio>
        )
        return inline ? cb : <li key={id}>{cb}</li>
      })}
    </ul>
    {errors.map(err => (
      <p className="help is-danger" key={err}>
        {err}
      </p>
    ))}
    {errors.length === 0 && <p className="help">{description}</p>}
  </div>)

export default compose(
  withUsers2(),
  withValueList2()
)(RadioView)