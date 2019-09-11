/*
*  @file         sortd.js
*                sortd uses the shakersort method to sort an array of keys
*                in decreasing order. The sort is performed implicitly by
*                modifying a vector of indices.
*  @inputs
*   n            - number of components
*
*   xkey         - vector of keys
*
*   ix           -integer vector of indices
*
*
*  @author       Nazila Akhavan
*  @date         Sep 2019
*/


let sortd = function(n,xkey,ix){
    let i,ifirst,ilast,iswap,ixi,ixip1;
    ifirst = 0
    iswap = 1
    ilast = n-1
    while(ifirst <= ilast){
        for(i = ifirst; i < ilast; i++){
            ixi = ix[i]
            ixip1 = ix[i+1]
            if (xkey[ixi] < xkey[ixip1]){
                ix[i] = ixip1
                ix[i+1] = ixi
                iswap = i
            }
        }
        ilast = iswap
        for( i = ilast-1; i>=0 ; i--){
            ixi = ix[i]
            ixip1 = ix[i+1]
            if (xkey[ixi] < xkey[ixip1]){
            ix[i] = ixip1
            ix[i+1] = ixi
            iswap = i
            }
        }
        ifirst = iswap+1
    }
    return ix
}

// module.exports = sortd;
