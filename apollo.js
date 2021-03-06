import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

export const withUsers = () =>
  graphql(gql`
  query findUsers($cursor: String!, $filter: String!) {
    findUsers(cursor: $cursor, filter: $filter, pageSize: 50) {
      count
      users {
        id
        firstname
        lastname
        displayName
        username
      }
    }
  }
  `, {
      options: ({ filter }) => ({
        variables: { cursor: '', filter: filter || '' }
      }),
      props: (props) => {
        const { data: { findUsers, refetch } } = props
        console.log('gprops', props.data.findUsers && props.data.findUsers.users)
        return {
          valueList: props.data.findUsers
            && props.data.findUsers.users.map(o => ({ label: o.displayName, value: o.id }))
              .reduce((prev, cur) => ({ ...prev, [cur.value]: cur.label }), {}) || [],
          filter: (search) => refetch({ filter: search })
        }
      }
    })

export const withValueList = ({ ref }) =>
  graphql(gql`
  query loadList($ref: String!) {
    valueList(ref: $ref) {
      ref
      schema
      access
      label
      list {
        value
        label
      }
    }
  }`, {
    options: () => ({
      variables: { ref: ref }
    }),
    props: (props) => {
      const { data: { valueList, refetch } } = props
      console.log('withValueList props', props.data)
      return {
        valueList: props.data.valueList
          && props.data.valueList.list
            .reduce((prev, cur) => ({ ...prev, [cur.value]: cur.label }), {}) || [],
        filter: (search) => refetch()
      }
    }
  })

export const withValueList2 = () =>
  graphql(gql`
  query loadList($ref: String!) {
    valueList(ref: $ref) {
      ref
      schema
      access
      label
      list {
        value
        label
      }
    }
  }`, {
    options: ({ datasource: { type, ref } = { type: '' }}) => ({
      variables: { ref: ref },
      skip: type !== 'VALUELIST'
    }),
    props: (props) => {
      const { data: { valueList, refetch } } = props
      console.log('withValueList props', props.data)
      return {
        valueList: props.data.valueList
          && props.data.valueList.list
            .reduce((prev, cur) => ({ ...prev, [cur.value]: cur.label }), {}) || [],
        filter: (search) => refetch()
      }
    }
  })

export const withUsers2 = () =>
  graphql(gql`
  query findUsers($cursor: String!, $filter: String!) {
    findUsers(cursor: $cursor, filter: $filter, pageSize: 50) {
      count
      users {
        id
        firstname
        lastname
        displayName
        username
      }
    }
  }
  `, {
      options: ({ datasource: { type } = { type: '' }, filter }) => ({
        variables: { cursor: '', filter: filter || '' },
        skip: type !== 'USERLIST'
      }),
      props: (props) => {
        const { data: { findUsers, refetch } } = props
        console.log('gprops', props.data.findUsers && props.data.findUsers.users)
        return {
          valueList: props.data.findUsers
            && props.data.findUsers.users.map(o => ({ label: o.displayName, value: o.id }))
              .reduce((prev, cur) => ({ ...prev, [cur.value]: cur.label }), {}) || [],
          filter: (search) => refetch({ filter: search })
        }
      }
    })
