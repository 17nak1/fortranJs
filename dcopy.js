/*
*  @file         dcopy.js
*                Copy a vector dx in dy.
*  @inputs
*   n             -number of elements in input vector(s)
*
*   dx            -double precision vector with n elements
*
*   incx          -storage spacing between elements of dx
*
*   dy            -double precision vector with n elements
*
*   incy          -storage spacing between elements of dy
*
*  @author       Nazila Akhavan
*  @date         Sep 2019
*  @references   Tom Rowan, Department of Computer Sciences, University of Texas at Austin
*                https://www.netlib.org/opt/
*/

let dcopy = function(n,dx,sx,incx,dy,sy,incy) {
   let ix,iy,m,mp1
      if(n <= 0) return 0
      if(incx === 1 && incy === 1) {
        m = n - 7 * Math.floor(n / 7)
        if( m === 0 ) {
          mp1 = m + 1
          for (let i = mp1; i <= n; i += 7) {
            dy[sy + i] = dx[sx + i]
            dy[sy + i + 1] = dx[sx + i + 1]
            dy[sy + i + 2] = dx[sx + i + 2]
            dy[sy + i + 3] = dx[sx + i + 3]
            dy[sy + i + 4] = dx[sx + i + 4]
            dy[sy + i + 5] = dx[sx + i + 5]
            dy[sy + i + 6] = dx[sx + i + 6]
          }
          return dy
        }
        for(i = 1; i <= m; i++) {
          dy[sy + i] = dx[sx + i]
        }
        if( n  <  7 ) return dy
      } 
      ix = 0
      iy = 0
      if(incx < 0) ix = (-n+1)*incx + 1
      if(incy < 0) iy = (-n+1)*incy + 1
      for (let i = 1; i <= n; i++) {
        dy[sy + iy] = dx[sx + ix]
        ix = ix + incx
        iy = iy + incy
      }
      return dy 
 }

module.exports = dcopy;