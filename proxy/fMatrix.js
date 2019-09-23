var fIdxArrHandlerX = {
  get: function (target, prop, receiver) {
    if (typeof prop === 'symbol' || isNaN(+prop))
      return target[prop]
    if (+prop <= 0)
      throw new RangeError("Fortran Arrays start at index 1")
    return new Proxy(target[prop - 1], fIdxArrHandlerY)
  }
}

var fIdxArrHandlerY = {
  get: function (target, prop, receiver) {
    if (typeof prop === 'symbol' || isNaN(+prop))
      return target[prop]
    if (+prop <= 0)
      throw new RangeError("Fortran Arrays start at index 1")
    return target[prop - 1]
  },

  set: function (target, prop, value, receiver) {
    if (+prop <= 0)
      throw new RangeError("Fortran Arrays start at index 1")
    target[prop - 1] = value
  }
}

let FortranIndex.M = function(a) {
  return new Proxy(a, fIdxArrHandlerX)
}
module.exports = FortranIndexM

// let m =[[1,1],[2,2]]
// let z = FortranIndexM(m)
// console.log(z[2][1])