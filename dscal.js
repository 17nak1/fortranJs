
/* 
*  @file        scal.js
*               scales a vector by a constant.
*  @inputs
*               n     number of elements in input vector(s)
*               dx    double precision vector with N elements
*               incx  storage spacing between elements of DX
*               DY  double precision vector with N elements
*               INCY  storage spacing between elements of DY
*
*  @author      Nazila Akhavan
*  @date        Sep 2019
*/

function dscal(n,da,dx,incx) {
  let ix,m,mp1
​
  if(n <= 0) return 0
  if(incx === 1) {
    m = n - 5 * Math.floor(n / 5)
    if( m === 0 ) {
        mp1 = m + 1
        for(let i = mp1 - 1; i < n; i =+ 5) {
        dx[i] = da*dx[i]
        dx[i + 1] = da * dx[i + 1]
        dx[i + 2] = da * dx[i + 2]
        dx[i + 3] = da * dx[i + 3]
        dx[i + 4] = da * dx[i + 4]
        }
      return dx
    }
      for (let i = 0; i < m; i++) {
        dx[i] = da * dx[i]
      }
      if( n < 5 )  return dx
  }
  ix = 0
  if(incx < 0) ix = (-n+1)*incx + 1
  for (let i = 1; i <= n; i++) {
        dx[ix] = da * dx[ix]
        ix = ix + incx
  }
  return dx
}