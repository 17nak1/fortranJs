FortranIndex = require('./fArray.js')
/*
*  @file         daxpy.js
*                constant times a vector plus a vector. y = a*x + y
*  @inputs
*   n        - number of components
*
*   da       - constant
*
*   dx       - point in n-space
*
*   incx     -storage spacing between elements of dx
*
*   dy      - point in n-space
*
*   incy     -storage spacing between elements of dy
*
*  @author       Nazila Akhavan
*  @date         Sep 2019
*  @references   Tom Rowan, Department of Computer Sciences, University of Texas at Austin
*                https://www.netlib.org/opt/
*/


let daxpy = function(n,da,dx,incx,dy,incy) {
  let ix,iy,m,mp1
  let pc = 0;
  dx = FortranIndex.array(dx);
  dy = FortranIndex.array(dy);
  
  jump:
  while(true) {
    debugger;
    switch(pc)
    {
      case 0:
      if(n <= 0)return
      if (da === 0) return
      if(incx === 1 && incy === 1) {
        pc=20;
        continue jump;
      }

      ix = 1;
      iy = 1;
      if (incx < 0) ix = ((-n+1) * incx) + 1;
      if (incy < 0) iy = ((-n+1) * incy) + 1;

      l10: for (i=1; i <= n; i++) {
        dy[iy] = dy[iy] + da * dx[ix];
        ix = ix + incx;
        iy = iy + incy;
        continue l10;
      }
      return;

      case 20:
      m = n%4
      if (m === 0) {
        pc=40;
        continue jump;
      }

      l30: for (i=1; i <=m; i++) {
        dy[i] = dy[i] + da * dx[i];
        continue l30;
      }
      if (n < 4) return;
      
      case 40:
      mp1 = m + 1
      l50: for (i=mp1; i<=n; i+=4) {
        dy[i] = dy[i] + da * dx[i];
        dy[i + 1] = dy[i + 1] + da * dx[i + 1];
        dy[i + 2] = dy[i + 2] + da * dx[i + 2];
        dy[i + 3] = dy[i + 3] + da * dx[i + 3];
        continue l50;
      }
      return
      break jump;
    }
  } 
}
module.exports = daxpy;

// let dx = [1,1]
// let dy = [2,2]
// daxpy(2,3,dx,1,dy,1)
// console.log(dy)