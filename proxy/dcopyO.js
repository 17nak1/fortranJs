FortranIndex = require('./fArray.js')


/**
 * Copy a vector, x, to a vector, y.
 * Uses unrolled loops for increments equal to one.
 * (original author: jack dongarra, linpack, 3/11/78)
 *
 * @param       n       {number}        Number of elements in input vector
 * @param       dx      {Object}        Input vector, Array-like object
 * @param       incx    {number}        Storage spacing between elements of dx
 * @param       dy      {Object}        Input vector with n elements, Array-like object
 * @param       incy    {number}        Storage spacing between elements of dy
 * @param       ptr     {number}        pointer
 */
let dcopy = function(n, dx, incx, dy, incy,ptr = 1) {
  let ix, iy, m, mpl;
  let pc=0
  
  dx = FortranIndex.array(dx)
  dy = FortranIndex.array(dy)
  ptr = ptr - 1
  
  jump:
  while(true) {
    debugger;
    switch(pc)
    {
      case 0:
      if (n <= 0)
        return;

      if (incx === 1 && incy === 1) {
        pc=20;
        continue jump;
      }

      ix = 1;
      iy = 1;
      if (incx < 0) ix = ((-n+1) * incx) + 1;
      if (incy < 0) iy = ((-n+1) * incy) + 1;

      l10: for (let i=1; i <= n; i++) {
        dy[ptr +iy] = dx[ix];
        ix = ix + incx;
        iy = iy + incy;
        continue l10;
      }
      return;

      case 20:
      m = n%7
      if (m === 0) {
        pc=40;
        continue jump;
      }

      l30: for (let i=1; i <=m; i++) {
        dy[ptr +i] = dx[i]
        continue l30;
      }
      if (n < 7) return;
      
      case 40:
      mp1 = m + 1
      l50: for (let i=mp1; i<=n; i+=7) {
        dy[ptr +i] = dx[i]
        dy[ptr +i + 1] = dx[i + 1]
        dy[ptr +i + 2] = dx[i + 2]
        dy[ptr +i + 3] = dx[i + 3]
        dy[ptr +i + 4] = dx[i + 4]
        dy[ptr +i + 5] = dx[i + 5]
        dy[ptr +i + 6] = dx[i + 6]
        continue l50;
      }
      return
      break jump;
    }
  } 
}
module.exports = dcopy;

// dy = [1,2,3,3,4]
// dcopy(2, [1,2], 1, dy, 1,2)
// console.log('dy is', dy)
