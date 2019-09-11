let sortd = function(n,xkey,ix){
    let i,ifirst,ilast,iswap,ixi,ixip1;
    ifirst = 1
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
            ilast = iswap-1
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
        return
}

module.exports = sortd;