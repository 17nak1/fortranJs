let partx = function(n,ip,absdx,nsubs,nsvals){
    let i,nleft,ns1,ns2,nused;
    let asleft,as1,as1max,as2,gap,gapmax;

    nsubs = 0
    nused = 0
    nleft = n
    asleft = absdx[1];
    for(i = 1; i < n ; i++){
       asleft = asleft+absdx[i]
    }
    while(nused < n){
       nsubs = nsubs+1
       as1 = 0
       for(i = 0; i < nsmin-1; i++){
          as1 = as1+absdx[ip[nused+i]]
       }
       gapmax = -1
       for(ns1 = nsmin-1; ns1 < Math.min(nsmax,nleft); ns1++){
            as1 = as1+absdx[ip[nused+ns1]]
            ns2 = nleft-ns1
            if (ns2 > 0){
               if (ns2 >= ((ns2-1)/nsmax+1)*nsmin){
                  as2 = asleft-as1
                  gap = as1/ns1-as2/ns2
                  if (gap > gapmax){
                    gapmax = gap
                    nsvals[nsubs] = ns1
                    as1max = as1
                  }
               }
            }
            else if (as1/ns1 > gapmax){
                    nsvals[nsubs] = ns1
                    return 0;
               }
        }
       nused = nused+nsvals[nsubs]
       nleft = n-nused
       asleft = asleft-as1max
    }

}

module.exports = partx;