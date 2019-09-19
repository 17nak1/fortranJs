FortranIndex = require('./fArray.js')
dcopy = require('./dcopyO.js')
daxpy = require('./daxpyO.js')
dscal= require('./dscalO.js')
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
*  @references   Tom Rowan, Department of Computer Sciences, University of Texas at Austin
*                https://www.netlib.org/opt/
*/


let calcc = function(ns,s,ih,inew,updatc,c) {
  let tempColumn;
  s = FortranIndex.matrix(s); 
  c= FortranIndex.array(c);

  if (updatc) {
    if (ih === inew) return;
    l10: for (i=1; i <= ns; i++) {
      c[i] = c[i] + (s[i][inew]-s[i][ih])/ns;
      continue l10;
    }
  } else {
    dcopy (ns,0,0,c,1)
    l20:for(let j = 1; j <= ns+1 ;j++) {
        if (j !== ih) daxpy(ns,1,FortranIndex.getColumn(s,ns,j),1,c,1);
        continue l20;
    }
    dscal(ns,1/ns,c,1);
  }
  return
}
// let ns = 2
// let c = Array(ns).fill(0)
// let s = [[1,2],[3,4]]
// calcc(ns,s,1,2,true,c)
// console.log(c)



