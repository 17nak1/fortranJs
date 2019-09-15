let abji = require('./subplex.js');

//console.log(abji.calcc(2,1,[2,4],1, [2,2],1))
console.log(abji.dasum(2,1,[2,4],1, [2,2],1))
console.log(abji.daxpy(2,1,[2,4],1, [2,2],1))
console.log(abji.dcopy(2,[2,4],1, [2,2],1))
console.log(abji.dist(2,1,[2,4],1, [2,2],1))
console.log(abji.dscal(2,1,[2,4],1, [2,2],1))

var evalfout = {};
console.log(abji.evalf((n,x) => x.length * n ,3,[1,2,3],[1,2,3],2,[1,2,3], evalfout,0)) //amir
 
console.log(abji.fstats(2,0, true))                    // 0 [ 2, 2, 2, 0 ]
// console.log(abji.newpt(2,1,[2,4],1, [2,2],1))
// console.log(abji.order(2,1,[2,4],1, [2,2],1))
// console.log(abji.partx(2,1,[2,4],1, [2,2],1))
// console.log(abji.setstp(2,1,[2,4],1, [2,2],1))
// console.log(abji.simplx(2,1,[2,4],1, [2,2],1))
console.log(abji.sortd(2,1,[2,4],1, [2,2],1))   
// console.log(abji.start(2,1,[2,4],1, [2,2],1))
console.log(abji.subopt(2))
// console.log(abji.subplex(2,1,[2,4],1, [2,2],1))
// console.log(abji.subplx(2,1,[2,4],1, [2,2],1))



// n = 10;
// tol1 = 0.1;
// tol2  = 1e-4;
// tol3 = 0.1;
// nf1 = 100;
// nf2 = 1000;
// nf3 = 100;
// scl = 0.1
// x = new Array(10).fill(0.1);
// niwmax = nwmax = nxmax = 300;
// scale[1] = - Math.abs(scl);
// tol = tol1;
// maxnfe = nf1;
// mdcont = 0;
// mduser = 0;
// mdsing = 0;
// mode = 4 * mdsing + 2 * mduser + mdcont;

let f = function (x) {  
    let x1, x2
    x1 = x[0]
    x2 = x[1]
    return 100*(x2-x1*x1)**2+(1-x1)**2
}

 
      let x0 = [11,-33],
      n= x0.length,
      tol= 2.220446e-16,
      maxnfe=10000,
      scale=1
   
      let work = new Array(n).fill(Array((n+6)+1))
      let iwork = new Array(2).fill(Array(n))
 let x = x0
 let fx = 0,nfe=0, iflag
abji.subplx (f,n,tol,maxnfe,scale,x,fx,nfe,work,iwork,iflag)
