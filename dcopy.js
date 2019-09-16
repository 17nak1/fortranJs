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

let dcopy = function(n,dx,incx,dy,incy) {
   let ix,iy,m,mp1
      if(n <= 0) return 0
      if(incx === 1 && incy === 1) {
        m = n - 7 * Math.floor(n / 7)
        if( m === 0 ) {
          mp1 = m + 1
          for (let i = mp1; i <= n; i += 7) {
            dy.set(dx.get(i),i)
            dy.set(dx.get(i + 1),i + 1)
            dy.set(dx.get(i + 2),i + 2)
            dy.set(dx.get(i + 3),i + 3)
            dy.set(dx.get(i + 4),i + 4)
            dy.set(dx.get(i + 5),i + 5)
            dy.set(dx.get(i + 6),i + 6)
          }
          return
        }
        for(i = 1; i <= m; i++) {
          dy.set(dx.get(i),i)
        }
        if( n  <  7 ) return dy
      } 
      ix = 1
      iy = 1
      if(incx < 0) ix = (-n+1)*incx + 1
      if(incy < 0) iy = (-n+1)*incy + 1
      for (let i = 1; i <= n; i++) {
        dy.set(dx.get(ix),iy)
        ix = ix + incx
        iy = iy + incy
      }
      return 
 }

module.exports = dcopy;