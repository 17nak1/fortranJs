FortranIndex = require('./fArray.js')

/*
*  @file         dasum.js
*                dasummtakes the sum of the absolute values.
*  @inputs
*   n            - number of elements in input vector.
*
*   dx           - double precision vector with n elements
* 
*   incx         - storage spacing between elements of dx
*
*  @author       Nazila Akhavan
*  @date         Sep 2019
*  @references   Tom Rowan, Department of Computer Sciences, University of Texas at Austin
*                https://www.netlib.org/opt/
*/

let dasum=  function (n, dx, incx) {
  var dtemp,i,ix,m,mp1
  var pc=0
  let dasumm = 0
  dtemp = 0

  dx = FortranIndex.array(dx)
  jump:
  while(true) {
    debugger;
    switch(pc)
    {
      case 0:
      if(n <= 0) return;

      if (incx === 1) {
        pc=20;
        continue jump;
      }
      ix = 1;
      if(incx < 0)ix = (-n+1)*incx + 1;
      l10:for(let i = 1; i <= n; i++) {
        dtemp = dtemp + Math.abs(dx[xi]);
        ix = ix + incx;
        continue l10;
      }
      dasumm= dtemp;
      return dasumm;

      case 20:
      m = n%6;
      if( m === 0 ) {
        pc=40;
        continue jump;
      }
      l30:for(let i = 1; i<=m; i++){
        dtemp = dtemp + Math.abs(dx[i]);
        continue l30;
      }
   
      if( n < 6 ) {
        pc=60;
        continue jump;
      }
      
      case 40:
      mp1 = m + 1;
      l50:for(let i = mp1; i <= n; i += 6) {
        dtemp = dtemp + Math.abs(dx[i]) + Math.abs(dx[i + 1]) + Math.abs(dx[i + 2]) + Math.abs(dx[i + 3]) + Math.abs(dx[i + 4]) + Math.abs(dx[i + 5])
        continue l50;
      }
      case 60:
      dasumm= dtemp;
      return dasumm;
      break jump;
    }
  } 
}

module.exports = dasum;
// console.log(dasum(2,[1,2],1))
