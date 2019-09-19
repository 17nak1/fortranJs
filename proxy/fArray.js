var fIdxArrHandler = {
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

let FortranIndex = function(a) {
  if (typeof a === 'number') {
    let arr = []
    return new Proxy(arr, {
      get: function (target, prop, receiver) {
        if (typeof prop === 'symbol' || isNaN(+prop))
          return target[prop]
        if (+prop <= 0)
          throw new RangeError("Fortran Arrays start at index 1")
        if (typeof arr[prop - 1] !== 'undefined')
          return arr[prop - 1]
        else
          return a
      },

      set: function (target, prop, value, receiver) {
        if (+prop <= 0)
          throw new RangeError("Fortran Arrays start at index 1")
        target[prop - 1] = value
      }
    })
  }

  return new Proxy(a, fIdxArrHandler)
}
module.exports = FortranIndex