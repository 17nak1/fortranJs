let evalf = function(f,ns,ips,xs,n,x,sfx,nfe){
    let i,fx;
    for(i = 1; i<= ns; i++){
        x.set(xs.get(i), ips.get(i))
    }

      fx = f(n,x)
      sfx.set(fx)
      this.nfe = this.nfe+1
}

module.exports = evalf;