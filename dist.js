/*
*  @file         dist.js
*                dist calculates the distance between the points x,y.
*  @inputs
*   n      - number of components
*
*   x      - point in n-space
*
*   y      - point in n-space
*
*  @author       Nazila Akhavan
*  @date         Sep 2019
*  @references   Tom Rowan, Department of Computer Sciences, University of Texas at Austin
*                https://www.netlib.org/opt/
*/

function dist (n,x,y) {
 let absxmy,scale,sum
 absxmy = Math.abs(x[0]-y[0])
 if (absxmy <= 1) {
   sum = absxmy*absxmy
   scale = 1
 } else {
   sum = 1
   scale = absxmy
 }
 for (let i = 1; i < n; i++) {
   absxmy = Math.abs(x[i] - y[i])
   if (absxmy <= scale) {
     sum = sum+(absxmy/scale)**2
   } else {
     sum = 1+sum*(scale/absxmy)**2
     scale = absxmy
   }
 }
 return scale * Math.sqrt(sum)
}
