// double precision function dist (n,x,y)
// c
//       integer n
//       double precision x(n),y(n)
// c
// c                                         Coded by Tom Rowan
// c                            Department of Computer Sciences
// c                              University of Texas at Austin
// c
// c dist calculates the distance between the points x,y.
// c
// c input
// c
// c   n      - number of components
// c
// c   x      - point in n-space
// c
// c   y      - point in n-space
// c
// c local variables
// c
//       integer i
//       double precision absxmy,scale,sum
// c
// c subroutines and functions
// c
// c   fortran
//       intrinsic abs,sqrt
// c
// c-----------------------------------------------------------
// c
function dist (n,x,y) {
 let absxmy,scale,sum
 absxmy = Math.abs(x[1]-y[1])
 if (absxmy <= 1) {
   sum = absxmy*absxmy
   scale = 1
 } else {
   sum = 1
   scale = absxmy
 }
 for (let i = 0; i < n; i++) {
   absxmy = Math.abs(x[i] - y[i])
   if (absxmy <= scale) {
     sum = sum+(absxmy/scale)**2
   } else {
     sum = 1+sum*(scale/absxmy)**2
     scale = absxmy
   }
 }
 // dist = scale * Math.sqrt(sum)
 return scale * Math.sqrt(sum)
}

console.log(dist (2, [2,4], [-2,2]))