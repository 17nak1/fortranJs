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
    if (updatc.get()) {
      if (ih.get() === inew) return 0
      for(let i = 1; i <= ns; i++) {
        c.set(c.get(i) + (s.get(i,inew) - s(i,ih.get)) / ns,i)
      }
    } else {
      this.dcopy (ns,[0].darr(),0,c,1)
      for(let j = 1; j <= ns + 1 ; j++) {
        if (j !== ih.get()) {
          this.daxpy (ns,1,s.clone((j-1)*ns+1),1,c,1)      
        }
      }
      this.dscal (ns,1/ns,c,1) 
    }
  console.log(c)  
} 

module.exports = calcc;

// calcc(1,[[-1,0],[1,0], [0,2]],2,1,false,[0,1])