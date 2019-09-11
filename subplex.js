var subplex = {
     nsmin : 0,
     nsmax : 0,
     nfxe : 0,
     alpha : 0.0,
     beta : 0.0,
     gamma : 0.0,
     delta : 0.0,
     psi : 0.0,
     omega : 0.0,
     fxstat : Array(4),
     ftest : 0.0,
     initx : true
}


subplex.dcopy = require('./dcopy.js')
subplex.dscal = require('./dscal.js')
subplex.daxpy = require('./daxpy.js')

subplex.calcc = require('./calcc.js')

subplex.subopt = require('./subopt.js')

subplex.subplx = require('./subplx.1.js')

console.log('s')

module.exports = subplex;