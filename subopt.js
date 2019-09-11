let subopt = function(n){
    this.alpha = 1;
    this.beta = 0.5;
    this.gamma = 2;
    this.delta = 0.5;
    this.psi = 0.25;
    this.omega = 0.1;
    this.nsmin = Math.min(2,n);
    this.nsmax = Math.min(5,n)
    return 0;
}

module.exports = subopt;