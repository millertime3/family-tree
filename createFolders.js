import mkdirp from 'mkdirp'
import tree from './src/tree/comparse.json'
import _ from 'lodash'

_.forEach(tree, p => {
  mkdirp(`./public/people/${_.replace(_.replace(p.fName," ","_"),"\"","")}_${p.lName}`)
})
