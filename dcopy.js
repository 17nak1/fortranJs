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
      
      let goto_variable = 0;
      while (true)
      {
        switch (goto_variable){
          case 0:
            if(n <= 0) return
            if(incx === 1 && incy === 1){
              goto_variable = 20;
            }
            else{
              goto_variable = 10;
            }
          break;
          case 10:
            ix = 1
            iy = 1
            if(incx < 0) ix = (-n+1)*incx + 1
            if(incy < 0) iy = (-n+1)*incy + 1
            for (let i = 1; i <= n; i++) {
              dy[sy + iy - 1] = dx[sx + ix -1]
              ix = ix + incx
              iy = iy + incy
            }
            return 
          break;
          case 20:
            m = n - 7 * Math.floor(n / 7)
            if( m === 0 ) {
              goto_variable = 40;
            }
            else{
              for(i = 1; i <= m; i++) {
                dy[sy + i - 1] = dx[sx + i - 1]
              }
              if( n  <  7 ) return
            }
            goto_variable = 40;
          break;
          case 40:
              mp1 = m + 1
              for (let i = mp1; i <= n; i += 7) {
                dy[sy + i - 1] = dx[sx +  - 1]
                dy[sy + i + 1 - 1] = dx[sx + i + 1 - 1]
                dy[sy + i + 2 - 1] = dx[sx + i + 2 - 1]
                dy[sy + i + 3 - 1] = dx[sx + i + 3 - 1]
                dy[sy + i + 4 - 1] = dx[sx + i + 4 - 1]
                dy[sy + i + 5 - 1] = dx[sx + i + 5 - 1]
                dy[sy + i + 6 - 1] = dx[sx + i + 6 - 1]
              }
              return
          }
        }
      }
module.exports = dcopy;