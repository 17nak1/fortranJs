let simplx = function(f,n,step,ns,ips,maxnfe,cmode,x,fx,nfe,s,fs,iflag){
    let i,icent,ih,il,inew,is,itemp,j,npts
    let dist,dum,fc,fe,fr,tol
    let small,updatc

    //if (cmode) go to 50
    npts = ns+1
    icent = ns+2
    itemp = ns+3
    updatc = false
    this.start(n,x,step,ns,ips,s,small)
    if (small){
       iflag = 1
       return
    }
    fs[1] = fx
    for(j = 1 ; j< npts; j++){
       this.evalf (f,ns,ips,s[1,j],n,x,fs[j],nfe)
    }

    il = 1
    this.order(npts,fs,il,is,ih)
    tol = psi*this.dist(ns,s[1,ih],s[1,il])
// c     
// c     main loop
// c     
// 20   continue
    this.calcc (ns,s,ih,inew,updatc,s[1,icent])
    updatc = true
    inew = ih
    this.newpt(ns,alpha,s[1,icent],s[1,ih],true,s[1,itemp],small)
// if (small) go to 40
    this.evalf (f,ns,ips,s[1,itemp],n,x,fr,nfe)
    if (fr < fs[il]){  
       this.newpt(ns,-gamma,s[1,icent],s[1,itemp],true,s[1,ih],small)
//if (small) go to 40
       this.evalf (f,ns,ips,s[1,ih],n,x,fe,nfe)
       if (fe < fr){
          fs[ih] = fe
       }
       else{
          this.dcopy(ns,s[1,itemp],1,s[1,ih],1)
          fs[ih] = fr
       }
    }
    else if (fr < fs[is]){
       this.dcopy(ns,s[1,itemp],1,s[1,ih],1)
       fs[ih] = fr
    }
    else{
       if (fr .gt. fs(ih)){
          this.newpt(ns,-beta,s[1,icent],s[1,ih],true,s[1,itemp],small)
       }
       else{
          this.newpt(ns,-beta,s[1,icent],s[1,itemp],false,dum,small)
       }     
//if (small) go to 40
       this.evalf (f,ns,ips,s[1,itemp],n,x,fc,nfe)
       if (fc < Math.min(fr,fs[ih])){
          this.dcopy(ns,s[1,itemp],1,s[1,ih],1)
          fs[ih] = fc
       }
       else{
            for(j = 0; j< npts; j++){          
                if (j !== il){
                    this.newpt(ns,-delta,s[1,il],s[1,j],false,dum,small)
//if (small) go to 40
                  this.evalf(f,ns,ips,s[1,j],n,x,fs[j],nfe)
                }
            }
        }   
       updatc = false
    }
    this.order(npts,fs,il,is,ih)
  
//40   continue
    fx = fs[il]
// 50   continue
    if (nfe >= maxnfe){
       iflag = -1
    }
    else if (this.dist(ns,s[1,ih],s[1,il]) <= tol || small){
       iflag = 0
    }
    else{
    //    go to 20
    }

    for(i= 0 ; i< ns; i++){
       x[ips[i]] = s[i,il]
    }
}

module.exports = simplx;