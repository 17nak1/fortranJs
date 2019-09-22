
/* 
*  @file        scal.js
*               scales a vector by a constant.
*  @inputs
*               n     number of elements in input vector(s)
*               dx    double precision vector with N elements
*               incx  storage spacing between elements of dx
*               dy  double precision vector with N elements
*               incy  storage spacing between elements of dy
*
*  @author      Nazila Akhavan
*  @date        Sep 2019
*  @references   Tom Rowan, Department of Computer Sciences, University of Texas at Austin
*                https://www.netlib.org/opt/
*/

let dscal = function(n,da,dx,incx) {
  let ix,m,mp1;
  if(n <= 0) return 0
  if(incx === 1) {
    m = n - 5 * Math.floor(n / 5)
    if( m !== 0 ) {
      for (let i = 1; i <= m; i++) {
        dx.set(da*dx.get(i),i)
      }
      if( n < 5 )  return dx
    }
      mp1 = m + 1
      for(let i = mp1; i <= n; i += 5) {
        dx.set(da*dx.get(i),i)
        dx.set(da*dx.get(i + 1),i + 1)
        dx.set(da*dx.get(i + 2),i + 2)
        dx.set(da*dx.get(i + 3),i + 3)
        dx.set(da*dx.get(i + 4),i + 4)
      }
  }
  else{
    ix = 1
    if(incx < 0) ix = (-n+1)*incx + 1
    for (let i = 1; i <= n; i++) {
          dx.set(da*dx.get(ix),ix)
          ix = ix + incx
    }
  }

}

module.exports = dscal;