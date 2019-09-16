let start = function(n,x,w,step,ns,iw,ips,s,small){
    let i,j
    for(i = 1; i<= ns; i++){
        s[i][1] = x[ips[i]]
    }

    for(j = 2; j<= ns+1; j++){
        this.dcopy (ns,s[1][1],1,s[1][j],1)
        s[j-1][j] = s[j-1][1]+step[ips[j-1]]
    }

    for(j = 2; j<= ns+1; j++){
        if (s[j-1][j] === s[j-1][1]){
            small = true
            return
        }
    }
    small = false;
}

module.exports = start;