//       subroutine calcc (ns,s,ih,inew,updatc,c)
// c
//       integer ns,ih,inew
//       double precision s(ns,ns+3),c(ns)
//       logical updatc
// c
// c                                         Coded by Tom Rowan
// c                            Department of Computer Sciences
// c                              University of Texas at Austin
// c
// c calcc calculates the centroid of the simplex without the
// c vertex with highest function value.
// c
// c input
// c
// c   ns     - subspace dimension
// c
// c   s      - double precision work space of dimension .ge.
// c            ns*(ns+3) used to store simplex
// c
// c   ih     - index to vertex with highest function value
// c
// c   inew   - index to new point
// c
// c   updatc - logical switch
// c            = .true.  : update centroid
// c            = .false. : calculate centroid from scratch
// c
// c   c      - centroid of the simplex without vertex with
// c            highest function value
// c
// c output
// c
// c   c      - new centroid
// c
// c local variables
// c
//       integer i,j
// c
// c subroutines and functions
// c
// c   blas
//       external daxpy,dcopy,dscal
// c
// c-----------------------------------------------------------
// c
function calcc (ns,s,ih,inew,updatc,c) {
    console.log(c) 
    if (updatc) {
      if (ih === inew) return
      for(let i = 0; i < ns; i++) {
        c[i] = c[i] + (s[i][inew] - s[i][ih]) / ns
      }
    } else {
      // call dcopy (ns,0.d0,0,c,1)
      c = new Array(ns).fill(0)
      for(let j = 0; j < ns + 1; j++) {
        if (j !== ih) {
            // call daxpy (ns,1.d0,s(1,j),1,c,1)     
            for (let k  = 0; k < ns ; k++) {
                c[k] = s[1][j] + c[k]
            } 
        }
      }
      // call dscal (ns,1.d0/ns,c,1)
      for (let k  = 0; k < ns ; k++) {
        c[k] = 1 / ns * c[k]
      } 
    }
  console.log(c)  
} 