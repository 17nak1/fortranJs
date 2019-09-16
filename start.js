let start = function(n,x,step,ns,ips,s,small){
    let i,j
    for(i = 1; i<= ns; i++){
        s.set(x.get(ips.get(i)),i,1) ;
    }

    for(j = 2; j<= ns+1; j++){
        this.dcopy (ns,s.clone(),1,s.clone((j-1)*ns+1),1)
        s.set(s.get(j-1,1)+step.get(ips.get(j-1)),j-1,j) 
    }

    for(j = 2; j<= ns+1; j++){
        if (s.get(j-1,j) === s.get(j-1,1)){
            small.set(true)
            return
        }
    }
    small.set(false);
}

module.exports = start;