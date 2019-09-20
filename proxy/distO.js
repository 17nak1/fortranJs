FortranIndex = require('./fArray.js')
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

let dist = function(n,x,y) {
  let absxmy,scale,sum
  x = FortranIndex.array(x)
  y = FortranIndex.array(y)
  
  absxmy = Math.abs(x[1] - y[1]);
  if (absxmy <= 1) {
   sum = absxmy*absxmy
   scale = 1
 } else {
   sum = 1
   scale = absxmy
 }
 l10:for (let i = 2; i <= n; i++) {
   absxmy = Math.abs(x[i] - y[i])
   if (absxmy <= scale) {
     sum = sum + (absxmy/scale)**2
   } else {
     sum = 1 + sum*(scale/absxmy)**2
     scale = absxmy
   }
   continue l10;
 }
 return scale * Math.sqrt(sum)
}
module.exports = dist;
 // console.log(dist(2,[1,2],[1,4]))