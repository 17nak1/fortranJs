let abji = require('./subplex.js');

console.log("calcc",abji.calcc(1,[-1,0,1,0].darr(1,1,4),2,1,false,[0,1].darr()))
console.log("dasum", abji.dasum(2,[-2,4].darr(),1))
console.log("daxpy",abji.daxpy(2,-1,[2,4].darr(),1, [2,2].darr(),1))
console.log("dcopy",abji.dcopy(2,[1].darr(),0, [2,2].darr(2),1))
console.log("dist",abji.dist(2,[2,4].darr(),[2,2].darr()))
console.log("dscal",abji.dscal(2,2,[2,4].darr(),1))

// var evalfout = {};
// console.log(abji.evalf((n,x) => x.length * n ,3,[1,2,3],[1,2,3],2,[1,2,3], evalfout,0)) //amir
 
console.log("fstats",abji.fstats(2,0, true))                    // 0 [ 2, 2, 2, 0 ]
console.log("newpt",abji.newpt(2,2,[1,2].darr(),[1,-2].darr(),true,[1,1].darr(),true))
console.log("order",abji.order(2,[1,2].darr(),[1].darr(),[].darr(),[].darr()))
// // console.log(abji.partx(2,1,[2,4],1, [2,2],1))
// // console.log(abji.setstp(2,1,[2,4],1, [2,2],1))
// // console.log(abji.simplx(2,1,[2,4],1, [2,2],1))
console.log("sortd",abji.sortd(3,[2,-4, 7].darr(),[1,2,3].darr()))   
// // console.log(abji.start(2,1,[2,4],1, [2,2],1))
console.log(abji.subopt(2)) /** ok Amir */
// // console.log(abji.subplex(2,1,[2,4],1, [2,2],1))
// // console.log(abji.subplx(2,1,[2,4],1, [2,2],1))



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

abji.f = function (n,x) {  
      let x1, x2
      x1 = x.get(1)
      x2 = x.get(2)
      return 100*(x2-x1*x1)**2+(1-x1)**2
}
abji.x0 = [11,-33];

// abji.run()