FortranIndex = require('./fArray.js')
/*
*  @file         newpt.js
*                newpt performs reflections, expansions, contractions, and
*                shrinkages (massive contractions) by computing:
*
*                xbase + coef * (xbase - xold)
*
*                The result is stored in xnew if new equals to true,
*                in xold otherwise.
*
*                use :  coef > 0 to reflect
*                       coef < 0 to expand, contract, or shrink
*  @input
*              ns     - number of components (subspace dimension)
*
*              coef   - one of four simplex method coefficients
*
*              xbase  - double precision ns-vector representing base
*                       point
*
*              xold   - double precision ns-vector representing old
*                       point
*
*              nnew    - logical switch
*                       = true  : store result in xnew
*                       = false : store result in xold, xnew is not
*                                   referenced
*
*  @output
*
*              xold   - unchanged if new .eq. true, contains new
*                       point otherwise
*
*              xnew   - double precision ns-vector representing new
*                       point if  new is true, not referenced
*                       otherwise
*
*              small  - logical flag
*                       = true  : coincident points
*                       = false : otherwise
*
*  @author       Nazila Akhavan
*  @date         Sep 2019
*  @references   Tom Rowan, Department of Computer Sciences, University of Texas at Austin
*                https://www.netlib.org/opt/
*/
// Note: The DBLE function returns a double-precision REAL value given a numeric argument. It is removed in JS.
// newpt (ns,alpha,s(1,xbase),s(1,xold),.true.,s(1,xnew),small)

// small = newpt(ns,coef,xbase,xold,nnew,xnew)
let newpt = function(ns,coef,s,xbase,xold,nnew,xnew){
  let xoldi;
  let eqbase,eqold;
  let small;

  eqbase = true;
  eqold = true;
  if (nnew){
    for(i = 1; i<= ns; i++){
        s[i][xnew] = s[i][xbase] + coef * (s[i][xbase] - s[i][xold]);
        eqbase = eqbase && (s[i][xnew] === s[i][xbase]);
        eqold = eqold && (s[i][xnew] === s[i][xold]);
    }
  } else {
    for(i = 1; i<= ns; i++){
        xoldi = s[i][xold];
        s[i][xold] = s[i][xbase] + coef * (s[i][xbase] - s[i][xold]);
        eqbase = eqbase && (s[i][xold] === s[i][xbase]);
        eqold = eqold && (s[i][xold] === xoldi);
    }
  }
  small = eqbase || eqold; console.log(small)
  return small
}

module.exports = newpt;
// let ns = 2
// let small
// let s = [[1,2],[3,4]]
// s= FortranIndex.matrix(s)
// let xold = 1,
// xnew = 2, xbase = 1
// small= newpt(ns, 20,s,xbase,xold,true,xnew,small)
// console.log(s, small)