import React from 'react';
import { compose } from 'redux';
import { MultiSelect, SimpleSelect } from 'react-selectize'
import 'react-selectize/themes/index.css'

import { withUsers, withValueList } from './apollo'

const Field = (props) => {
  const { valueList, filter } = props
  return (<MultiSelect 
  placeholder="enter value"
  delimiters={[188]}
  options={Object.keys(valueList).map(key => ({ value: key, label: valueList[key] }))}
  filterOptions={(options, values, search) => {
    const filteredOptions = options.filter(o => !values.find(v => v.value === o.value))
    if (!search) return filteredOptions.slice(0, 10)
    const regExp = new RegExp(search, 'i')
    return filteredOptions.filter(o => regExp.test(o.value) || regExp.test(o.label)).slice(0, 10)
  }}
  onSearchChange={async (text) => {
    const { filter } = props
    await filter(text)
    console.log('search', text)}
  }
/>)
}

const valueListdatasource = { type: 'VALUELIST', ref: 'bb2b48d2-4539-4bd4-83e9-6d20bfb98710'}
const userListdatasource = { type: 'USERLIST'}

const WithDatasource = (datasource) => (
  datasource.type === 'VALUELIST'
            ? withValueList(datasource)
            : withUsers(datasource)
)

const FieldWithUsers = withUsers()(Field)
const FieldWithList = withValueList({ ref: 'bb2b48d2-4539-4bd4-83e9-6d20bfb98710' })(Field)
const FieldTest = WithDatasource(valueListdatasource)(Field)

const Hello = (props) => {
  const { name } = props

  const cp = WithDatasource(valueListdatasource)(Field)


  return (<div>
  <h1>Hello {name}!</h1>

  <h3>datasource = users</h3>
  <FieldWithUsers />

  <h3>datasource = liste de valeurs</h3>
  <FieldWithList />

  <h3>generic wrapper</h3>
  <FieldTest />

</div>
)
};

export default  Hello
