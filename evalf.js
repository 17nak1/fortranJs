let evalf = function(f,ns,ips,xs,n,x,sfx,nfe){
    let i,fx;
    for(i = 0; i< ns; i++){
        x[ips[i]] = xs[i]
    }

      fx = f(n,x)
      sfx.out = fx
      nfe.out = nfe.out+1
      return true;
}

module.exports = evalf;