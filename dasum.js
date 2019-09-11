
// c     takes the sum of the absolute values.

// function dasum(n, dx, incx) {
//   dasum = 0
//   dtemp = 0
//   if(n < 0) return 0
//   if(incx === 1) {
//     m = n - 6 * Math.floor(n / 6)
//     if( m === 0 ) {
//       mp1 = m + 1
//       for(let i = mp1 - 1; i < n; i += 6) {
//         dtemp = dtemp + Math.abs[dx[i]] + Math.abs[dx[i + 1]] + Math.abs[dx[i + 2]] + Math.abs[dx[i + 3]] + Math.abs[dx[i + 4]] + Math.abs[dx[i + 5]]
//       }
    
//     for(let i = 1; i <= m; i++) {
//       dtemp = dtemp + Math.abs[dx[i]]
//     }
//     if( n < 6 ) dasum = dtemp
//   } else {
//     ix = 1
//     if(incx < 0) ix = (-n+1)*incx + 1
//     for (i = 1; i <= n; i++) {
//       dtemp = dtemp + Math.abs(dx(ix))
//       ix = ix + incx
//     }
//     dasum = dtemp
//   }
//   return dasum
// }

function dasum(n, dx, incx) {
  dasum = 0
  dtemp = 0
  if(n < 0) return 0
  if(incx === 1) {
     m = n - 6 * Math.floor(n / 6)
    if( m === 0 ) {
      mp1 = m + 1
      for(let i = mp1 - 1; i < n; i += 6) {
        dtemp = dtemp + Math.abs[dx[i]] + Math.abs[dx[i + 1]] + Math.abs[dx[i + 2]] + Math.abs[dx[i + 3]] + Math.abs[dx[i + 4]] + Math.abs[dx[i + 5]]
      }
    }
      for(let i = 1; i <= m; i++) {
      dtemp = dtemp + Math.abs[dx[i]]
    }
    if( n < 6 ) {
      dasum = dtemp
      return dasum
    }
  }
    ix = 1
    if(incx < 0) ix = (-n+1)*incx + 1
    for (i = 1; i <= n; i++) {
      dtemp = dtemp + Math.abs(dx(ix))
      ix = ix + incx
    }
    dasum = dtemp
      return dasum
}


console.log(dasum(2, [1,2], 1) )
