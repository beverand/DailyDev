'''
You're given number and string.

If there are more digits than needed, they should be ignored

if there are less digits than needed, should return Invalid phone number
'''
function formatNumber(number, template) {
  let numHash = []
  let numStr = String(number)
  if(numStr.length < [...template].filter(s => s === '#').length){
    return "Invalid phone number"
  } else{
    let x = numStr.split('').reverse()
    for(let i = 0; i < template.length; i++){
      template[i] === '#'? numHash[i] = x.pop(): numHash[i] = template[i]
      }
  }
  return numHash.join('')
}
