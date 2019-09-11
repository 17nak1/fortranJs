let order  = function(npts,fs,il,is,ih){
    let i,il0,j
    il0 = il
    j = Math.mod(il0,npts)+1
    if (fs[j] >= fs[il]){
        ih = j
        is = il0
    }        
    else{
        ih = il0
        is = j
        il = j
    }

    for( i =i10 ; i< i10+npts-1; i++){      
        j = Math.mod(i,npts)+1
        if (fs[j] >= fs[ih]){
          is = ih
          ih = j
        }
        else if (fs[j] > fs[is]){
          is = j
        }
        else if (fs[j] < fs[il]){
          il = j
        }
    }    
}

module.exports = order;