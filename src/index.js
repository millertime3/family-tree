import _ from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import tree from './tree.json'

const propNameMap = {
  NAME:'name',
  BIRT:'birth',
  DEAT:'death',
  RESI:'residence',
  SEX:'sex',
}

const toMap = (value) => {
  const newValue = {}
  _.forEach(value, v => {
    newValue[v.tag]=v
  })
  return newValue
}

const individuals  = _.reduce(_.map(tree, 'tree'),(result, value, key) => {
  const newValue = {}
  _.forEach(value, v => {
    const key = propNameMap[v.tag]
    newValue[key ? key : v.tag]=v

    if (key === 'name') {
      newValue[key] = v.data.replace(/\//g,'')
    } if(key === 'birth' || key === 'death') {
      const tagMap = toMap(v.tree)
      newValue[key] = {
        date: _.get(tagMap,'DATE.data'),
        place: _.get(tagMap,'PLAC.data')
      }
    }
  })
  if(newValue.name) {
    result.push(newValue)
  }
  return result
},[])
individuals.forEach(i => console.log(i))
console.log(individuals)

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
