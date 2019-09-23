let start = function(n,x,step,ns,ips,s,small){
    var i,j
    for(i = 1; i<= ns; i++){
        s[i][1] = x[ips[i]]
    }
    for(j = 2; j<= ns+1; j++){
        dcopy (ns,s[1,1],1,s[1,j],1);
        s[j-1][j] = s[j-1][1] + step[ips[j-1]]
    }
    for(j = 2; j<= ns+1; j++){
        if (s[j-1][j] === s[j-1][1]){ //go to 40
            small = true
            return small;
        }
    }
    small = false;
    return small;
}

module.exports = start;