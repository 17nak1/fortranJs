let f = function (x) {  
    let x1, x2
    x1 = x[0]
    x2 = x[1]
    return 100*(x2-x1*x1)**2+(1-x1)**2
}

 
      x0=[ 11,-33]
      n= x0.length
      tol= 2.220446e-16
      maxnfe=10000
      scale=1
   
 //      work[n*(n+6)+1], iwork[2*n] pointers
 x = x0
 subplx(f,n,tol,maxnfe,scale,x,fx,nfe,work,iwork,iflag)// Output: x,fx,nfe, iflag

x = [1, 1]

fx = 9.034923e-28

nf = 659

iflag = 0


