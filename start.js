let start = function(){
    let i,j
    for(i = 0; i< ns; i++){
        s[i,1] = x[ips[i]]
    }

    for(j = 1; j<= ns; j++){
        this.dcopy (ns,s[1,1],1,s[1,j],1)
        s[j-1,j] = s[j-1,1]+step[ips[j-1]]
    }

    for(j = 1; j<= ns; j++){
        if (dble[s[j-1,j]] === dble(s(j-1,1))){
            small = true
            return
        }
    }
    small = false;
}

module.exports = start;