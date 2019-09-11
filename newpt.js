let newpt = function(ns,coef,xbase,xold,nnew,xnew,small){
    let i
    let xoldi
    let eqbase,eqold

    eqbase = true
    eqold = true
    if (nnew){
        for(i = 0; i< ns; i++){
            xnew[i] = xbase[i]+coef*(xbase[i]-xold[i])
            eqbase = eqbase && (dble(xnew[i]) === dble(xbase[i]))
            eqold = eqold && (dble(xnew[i]) === dble(xold[i]))
        }
    }
    else{
        for(i = 0; i< ns; i++){
            xoldi = xold[i]
            xold[i] = xbase[i]+coef*(xbase[i]-xold[i])
            eqbase = eqbase && (dble(xold[i]) === dble(xbase[i]))
            eqold = eqold && (dble(xold[i]) === dble(xold[i]))
         }
        }
    small = eqbase || eqold
}

module.exports = newpt;