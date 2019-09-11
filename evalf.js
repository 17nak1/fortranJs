let evalf = function(f,ns,ips,xs,n,x,sfx,nfe){
    let i;
    for(i = 0; i< ns; i++){
        x[ips[i]] = xs[i]
    }

      fx = f(n,x)
      sfx = fx
      nfe = nfe+1
      return
}

module.exports = evalf;