FortranIndex = require('./fArray.js')

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
  var ix,m,mp1;
  var pc=0

  dx = FortranIndex(dx)
  
  jump:
  while(true) {
    debugger;
    switch(pc)
    {
      case 0:
      if (n <= 0)
        return;

      if (incx === 1) {
        pc=20;
        continue jump;
      }

      ix = 1;
      if (incx < 0) ix = ((-n+1) * incx) + 1;

      l10: for (i=1; i <= n; i++) {
        dy[ix] = da * dx[ix];
        ix = ix + incx;
        continue l10;
      }
      return;

      case 20:
      m = n%5
      if (m === 0) {
        pc=40;
        continue jump;
      }

      l30: for (i=1; i <=m; i++) {
        dx[i] = da * dx[i];
        continue l30;
      }
      if (n < 5) return;
      
      case 40:
      mp1 = m + 1
      l50: for (i=mp1; i<=n; i+=5) {
        dx[i] = da * dx[i]
        dx[i + 1] = da * dx[i + 1]
        dx[i + 2] = da * dx[i + 2]
        dx[i + 3] = da * dx[i + 3]
        dx[i + 4] = da * dx[i + 4]
        continue l50;
      }
      return
      break jump;
    }
  } 
}
module.exports = dscal;
// let dx = [1,2]
// dscal(2,2,dx,1)
// console.log(dx)

