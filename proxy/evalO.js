let fstats = require("./fstats.js")

/**
*  @file          evalf.js
*                 evalf evaluates the function f at a point defined by x
*                 with ns of its components replaced by those in xs.
*
*  @parameter
*
*  f      - user supplied function f(n,x) to be optimized
*
*  ns     - subspace dimension
*
*  ips    - permutation vector
*
*  xs     - double precision ns-vector to be mapped to x
*
*  n      - problem dimension
*
*  x      - double precision n-vector
*
*  nfe    - number of function evaluations
*
*  @output
*
*  sfx    - signed value of f evaluated at x
*
*  nfe    - incremented number of function evaluations
*/
// common /usubc/ irepl,ifxsw,fxstat(4),ftest,minf,initx,newx
// common /isubc/ fbonus,sfbest,nnew

let evalf = function(f,ns,ips,xs,n,x,sfx,nfe){
  let newbst,fx;
  l10:for(let i = 1; i <= ns; i++) {
    x[ips[i]] = xs[i];
    continue l10
  }
  newx = nnew || (irepl !== 2)
  fx = f(n,x)
  if (irepl === 0) {
    if (minf) {
      sfx = fx
    } else {
      sfx = -fx
    }
  } else if (nnew) {
    if (minf) {
      sfx = fx
      newbst = fx < ftest
    } else {
      sfx = -fx
      newbst = fx > ftest
    }
    if (initx || newbst) {
      if (irepl === 1) fstats(fx,1,true)
      ftest = fx
      sfbest = sfx
    }
  } else {
    if (irepl === 1) {
      fstats (fx,1,false)
      fx = fxstat[ifxsw]
    }
    ftest = fx+fbonus*fxstat[4]
    if (minf) {
      sfx = ftest
      sfbest = fx
    } else {
      sfx = -ftest
      sfbest = -fx
    }
  }
  nfe = nfe+1
  return
}

module.exports = evalf;