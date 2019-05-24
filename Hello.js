import React from 'react';
import { compose } from 'redux';
import { MultiSelect, SimpleSelect } from 'react-selectize'
import 'react-selectize/themes/index.css'

import { withUsers, withValueList, withUsers2, withValueList2 } from './apollo'

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
      console.log('search', text)
    }
    }
  />)
}

const FieldSingle = (props) => {
  const { valueList, filter } = props
  return (<SimpleSelect
    placeholder="enter value"
    delimiters={[188]}
    options={Object.keys(valueList).map(key => ({ value: key, label: valueList[key] }))}
    filterOptions={(options, search) => {
      if (!search) return options.slice(0, 10)
      const regExp = new RegExp(search, 'i')
      return options.filter(o => regExp.test(o.value) || regExp.test(o.label)).slice(0, 10)
    }}
    onSearchChange={async (text) => {
      const { filter } = props
      await filter(text)
      console.log('search', text)
    }
    }
  />)
}

const FieldWithoutDatasource = (props) => {
  return (<input type="text" />)
}

const FieldWithDatasource = compose(
  withUsers2(),
  withValueList2()
)(Field)

const FieldSingleWithDatasource = compose(
  withUsers2(),
  withValueList2()
)(FieldSingle)

const FieldWithoutDatasourceWithDatasource = compose(
  withUsers2(),
  withValueList2()
)(FieldWithoutDatasource)


const valueListdatasource = { type: 'VALUELIST', ref: 'bb2b48d2-4539-4bd4-83e9-6d20bfb98710' }
const userListdatasource = { type: 'USERLIST' }

const WithDatasource = (datasource) => (
  datasource.type === 'VALUELIST'
    ? withValueList(datasource)
    : withUsers(datasource)
)

const withDatasource = ({ children, datasource}) => {
  console.log('children', children)
  // return class hoc extends React.Component {
  //   render() {
      return <children {...this.props} />
  //   }
  // }
}

const FieldWithUsers = withUsers()(Field)
const FieldWithList = withValueList(valueListdatasource)(Field)
const FieldTest = WithDatasource(valueListdatasource)(Field)

const FieldWidget = ({ datasource: { type } }) => 
  (type === 'VALUELIST' ? (<FieldWithList />) : (<FieldWithUsers />))

const MakeFieldWidget = (field) => ({ datasource: { type } }) => 
  (type === 'VALUELIST' ? (withUsers()(field)) : (withValueList(valueListdatasource)(field)))


const Hello = (props) => {
  const { name } = props

  const cp = WithDatasource(valueListdatasource)(Field)

  //const cp2 = withDatasource(Field, userListdatasource)

  return (<div>
    <h1>Hello {name}!</h1>

    <h3>datasource = users</h3>
    <FieldWithUsers />

    <h3>datasource = liste de valeurs</h3>
    <FieldWithList />

    <h3>widget users</h3>
    <FieldWidget datasource={userListdatasource} />

    <h3>generic wrapper users</h3>
    <FieldWithDatasource datasource={userListdatasource} />

    <h3>generic wrapper list</h3>
    <FieldWithDatasource datasource={valueListdatasource} />

    <h3>generic wrapper on single field</h3>
    <FieldSingleWithDatasource datasource={userListdatasource} />

  <h3>field without datasource</h3>
  <FieldWithoutDatasourceWithDatasource />


  </div>
  )
};

export default Hello
