/* 
*  @file        calcc.js 
*               calcc calculates the centroid of the simplex without the
*               vertex with highest function value.
*
*  @input
*
*   ns     - subspace dimension
*
*   s      - double precision work space of dimension .ge.
*            ns*(ns+3) used to store simplex
*
*   ih     - index to vertex with highest function value
*
*   inew   - index to new point
*
*   updatc - logical switch
*            = .true.  : update centroid
*            = .false. : calculate centroid from scratch
*
*   c      - centroid of the simplex without vertex with
*            highest function value
*
*  @output
*   c      - new centroid
*
*
*  @author       Nazila Akhavan
*  @date         Sep 2019
*/

let dcopy = require('./dcopy.js')
let dscal = require('./dscal.js')
let daxpy = require('./daxpy.js')


function calcc (ns,s,ih,inew,updatc,c) {
    if (updatc) {
      if (ih === inew) return
      for(let i = 0; i < ns; i++) {
        c[i] = c[i] + (s[i][inew] - s[i][ih]) / ns
      }
    } else {
      dcopy (ns,[0],0,c,1)
      // c = new Array(ns).fill(0)
      for(let j = 0; j < ns + 1; j++) {
        if (j !== ih) {
            daxpy (ns,1,s(1,j),1,c,1)     
            // for (let k  = 0; k < ns ; k++) {
            //     c[k] = s[1][j] + c[k]
            // } 
        }
      }
      dscal (ns,1/ns,c,1)
      // for (let k  = 0; k < ns ; k++) {
      //   c[k] = 1 / ns * c[k]
      // } 
    }
  console.log(c)  
} 