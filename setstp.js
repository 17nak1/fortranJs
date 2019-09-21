let setstp = function(nsubs,n,deltax,step){
    let i
    let dasum,stpfac
    if (nsubs.get() > 1){
      stpfac = Math.min(Math.max(this.dasum(n,deltax,1)/this.dasum(n,step,1),this.omega),1/this.omega)
    }
    else{
      stpfac = this.psi
    }
    this.dscal(n,stpfac,step,1)

    for(i = 1; i <= n ; i++){
      if (deltax.get(i) !== 0){
        step.set( Math.abs(step.get(i)) * Math.sign(deltax.get(i)),i)
      }
      else{
        step.set(-step.get(i),i)
      }      
    }
}

module.exports = setstp;