import foo from './foo'
import bar from './bar'

function getKeys () {
  return `fooKey: ${foo.key}, barKey: ${bar.key}`
}

let keys = getKeys()
console.log(keys)
